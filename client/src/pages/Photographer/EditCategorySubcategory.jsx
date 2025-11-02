import React, { useState } from 'react'
import Sidebar from '../../components/Photographer/Sidebar'
import Navbar from '../../components/Photographer/Navbar'
import CategorySubcategoryForm from '../../components/Photographer/CategorySubcategoryForm'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { PhotographerContext } from '../../context/PhotographerContext'

const EditCategorySubcategory = () => {

  const [showSidebarItems, setShowSidebarItems] = useState(true)
  const [fieldErrors, setFieldErrors] = useState({})
  const [categoryErrorMsg, setCategoryErrorMsg] = useState({type:'', message:''})
  const [subCategoryErrorMsg, setSubCategoryErrorMsg] = useState({type:'', message:''})
  const [initialData, setInitialData] = useState(null)
  const [categories, setCategories] = useState([])

  const {photographerToken, backendUrl} = useContext(PhotographerContext)

  const {categoryId} = useParams()
  const {subCategoryId} = useParams()
  const navigate = useNavigate()

  const toggleSidebarItems = () => {
    setShowSidebarItems(prev => !prev)
  }

  const validateCategory = (formData) => {
    const errors = {}

    if(!formData.categoryName || formData.categoryName.trim() === ''){
      errors.categoryName = 'Category name is required'
    }

    if(!formData.categoryDescription || formData.categoryDescription.trim() === ''){
      errors.categoryDescription = 'Category description is required'
    }

    if(!['Active', 'Blocked'].includes(formData.categoryStatus)){
      errors.categoryStatus = 'Invalid status'
    }

    return errors
  }

  const validateSubCategory = (formData) => {
    const errors = {}

    if(!formData.subCategoryName || formData.subCategoryName.trim() === ''){
      errors.subCategoryName = 'Subcategory name is required'
    }

    if(!formData.subCategoryDescription || formData.subCategoryDescription.trim() === ''){
      errors.subCategoryDescription = 'Subcategory description is required'
    }

    if(!['Active', 'Blocked'].includes(formData.subCategoryStatus)){
      errors.subCategoryStatus = 'Invalid status'
    }

    if(!formData.mainCategoryId){
      errors.mainCategoryId = 'Please select a main category'
    }

    return errors
  }

  const clearCategoryErrorMsg = () => {
    setCategoryErrorMsg({type:'', message:''})
  }

  const clearSubCategoryErrorMsg = () => {
    setSubCategoryErrorMsg({type:'', message:''})
  }

  const clearFieldError = (fieldName) => {
    setFieldErrors((prevErrors) => {
      const updatedErrors = {...prevErrors}
      delete updatedErrors[fieldName]
      return updatedErrors
    })
  }

  const handleUpdateCategory = async (categoryData, resetFormCallback) => {
    try {
      setCategoryErrorMsg({type:'', message:''})

      const errors = validateCategory(categoryData)
      if(Object.keys(errors).length > 0){
        setFieldErrors(errors)
        return
      }

      setFieldErrors({})

      const {data} = await axios.post(`${backendUrl}/api/photographer/update-category/${categoryId}`, categoryData, {headers:{photographerToken}})
      if(data.success){
        alert(data.message)
        resetFormCallback()
      }else{
        setCategoryErrorMsg({type:'error', message:data.message})
      }
    } catch (error) {
      if(error.response){
        setCategoryErrorMsg({type:'error', message:error.response.data.message})
      }else{
        setCategoryErrorMsg({type:'error', message:'Something went wrong'})
      }
    }
  }

  const handleUpdateSubCategory = async (subCategoryData, resetFormCallback) => {
    try {
      setSubCategoryErrorMsg({type:'', message:''})

      const errors = validateSubCategory(subCategoryData)
      if(Object.keys(errors).length > 0){
        setFieldErrors(errors)
        return
      }

      setFieldErrors({})

      const {data} = await axios.post(`${backendUrl}/api/photographer/update-subCategory/${subCategoryId}`, subCategoryData, {headers:{photographerToken}})
      if(data.success){
        alert(data.message)
        resetFormCallback()
      }else{
        setSubCategoryErrorMsg({type:'error', message:data.message})
      }
    } catch (error) {
      if(error.response){
        setSubCategoryErrorMsg({type:'error', message:error.response.data.message})
      }else{
        setSubCategoryErrorMsg({type:'error', message:'Something went wrong'})
      }
    }
  }

  useEffect(() => {
    if(categoryErrorMsg.message){
      const timer = setTimeout(() => setCategoryErrorMsg({type:'', message:''}), 5000);
      return () => clearTimeout(timer)
    }
  }, [categoryErrorMsg.message])

  useEffect(() => {
    if(subCategoryErrorMsg.message){
      const timer = setTimeout(() => setSubCategoryErrorMsg({type:'', message:''}), 5000)
      return () => clearTimeout(timer)
    }
  }, [subCategoryErrorMsg.message])

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const {data} = await axios.get(`${backendUrl}/api/photographer/loadAllCategory`, {headers:{photographerToken}})
        if(data.success){
          setCategories(data.categories)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchAllCategories()
  },[backendUrl, photographerToken])

  useEffect(() => {
    if(categoryId){
      const fetchEditCategoryDetails = async () => {
        try {
          const {data} = await axios.get(`${backendUrl}/api/photographer/getEditCategory/${categoryId}`, {headers:{photographerToken}})
          if(data.success){
            setInitialData(data.category)
          }
        } catch (error) {
          console.log(error)
        }
      }

      fetchEditCategoryDetails()
    }
  },[photographerToken, categoryId])

  useEffect(() => {
    if(subCategoryId){
      const fetchEditSubCategoryDetails = async () => {
        try {
          const {data} = await axios.get(`${backendUrl}/api/photographer/getEditSubCategory/${subCategoryId}`, {headers:{photographerToken}})
          if(data.success){
            setInitialData(data.subCategory)
          }
        } catch (error) {
          console.log(error)
        }
      }

      fetchEditSubCategoryDetails()
    }
  },[photographerToken, subCategoryId])
  return (
    <div>
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar showItems={showSidebarItems}/>
        </div>
        <div className="w-full">
          <Navbar toggleSidebarItems={toggleSidebarItems}/>
          <div className='pt-[70px]'>
            <div className='bg-[#000000] py-[30px] px-[28px] w-full min-h-screen'>
              <CategorySubcategoryForm heading='Edit Category & Subcategory' subHeadingCategory='Edit Category' subHeadingSubCategory='Edit Subcategory' mode='edit' onCategorySubmit={handleUpdateCategory} onSubCategorySubmit={handleUpdateSubCategory} categories={categories} initialData={initialData} fieldErrors={fieldErrors} categoryErrorMsg={categoryErrorMsg} subCategoryErrorMsg={subCategoryErrorMsg} clearCategoryErrorMsg={clearCategoryErrorMsg} clearSubCategoryErrorMsg={clearSubCategoryErrorMsg} clearFieldError={clearFieldError} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCategorySubcategory
