import React, { useEffect } from 'react'
import Sidebar from '../../components/Photographer/Sidebar'
import Navbar from '../../components/Photographer/Navbar'
import CategorySubcategoryForm from '../../components/Photographer/CategorySubcategoryForm'
import { useState } from 'react'
import { useContext } from 'react'
import { PhotographerContext } from '../../context/PhotographerContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddCategorySubcategory = () => {

    const [showSidebarItems, setShowSidebarItems] = useState(true)
    const [fieldErrors, setFieldErrors] = useState({})
    const [categoryData, setCategoryData] = useState({categoryName:'', categoryDescription:'', categoryStatus:''})
    const [subCategoryData, setSubCategoryData] = useState({subCategoryName:'', subCategoryDescription:'', subCategoryStatus:'', mainCategoryId:''})
    const [categories, setCategories] = useState([])
    const [categoryErrorMsg, setCategoryErrorMsg] = useState({type:'', message:''})
    const [subCategoryErrorMsg, setSubCategoryErrorMsg] = useState({type:'', message:''})

    const {photographerToken, backendUrl} = useContext(PhotographerContext)

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

    const handleAddCategory = async (categoryData, resetFormCallback) => {
      try {
        setCategoryErrorMsg({type:'', message:''})

        const errors = validateCategory(categoryData)
        if(Object.keys(errors).length > 0){
          setFieldErrors(errors)
          return
        }

        setFieldErrors({})

        const {data} = await axios.post(`${backendUrl}/api/photographer/add-category`, categoryData, {headers:{photographerToken}})
        if(data.success){
          alert(data.message)
          resetFormCallback()
          fetchAllCategories()
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

    const handleAddSubCategory = async (subCategoryData, resetFormCallback) => {
      try {
        setSubCategoryErrorMsg({type:'', message:''})

        const errors = validateSubCategory(subCategoryData)
        if(Object.keys(errors).length > 0){
          setFieldErrors(errors)
          return
        }

        setFieldErrors({})

        const {data} = await axios.post(`${backendUrl}/api/photographer/add-subCategory`, subCategoryData, {headers:{photographerToken}})
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

    const fetchAllCategories = async () => {
      try {
        const {data} = await axios.get(`${backendUrl}/api/photographer/loadAllCategory`, {headers:{photographerToken}})
        if(data.success){
          setCategories(data.categories)
        }else{
          setSubCategoryErrorMsg({type:'error', message:data.message})
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      fetchAllCategories()
    },[backendUrl, photographerToken])
    
  return (
    <div>
      <div className="flex">
        <div className="hidden lg:block">
            <Sidebar showItems={showSidebarItems}/>
        </div>
        <div className='w-full'>
            <Navbar toggleSidebarItems={toggleSidebarItems} showItems={showSidebarItems}/>
            <div className='pt-[70px]'>
                <div className='bg-[#000000] py-[30px] px-[28px] w-full min-h-screen'>
                    <CategorySubcategoryForm heading='Add Category & Subcategory' subHeadingCategory='Add Category' subHeadingSubCategory='Add Subcategory' mode='add' onCategorySubmit={handleAddCategory} onSubCategorySubmit={handleAddSubCategory} categories={categories} fieldErrors={fieldErrors} categoryErrorMsg={categoryErrorMsg} subCategoryErrorMsg={subCategoryErrorMsg} clearCategoryErrorMsg={clearCategoryErrorMsg} clearSubCategoryErrorMsg={clearSubCategoryErrorMsg} clearFieldError={clearFieldError} />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddCategorySubcategory
