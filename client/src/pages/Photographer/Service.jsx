import React, { useState } from 'react'
import Sidebar from '../../components/Photographer/Sidebar'
import Navbar from '../../components/Photographer/Navbar'
import { FaPencilAlt } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

const Service = () => {

    const [showSidebarItems, setShowSidebarItems] = useState(true)

    const navigate = useNavigate()

    const toggleSidebarItems = () => {
        setShowSidebarItems(prev => !prev)
    }
  return (
    <div>
      <div className='flex'>
        <div className='hidden lg:block'>
            <Sidebar showItems={showSidebarItems} />
        </div>
        <div className='w-full'>
            <Navbar toggleSidebarItems={toggleSidebarItems} showItems={showSidebarItems} />
            <div className='pt-[70px]'>
                <div className="bg-[#000000] py-[30px] px-[28px] w-full min-h-screen">
                    <div>
                        <div className="mb-[24px] w-full">
                            <div className="bg-[#191c24] rounded-[4px]">
                                <div className="py-[28px] px-[25px]">
                                    <h1 className="text-white mb-[18px] text-[18px] font-[500]">All Services</h1>
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[1000px]">
                                            <thead>
                                                <tr>
                                                  <th className="text-[#6c7293] text-[14px] font-[500] p-[15px] leading-none border-b border-b-[#2c2e33] align-middle text-left">Service Name</th>
                                                  <th className="text-[#6c7293] text-[14px] font-[500] p-[15px] leading-none border-b border-b-[#2c2e33] align-middle text-left">Service Description</th>
                                                  <th className="text-[#6c7293] text-[14px] font-[500] p-[15px] leading-none border-b border-b-[#2c2e33] align-middle text-left">Service Status</th>
                                                  <th className="text-[#6c7293] text-[14px] font-[500] p-[15px] leading-none border-b border-b-[#2c2e33] align-middle text-left">More info</th>
                                                  <th className="text-[#6c7293] text-[14px] font-[500] p-[15px] leading-none border-b border-b-[#2c2e33] align-middle text-left">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="p-[15px] text-[14px] align-middle leading-none whitespace-nowrap text-white border-b border-b-[#2c2e33] truncate overflow-hidden text-ellipsis max-w-[180px]">service name</td>
                                                    <td className="p-[15px] text-[14px] align-middle leading-none whitespace-nowrap text-white border-b border-b-[#2c2e33] truncate overflow-hidden text-ellipsis max-w-[200px]">service description</td>
                                                    <td className="p-[15px] text-[14px] align-middle leading-none whitespace-nowrap text-white border-b border-b-[#2c2e33]">
                                                        <button className={`border hover:text-white py-[8px] px-[11px] rounded-[4px] text-[12px] leading-none font-[500] text-center inline-block cursor-pointer border-[#00d25b] text-[#00d25b] hover:bg-[#00d25b]}`}>service status</button>
                                                    </td>
                                                    <td className="p-[15px] text-[14px] align-middle leading-none whitespace-nowrap text-white border-b border-b-[#2c2e33]">
                                                        <button className="border border-[#00d25b] text-[#00d25b] hover:bg-[#00d25b] hover:text-white py-[8px] px-[11px] rounded-[4px] text-[12px] leading-none font-[500] text-center inline-block cursor-pointer">Info</button>
                                                    </td>
                                                    <td className="p-[15px] text-[14px] align-middle leading-none whitespace-nowrap text-white border-b border-b-[#2c2e33]">
                                                        <a href="" className='inline-flex items-center justify-center w-8 h-8 rounded-[4px] border border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white mr-3'>
                                                            <FaPencilAlt size={14} />
                                                        </a>
                                                        <a href="" className='inline-flex items-center justify-center w-8 h-8 rounded-[4px] border border-[#fc424a] text-[#fc424a] hover:bg-[#fc424a] hover:text-white'>
                                                            <ImBin size={14} />
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='justify-center flex items-center'>
                        <button onClick={() => navigate('/add-service')} className='text-white text-center bg-green-500 px-5 py-2 cursor-pointer rounded-sm'>add new service</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Service
