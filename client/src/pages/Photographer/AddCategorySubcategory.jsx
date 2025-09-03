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
    const [globalErrorMsg, setGlobalErrorMsg] = useState({type:'', message:''})
    const [categoryData, setCategoryData] = useState({categoryName:'', categoryDescription:'', categoryStatus:''})
    const [subCategoryData, setSubCategoryData] = useState({subCategoryName:'', subCategoryDescription:'', subCategoryStatus:'', mainCategoryId:''})
    const [categories, setCategories] = useState([])

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

    const clearGlobalErrorMsg = () => {
      setGlobalErrorMsg({type:'', message:''})
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
        setGlobalErrorMsg({type:'', message:''})

        const errors = validateCategory(categoryData)
        if(Object.keys(errors).length > 0){
          setFieldErrors(errors)
          return
        }

        setFieldErrors({})

        const {data} = await axios.post(`${backendUrl}/api/photographer/add-category`, categoryData, {headers:{photographerToken}})
        if(data.success){
          setGlobalErrorMsg({type:'success', message:data.message})
          setCategoryData({categoryName:'', categoryDescription:'', categoryStatus:''})
        }else{
          setGlobalErrorMsg({type:'error', message:data.message})
        }
      } catch (error) {
        if(error.response){
          setGlobalErrorMsg({type:'', message:error.response.data.message})
        }else{
          setGlobalErrorMsg({type:'error', message:'Something went wrong'})
        }
      }
    }

    const handleAddSubCategory = async (subCategoryData, resetFormCallback) => {
      try {
        setGlobalErrorMsg({type:'', message:''})

        const errors = validateSubCategory(subCategoryData)
        if(Object.keys(errors).length > 0){
          setFieldErrors(errors)
          return
        }

        setFieldErrors({})

        const {data} = await axios.post(`${backendUrl}/api/photographer/add-subCategory`, subCategoryData, {headers:{photographerToken}})
        if(data.success){
          setGlobalErrorMsg({type:'success', message:data.message})
          setSubCategoryData({subCategoryName:'', subCategoryDescription:'', subCategoryStatus:'', mainCategoryId:''})
        }else{
          setGlobalErrorMsg({type:'error', message:data.message})
        }
      } catch (error) {
        if(error.response){
          setGlobalErrorMsg({type:'error', message:error.response.data.message})
        }else{
          setGlobalErrorMsg({type:'error', message:'Something went wrong'})
        }
      }
    }

    useEffect(() => {
      if(globalErrorMsg.message){
        const timer = setTimeout(() => setGlobalErrorMsg({type:'', message:''}), 5000);
        return () => clearTimeout(timer)
      }
    }, [globalErrorMsg.message])
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
                    <CategorySubcategoryForm heading='Add Category & Subcategory' subHeadingCategory='Add Category' subHeadingSubCategory='Add Subcategory' mode='add' onCategorySubmit={handleAddCategory} onSubCategorySubmit={handleAddSubCategory} categories={categories} fieldErrors={fieldErrors} globalErrorMsg={globalErrorMsg} clearGlobalErrorMsg={clearGlobalErrorMsg} clearFieldError={clearFieldError} />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddCategorySubcategory
