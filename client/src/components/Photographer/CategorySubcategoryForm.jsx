import React, { useState } from 'react'

const CategorySubcategoryForm = ({heading, subHeadingCategory, subHeadingSubCategory, mode='add', initialData={}, onCategorySubmit, onSubCategorySubmit, categories, fieldErrors, globalErrorMsg, clearGlobalErrorMsg, clearFieldError}) => {

    const [categoryData, setCategoryData] = useState({categoryName:'', categoryDescription:'', categoryStatus:''})
    const [subCategoryData, setSubCategoryData] = useState({subCategoryName:'', subCategoryDescription:'', subCategoryStatus:'', mainCategoryId:''})

    const handleCategoryChange = (e) => {
        const {name, value} = e.target
        setCategoryData((prevData) => ({
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

    const handleSubCategoryChange = (e) => {
        const {name, value} = e.target
        setSubCategoryData((prevData) => ({
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

    const resetCategoryForm = () => {
        setCategoryData({categoryName:'', categoryDescription:'', categoryStatus:''})
    }

    const resetSubCategoryForm = () => {
        setSubCategoryData({subCategoryName:'', subCategoryDescription:'', subCategoryStatus:'', mainCategoryId:''})
    }

    const handleCategorySubmit = (e) => {
        e.preventDefault()
        onCategorySubmit(categoryData, resetCategoryForm)
    }

    const handleSubCategorySubmit = (e) => {
        e.preventDefault()
        onSubCategorySubmit(subCategoryData, resetSubCategoryForm)
    }
  return (
    <div>
        <div className='mb-[24px] flex items-center'>
            <h1 className='text-white text-[18px] font-[500] leading-tight'>{heading}</h1>
        </div>
        <div className='-mx-3 flex flex-col md:flex-row'>
            <div className='mb-[24px] md:w-1/2 px-3'>
                <div className='w-full min-w-full rounded-[4px] bg-[#191c24]'>
                    <div className='py-[28px] px-[25px]'>
                        <h1 className='text-white mb-[18px] text-[18px] font-[500] capitalize'>{subHeadingCategory}</h1>
                        {globalErrorMsg.message && (
                            <h6 className={`text-center text-red-500 text-md block mt-1`}>{globalErrorMsg.message}</h6>
                        )}
                        <form action="" onSubmit={handleCategorySubmit}>
                            <div className='mb-[40px]'>
                                <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Category Name</label>
                                <input type="text" name='categoryName' value={categoryData.categoryName} onChange={handleCategoryChange} className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none ${fieldErrors.categoryName ? 'border-red-500' : 'border-[#2c2e33]'}`} placeholder='Category Name' />
                                {fieldErrors.categoryName && (
                                    <span className='text-red-500 text-xs block mt-1'>{fieldErrors.categoryName}</span>
                                )}
                            </div>
                            <div className='mb-[40px]'>
                                <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Category Description</label>
                                <input type="text" name='categoryDescription' value={categoryData.categoryDescription} onChange={handleCategoryChange} className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none ${fieldErrors.categoryDescription ? 'border-red-500' : 'border-[#2c2e33]'}`} placeholder='Category Description' />
                                {fieldErrors.categoryDescription && (
                                    <span className='text-red-500 text-xs block mt-1'>{fieldErrors.categoryDescription}</span>
                                )}
                            </div>
                            <div className='mb-[40px]'>
                                <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Category Status</label>
                                <select name="categoryStatus" id="" value={categoryData.categoryStatus} onChange={handleCategoryChange} className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none ${fieldErrors.categoryStatus ? 'border-red-500' : 'border-[#2c2e33]'}`}>
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Blocked">Blocked</option>
                                </select>
                                {fieldErrors.categoryStatus && (
                                    <span className='text-red-500 text-xs block mt-1'>{fieldErrors.categoryStatus}</span>
                                )}
                            </div>
                            <button type='submit' className='text-white cursor-pointer py-[6px] px-[12px] text-[14px] font-normal leading-[1.42857143] text-center align-middle rounded-[4px] bg-[#0090e7] mr-[8px] inline-block'>{mode === 'edit' ? 'Update' : 'Submit'}</button>
                            <button type='button' className='text-white cursor-pointer py-[6px] px-[12px] text-[14px] font-normal leading-[1.42857143] text-center align-middle rounded-[4px] bg-[#0d0d0d] inline-block'>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className='mb-[24px] md:w-1/2 px-3'>
                <div className='w-full min-w-full rounded-[4px] bg-[#191c24]'>
                    <div className='py-[28px] px-[25px]'>
                        <h1 className='text-white mb-[18px] text-[18px] font-[500] capitalize'>{subHeadingSubCategory}</h1>
                        <form action="" onSubmit={handleSubCategorySubmit}>
                            <div className='mb-[40px]'>
                                <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Subcategory Name</label>
                                <input type="text" name='subCategoryName' value={subCategoryData.subCategoryName} onChange={handleSubCategoryChange} className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none ${fieldErrors.subCategoryName ? 'border-red-500' : 'border-[#2c2e33]'}`} placeholder='Subcategory Name' />
                                {fieldErrors.subCategoryName && (
                                    <span className='text-red-500 text-xs block mt-1'>{fieldErrors.subCategoryName}</span>
                                )}
                            </div>
                            <div className='mb-[40px]'>
                                <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Subcategory Description</label>
                                <input type="text" name='subCategoryDescription' value={subCategoryData.subCategoryDescription} onChange={handleSubCategoryChange} className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none ${fieldErrors.subCategoryDescription ? 'border-red-500' : 'border-[#2c2e33]'}`} placeholder='Subcategory Description' />
                                {fieldErrors.subCategoryDescription && (
                                    <span className='text-red-500 text-xs block mt-1'>{fieldErrors.subCategoryDescription}</span>
                                )}
                            </div>
                            <div className='mb-[40px]'>
                                <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Subcategory Status</label>
                                <select name="subCategoryStatus" value={subCategoryData.subCategoryStatus} onChange={handleSubCategoryChange} id="" className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none ${fieldErrors.subCategoryStatus ? 'border-red-500' : 'border-[#2c2e33]'}`}>
                                    <option value="">Select Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Blocked">Blocked</option>
                                </select>
                                {fieldErrors.subCategoryStatus && (
                                    <span className='text-red-500 text-xs block mt-1'>{fieldErrors.subCategoryStatus}</span>
                                )}
                            </div>
                            <div className='mb-[40px]'>
                                <label htmlFor="" className='text-[14px] leading-none align-top text-white'>Select Main Category</label>
                                <select name="mainCategoryId" value={subCategoryData.mainCategoryId} onChange={handleSubCategoryChange} id="" className={`h-[41.2px] border text-[14px] font-normal py-[10px] px-[11px] bg-[#2A3038] rounded-[2px] text-white leading-none w-full block outline-none ${fieldErrors.mainCategoryId ? 'border-red-500' : 'border-[#2c2e33]'}`}>
                                    <option value="">Select main category</option>
                                    {categories.map(cat => (
                                        <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                                    ))}
                                </select>
                                {fieldErrors.mainCategoryId && (
                                    <span className='text-red-500 text-xs block mt-1'>{fieldErrors.mainCategoryId}</span>
                                )}
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

export default CategorySubcategoryForm
