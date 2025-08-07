import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/Photographer/Sidebar'
import Navbar from '../../components/Photographer/Navbar'
import ServiceForm from '../../components/Photographer/ServiceForm'
import { PhotographerContext } from '../../context/PhotographerContext'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditService = () => {

    const [showSidebarItems, setShowSidebarItems] = useState(true)
    const [initialData, setInitialData] = useState(null)
    const [fieldErrors, setFieldErrors] = useState({})
    const [globalErrorMsg, setGlobalErrorMsg] = useState({type:'', message:''})

    const {photographerToken, backendUrl} = useContext(PhotographerContext)

    const location = useLocation()
    const navigate = useNavigate()
    const {serviceId} = location.state || {}
    
    const toggleSidebarItems = () => {
        setShowSidebarItems(prev => !prev)
    }

    useEffect(() => {
      if(!serviceId){
        navigate('/service')
      }
    },[serviceId, navigate])

    const fetchService = async () => {
      try {
        const {data} = await axios.get(`${backendUrl}/api/photographer/getEditService?serviceId=${serviceId}`, {headers:{photographerToken}})
        if(data.success){
          setInitialData({...data.service, serviceId:data.service._id})
        }else{
          navigate('/service')
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      if(serviceId){
        fetchService()
      }
    },[serviceId])

    const validateForm = (formData) => {
      const errors = {}

      if (!formData.serviceName || formData.serviceName.trim() === '') {
        errors.serviceName = 'Service name is required'
      }

      if (!formData.serviceDescription || formData.serviceDescription.trim() === '') {
        errors.serviceDescription = 'Service description is required'
      }

      if (
        formData.minPrice === undefined ||
        formData.minPrice === null ||
        (typeof formData.minPrice === 'string' && formData.minPrice.trim() === '')
      ) {
        errors.minPrice = 'Minimum price is required'
      }

      if (
        formData.maxPrice === undefined ||
        formData.maxPrice === null ||
        (typeof formData.maxPrice === 'string' && formData.maxPrice.trim() === '')
      ) {
        errors.maxPrice = 'Maximum price is required'
      }

      const minPriceNum = Number(formData.minPrice)
      const maxPriceNum = Number(formData.maxPrice)

      if (formData.minPrice && (isNaN(minPriceNum) || minPriceNum < 0)) {
        errors.minPrice = 'Invalid minimum price'
      }

      if (formData.maxPrice && (isNaN(maxPriceNum) || maxPriceNum < 0)) {
        errors.maxPrice = 'Invalid maximum price'
      }

      if (minPriceNum > maxPriceNum) {
        errors.minPrice = 'Minimum price cannot be greater than maximum price'
      }

      if (!['INR', 'USD'].includes(formData.currency)) {
        errors.currency = 'Invalid currency'
      }

      if (!formData.serviceDuration || formData.serviceDuration.trim() === '') {
        errors.serviceDuration = 'Service duration is required'
      }

      if (!['Active', 'Blocked'].includes(formData.serviceStatus)) {
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

    const handleUpdateService = async (formData) => {
      try {
        setGlobalErrorMsg({type:'', message:''})

        const errors = validateForm(formData)
        if(Object.keys(errors).length > 0){
          setFieldErrors(errors)
          return
        }

        const payload = {...formData, serviceId}

        const {data} = await axios.post(`${backendUrl}/api/photographer/update-service`, payload, {headers:{photographerToken}})
        if(data.success){
          navigate('/service')
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
              <ServiceForm heading='Edit Service' subHeadingService = 'Edit Service' mode='edit' initialData={initialData} onSubmit={handleUpdateService} fieldErrors={fieldErrors} globalErrorMsg={globalErrorMsg} clearGlobalErrorMsg={clearGlobalErrorMsg} clearFieldError={clearFieldError}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditService
