import React, { useEffect, useState } from 'react'

const ServiceForm = ({heading, subHeadingService, mode='add', initialData = {}, onSubmit}) => {

    const [formData, setFormData] = useState({serviceName:'', serviceDescription:'', servicePrice:'', serviceDuration:'', serviceStatus:''})

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
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
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
                        {/* {globalCategoryError && ( */}
                            {/* <h6 className='text-center text-red-500 text-sm block mt-1'>{globalCategoryError}</h6> */}
                        {/* )} */}
                        <form action="" onSubmit={handleFormSubmit}>
                            <div className='mb-[40px]'>
                                <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Service Name</label>
                                <input type="text" name='serviceName' value={formData.serviceName} onChange={handleChange} className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none border-[#2c2e33]`} placeholder='Service Name' />
                                {/* {showCategoryErrorMsg.categoryName && ( */}
                                    {/* <span className='text-red-500 text-xs block mt-1'>{showCategoryErrorMsg.categoryName}</span> */}
                                {/* )} */}
                            </div>
                            <div className='mb-[40px]'>
                                <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Service Description</label>
                                <input type="text" name='serviceDescription' value={formData.serviceDescription} onChange={handleChange} className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none border-[#2c2e33]`} placeholder='Service Description' />
                                {/* {showCategoryErrorMsg.categoryDescription && ( */}
                                    {/* <span className='text-red-500 text-xs block mt-1'>{showCategoryErrorMsg.categoryDescription}</span> */}
                                {/* )} */}
                            </div>
                            <div className='mb-[40px]'>
                                <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Service Price</label>
                                <input type="text" name='servicePrice' value={formData.servicePrice} onChange={handleChange} className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none border-[#2c2e33]`} placeholder='Service Price' />
                                {/* {showCategoryErrorMsg.categoryDescription && ( */}
                                    {/* <span className='text-red-500 text-xs block mt-1'>{showCategoryErrorMsg.categoryDescription}</span> */}
                                {/* )} */}
                            </div>
                            <div className='mb-[40px]'>
                                <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Service Duration</label>
                                <input type="text" name='serviceDuration' value={formData.serviceDuration} onChange={handleChange} className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none border-[#2c2e33]`} placeholder='Service Duration' />
                                {/* {showCategoryErrorMsg.categoryDescription && ( */}
                                    {/* <span className='text-red-500 text-xs block mt-1'>{showCategoryErrorMsg.categoryDescription}</span> */}
                                {/* )} */}
                            </div>
                            <div className='mb-[40px]'>
                                <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Service Status</label>
                                <select id="" name='serviceStatus' value={formData.serviceStatus} onChange={handleChange} className='h-[41.2px] border border-[#2c2e33] text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none'>
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Blocked">Blocked</option>
                                </select>
                            </div>
                            <button type='submit' className='text-white cursor-pointer py-[6px] px-[12px] text-[14px] font-normal leading-[1.42857143] text-center align-middle rounded-[4px] bg-[#0090e7] mr-[8px] inline-block'>{mode === 'edit' ? 'Update' : 'Submit'}</button>
                            <button type='button' className='text-white cursor-pointer py-[6px] px-[12px] text-[14px] font-normal leading-[1.42857143] text-center align-middle rounded-[4px] bg-[#0d0d0d] inline-block'>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ServiceForm
