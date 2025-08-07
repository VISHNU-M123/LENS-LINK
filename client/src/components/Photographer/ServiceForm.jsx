import React, { useEffect, useState } from 'react'

const ServiceForm = ({heading, subHeadingService, mode='add', initialData = {}, onSubmit, fieldErrors, globalErrorMsg, clearGlobalErrorMsg, clearFieldError}) => {

    const [formData, setFormData] = useState({serviceName:'', serviceDescription:'', minPrice:'', maxPrice:'', currency:'', serviceDuration:'', serviceStatus:''})

    useEffect(() => {
        if(mode === 'edit' && initialData){
            setFormData(initialData)
        }
    },[mode, initialData])

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]:value
        }))

        if(globalErrorMsg.message){
            clearGlobalErrorMsg()
        }

        if(fieldErrors[name]){
            clearFieldError(name)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData, resetForm)
    }

    const resetForm = () => {
        if(mode === 'edit' && initialData){
            setFormData(initialData)
        }else{
            setFormData({
                serviceName: '',
                serviceDescription: '',
                minPrice: '',
                maxPrice: '',
                currency: '',
                serviceDuration: '',
                serviceStatus: ''
            })
        }
    }
  return (
    <div>
        <div className='mb-[24px] flex items-center'>
            <h1 className='text-white text-[18px] font-[500] leading-tight'>{heading}</h1>
        </div>
        <div className='-mx-3 flex flex-col md:flex-row'>
            <div className='mb-[24px] w-full px-3'>
                <div className='w-full min-w-full rounded-[4px] bg-[#191c24]'>
                    <div className='py-[28px] px-[25px]'>
                        <h1 className='text-white mb-[18px] text-[18px] font-[500] capitalize'>{subHeadingService}</h1>
                        {globalErrorMsg.message && (
                            <h6 className={`text-center text-red-500 text-md block mt-1`}>{globalErrorMsg.message}</h6>
                        )}
                        <form action="" onSubmit={handleFormSubmit}>
                            <div className='mb-[40px]'>
                                <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Service Name</label>
                                <input type="text" name='serviceName' value={formData.serviceName} onChange={handleChange} className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none ${fieldErrors.serviceName ? 'border-red-500' : 'border-[#2c2e33]'}`} placeholder='Service Name' />
                                {fieldErrors.serviceName && (
                                    <span className='text-red-500 text-xs block mt-1'>{fieldErrors.serviceName}</span>
                                )}
                            </div>
                            <div className='mb-[40px]'>
                                <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Service Description</label>
                                <input type="text" name='serviceDescription' value={formData.serviceDescription} onChange={handleChange} className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none ${fieldErrors.serviceDescription ? 'border-red-500' : 'border-[#2c2e33]'}`} placeholder='Service Description' />
                                {fieldErrors.serviceDescription && (
                                    <span className='text-red-500 text-xs block mt-1'>{fieldErrors.serviceDescription}</span>
                                )}
                            </div>
                            <div className='flex flex-col md:flex-row sm:gap-3'>
                                <div className='w-full mb-[40px]'>
                                    <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Minimum Price</label>
                                    <input type="text" name='minPrice' value={formData.minPrice} onChange={handleChange} className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none ${fieldErrors.minPrice ? 'border-red-500' : 'border-[#2c2e33]'}`} placeholder='Min Price' />
                                    {fieldErrors.minPrice && (
                                        <span className='text-red-500 text-xs block mt-1'>{fieldErrors.minPrice}</span>
                                    )}
                                </div>
                                <div className='w-full mb-[40px]'>
                                    <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Maximum Price</label>
                                    <input type="text" name='maxPrice' value={formData.maxPrice} onChange={handleChange} className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none ${fieldErrors.maxPrice ? 'border-red-500' : 'border-[#2c2e33]'}`} placeholder='Max Price' />
                                    {fieldErrors.maxPrice && (
                                        <span className='text-red-500 text-xs block mt-1'>{fieldErrors.maxPrice}</span>
                                    )}
                                </div>
                                <div className='w-full mb-[40px]'>
                                    <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Currency</label>
                                    <select id="" name='currency' value={formData.currency} onChange={handleChange} className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none ${fieldErrors.currency ? 'border-red-500' : 'border-[#2c2e33]'}`}>
                                        <option value="">Select Currency</option>
                                        <option value="INR">₹ INR</option>
                                        <option value="USD">$ USD</option>
                                    </select>
                                    {fieldErrors.currency && (
                                        <span className='text-red-500 text-xs block mt-1'>{fieldErrors.currency}</span>
                                    )}
                                </div>
                            </div>
                            <div className='mb-[40px]'>
                                <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Service Duration</label>
                                <input type="text" name='serviceDuration' value={formData.serviceDuration} onChange={handleChange} className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none ${fieldErrors.serviceDuration ? 'border-red-500' : 'border-[#2c2e33]'}`} placeholder='Service Duration' />
                                {fieldErrors.serviceDuration && (
                                    <span className='text-red-500 text-xs block mt-1'>{fieldErrors.serviceDuration}</span>
                                )}
                            </div>
                            <div className='mb-[40px]'>
                                <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Service Status</label>
                                <select id="" name='serviceStatus' value={formData.serviceStatus} onChange={handleChange} className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none ${fieldErrors.serviceStatus ? 'border-red-500' : 'border-[#2c2e33]'}`}>
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Blocked">Blocked</option>
                                </select>
                                {fieldErrors.serviceStatus && (
                                    <span className='text-red-500 text-xs block mt-1'>{fieldErrors.serviceStatus}</span>
                                )}
                            </div>
                            <button type='submit' className='text-white cursor-pointer py-[6px] px-[12px] text-[14px] font-normal leading-[1.42857143] text-center align-middle rounded-[4px] bg-[#0090e7] mr-[8px] inline-block'>{mode === 'edit' ? 'Update' : 'Submit'}</button>
                            <button onClick={resetForm} type='button' className='text-white cursor-pointer py-[6px] px-[12px] text-[14px] font-normal leading-[1.42857143] text-center align-middle rounded-[4px] bg-[#0d0d0d] inline-block'>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ServiceForm
