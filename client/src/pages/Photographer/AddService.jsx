import React, { useContext, useState } from 'react'
import Sidebar from '../../components/Photographer/Sidebar'
import Navbar from '../../components/Photographer/Navbar'
import ServiceForm from '../../components/Photographer/ServiceForm'
import { PhotographerContext } from '../../context/PhotographerContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const AddService = () => {

    const [showSidebarItems, setShowSidebarItems] = useState(true)
    const [fieldErrors, setFieldErrors] = useState({})
    const [globalErrorMsg, setGlobalErrorMsg] = useState({type:'', message:''})

    const {photographerToken, backendUrl} = useContext(PhotographerContext)

    const navigate = useNavigate()

    const toggleSidebarItems = () => {
        setShowSidebarItems(prev => !prev)
    }

    const validateForm = (formData) => {
      const errors = {}

      if(!formData.serviceName || formData.serviceName.trim() === ''){
        errors.serviceName = 'Service name is required'
      }

      if(!formData.serviceDescription || formData.serviceDescription.trim() === ''){
        errors.serviceDescription = 'Service description is required'
      }

      if(formData.minPrice === undefined || formData.minPrice === null || (typeof formData.minPrice === 'string' && formData.minPrice.trim() === '')){
        errors.minPrice = 'Minimum price is required'
      }

      if(formData.maxPrice === undefined || formData.maxPrice === null || (typeof formData.maxPrice === 'string' && formData.maxPrice.trim() === '')){
        errors.maxPrice = 'Maximum price is required'
      }

      const minPriceNum = Number(formData.minPrice)
      const maxPriceNum = Number(formData.maxPrice)

      if(formData.minPrice && (isNaN(minPriceNum) || minPriceNum < 0)){
        errors.minPrice = 'Invalid minimum price'
      }

      if(formData.maxPrice && (isNaN(maxPriceNum) || maxPriceNum < 0)){
        errors.maxPrice = 'Invalid maximum price'
      }

      if(minPriceNum > maxPriceNum){
        errors.minPrice = 'Minimum price cannot be greater than maximum price'
      }

      if(!['INR', 'USD'].includes(formData.currency)){
        errors.currency = 'Invalid currency'
      }

      if(!formData.serviceDuration || formData.serviceDuration.trim() === ''){
        errors.serviceDuration = 'Service duration is required'
      }

      if(!['Active', 'Blocked'].includes(formData.serviceStatus)){
        errors.serviceStatus = 'Invalid status'
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

    const handleAddService = async (formData, resetFormCallback) => {
      try {

        setGlobalErrorMsg({type:'', message:''})

        const errors = validateForm(formData)
        if(Object.keys(errors).length > 0){
          setFieldErrors(errors)
          return
        }

        setFieldErrors({})
        
        const {data} = await axios.post(`${backendUrl}/api/photographer/add-service`, formData, {headers:{photographerToken}})
        if(data.success){
          navigate('/service')
          resetFormCallback()
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

    useEffect(() => {
      if(globalErrorMsg.message){
        const timer = setTimeout(() => setGlobalErrorMsg({ type: '', message: '' }), 5000);
        return () => clearTimeout(timer)
      }
    }, [globalErrorMsg.message])
  return (
    <div>
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar showItems={showSidebarItems} />
        </div>
        <div className="w-full">
          <Navbar toggleSidebarItems={toggleSidebarItems} showItems={showSidebarItems} />
          <div className="pt-[70px]">
            <div className="bg-[#000000] py-[30px] px-[28px] w-full min-h-screen">
              <ServiceForm heading='Add Service' subHeadingService = 'Add Service' mode='add' onSubmit={handleAddService} fieldErrors={fieldErrors} globalErrorMsg={globalErrorMsg} clearGlobalErrorMsg={clearGlobalErrorMsg} clearFieldError={clearFieldError} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddService
