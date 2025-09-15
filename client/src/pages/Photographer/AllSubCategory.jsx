import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/Photographer/Sidebar'
import Navbar from '../../components/Photographer/Navbar'
import { PhotographerContext } from '../../context/PhotographerContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FaPencilAlt } from 'react-icons/fa'
import { ImBin } from 'react-icons/im'

const AllSubCategory = () => {

    const {photographerToken, backendUrl} = useContext(PhotographerContext)
    const {categoryId} = useParams()

    const [showSidebarItems, setShowSidebarItems] = useState(true)
    const [subCategories, setSubCategories] = useState([])

    const toggleSidebarItems = () => {
        setShowSidebarItems(prev => !prev)
    }

    const handleToggleSubCategoryStatus = async (subCategoryId) => {
        try {
            const {data} = await axios.post(`${backendUrl}/api/photographer/toggleSubCategoryStatus`, {subCategoryId}, {headers:{photographerToken}})
            if(data.success){
                setSubCategories((prev) => prev.map((sub) => sub._id === subCategoryId ? {...sub, subCategoryStatus:data.updatedStatus} : sub))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const {data} = await axios.get(`${backendUrl}/api/photographer/loadAllSubCategory/${categoryId}`, {headers:{photographerToken}})
                if(data.success){
                    setSubCategories(data.subCategories)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchSubCategories()
    },[photographerToken, categoryId])
  return (
    <div>
      <div className="flex">
        <div className="hidden lg:block">
            <Sidebar showItems={showSidebarItems} />
        </div>
        <div className='w-full'>
            <Navbar toggleSidebarItems={toggleSidebarItems} showItems={showSidebarItems} />
            <div className='pt-[70px]'>
                <div className="bg-[#000000] py-[30px] px-[28px] w-full min-h-screen">
                    <div>
                        <div className='mb-[24px] w-full'>
                            <div className="bg-[#191c24] rounded-[4px]">
                                <div className="py-[28px] px-[25px]">
                                    <h1 className="text-white mb-[18px] text-[18px] font-[500]">All SubCategory</h1>
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[1000px]">
                                            <thead>
                                                <tr>
                                                    <th className="text-[#6c7293] text-[14px] font-[500] p-[15px] leading-none border-b border-b-[#2c2e33] align-middle text-left">SubCategory Name</th>
                                                    <th className="text-[#6c7293] text-[14px] font-[500] p-[15px] leading-none border-b border-b-[#2c2e33] align-middle text-left">SubCategory Description</th>
                                                    <th className="text-[#6c7293] text-[14px] font-[500] p-[15px] leading-none border-b border-b-[#2c2e33] align-middle text-left">SubCategory Status</th>
                                                    <th className="text-[#6c7293] text-[14px] font-[500] p-[15px] leading-none border-b border-b-[#2c2e33] align-middle text-left">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subCategories.map((subCategory) => (
                                                    <tr key={subCategory._id}>
                                                        <td className="p-[15px] text-[14px] align-middle leading-none whitespace-nowrap text-white border-b border-b-[#2c2e33] truncate overflow-hidden text-ellipsis max-w-[180px]">{subCategory.subCategoryName}</td>
                                                        <td className="p-[15px] text-[14px] align-middle leading-none whitespace-nowrap text-white border-b border-b-[#2c2e33] truncate overflow-hidden text-ellipsis max-w-[200px]">{subCategory.subCategoryDescription}</td>
                                                        <td className="p-[15px] text-[14px] align-middle leading-none whitespace-nowrap text-white border-b border-b-[#2c2e33]">
                                                            <button onClick={() => handleToggleSubCategoryStatus(subCategory._id)} className={`border hover:text-white py-[8px] px-[11px] rounded-[4px] text-[12px] leading-none font-[500] text-center inline-block cursor-pointer ${subCategory.subCategoryStatus === 'Active' ? 'border-[#00d25b] text-[#00d25b] hover:bg-[#00d25b]' : 'border-[#fc424a] text-[#fc424a] hover:bg-[#fc424a]'}`}>{subCategory.subCategoryStatus}</button>
                                                        </td>
                                                        <td className="p-[15px] text-[14px] align-middle leading-none whitespace-nowrap text-white border-b border-b-[#2c2e33]">
                                                            <a href="" className='inline-flex items-center justify-center w-8 h-8 rounded-[4px] border border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white mr-3'>
                                                                <FaPencilAlt size={14} />
                                                            </a>
                                                            <button className='inline-flex items-center justify-center w-8 h-8 rounded-[4px] border border-[#fc424a] text-[#fc424a] hover:bg-[#fc424a] hover:text-white cursor-pointer'>
                                                                <ImBin/>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AllSubCategory
