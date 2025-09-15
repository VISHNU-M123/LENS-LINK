import React, { useState } from 'react'
import Sidebar from '../../components/Photographer/Sidebar'
import Navbar from '../../components/Photographer/Navbar'
import CategorySubcategoryForm from '../../components/Photographer/CategorySubcategoryForm'

const EditCategorySubcategory = () => {

  const [showSidebarItems, setShowSidebarItems] = useState(true)

  const toggleSidebarItems = () => {
    setShowSidebarItems(prev => !prev)
  }
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
              <CategorySubcategoryForm heading='Edit Category & Subcategory' subHeadingCategory='Edit Category' subHeadingSubCategory='Edit Subcategory' mode='edit' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCategorySubcategory
