import React, { useState } from 'react'
import Sidebar from '../../components/Photographer/Sidebar'
import Navbar from '../../components/Photographer/Navbar'
import { FaPencilAlt } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { PhotographerContext } from '../../context/PhotographerContext';
import { useEffect } from 'react';
import axios from 'axios';
import DeleteConfirm from '../../components/Photographer/DeleteConfirm';

const Service = () => {

    const {photographerToken, backendUrl} = useContext(PhotographerContext)

    const [showSidebarItems, setShowSidebarItems] = useState(true)
    const [allServices, setAllServices] = useState([])

    const navigate = useNavigate()

    const toggleSidebarItems = () => {
        setShowSidebarItems(prev => !prev)
    }

    const handleToggleServiceStatus = async (serviceId) => {
        try {
            const {data} = await axios.post(`${backendUrl}/api/photographer/toggleServiceStatus`, {serviceId}, {headers:{photographerToken}})
            if(data.success){
                setAllServices(prev => prev.map(service => service._id === serviceId ? {...service, serviceStatus:data.serviceStatus} : service))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteService = async (serviceId, serviceName) => {
        try {
            const confirmed = await DeleteConfirm(`Delete Service ${serviceName} ?`)
            if(!confirmed) return

            const {data} = await axios.post(`${backendUrl}/api/photographer/delete-service`, {serviceId}, {headers:{photographerToken}})
            if(data.success){
                setAllServices(prev => prev.filter(service => service._id !== serviceId))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchAllServices = async () => {
            try {
                const {data} = await axios.get(`${backendUrl}/api/photographer/allservices`, {headers:{photographerToken}})
                if(data.success){
                    setAllServices(data.allServices)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchAllServices()
    },[photographerToken])
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
                                                  <th className="text-[#6c7293] text-[14px] font-[500] p-[15px] leading-none border-b border-b-[#2c2e33] align-middle text-left">Price Range</th>
                                                  <th className="text-[#6c7293] text-[14px] font-[500] p-[15px] leading-none border-b border-b-[#2c2e33] align-middle text-left">Duration</th>
                                                  <th className="text-[#6c7293] text-[14px] font-[500] p-[15px] leading-none border-b border-b-[#2c2e33] align-middle text-left">Service Status</th>
                                                  <th className="text-[#6c7293] text-[14px] font-[500] p-[15px] leading-none border-b border-b-[#2c2e33] align-middle text-left">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allServices.map((services) => (
                                                    <tr key={services._id}>
                                                        <td className="p-[15px] text-[14px] align-middle leading-none whitespace-nowrap text-white border-b border-b-[#2c2e33] truncate overflow-hidden text-ellipsis max-w-[180px]">{services.serviceName}</td>
                                                        <td className="p-[15px] text-[14px] align-middle leading-none whitespace-nowrap text-white border-b border-b-[#2c2e33] truncate overflow-hidden text-ellipsis max-w-[200px]">{services.serviceDescription}</td>
                                                        <td className="p-[15px] text-[14px] align-middle leading-none whitespace-nowrap text-white border-b border-b-[#2c2e33] truncate overflow-hidden text-ellipsis max-w-[200px]">{services.currency === "USD" ? '$' : '₹'}{services.minPrice}-{services.maxPrice}</td>
                                                        <td className="p-[15px] text-[14px] align-middle leading-none whitespace-nowrap text-white border-b border-b-[#2c2e33] truncate overflow-hidden text-ellipsis max-w-[200px]">{services.serviceDuration}</td>
                                                        {/* <td className="p-[15px] text-[14px] align-middle leading-none whitespace-nowrap text-white border-b border-b-[#2c2e33]">
                                                            <button className="border border-[#00d25b] text-[#00d25b] hover:bg-[#00d25b] hover:text-white py-[8px] px-[11px] rounded-[4px] text-[12px] leading-none font-[500] text-center inline-block cursor-pointer">Info</button>
                                                        </td> */}
                                                        <td className="p-[15px] text-[14px] align-middle leading-none whitespace-nowrap text-white border-b border-b-[#2c2e33]">
                                                            <button onClick={() => handleToggleServiceStatus(services._id)} className={`border hover:text-white py-[8px] px-[11px] rounded-[4px] text-[12px] leading-none font-[500] text-center inline-block cursor-pointer ${services.serviceStatus === 'Active' ? 'border-[#00d25b] text-[#00d25b] hover:bg-[#00d25b]' : 'border-[#fc424a] text-[#fc424a] hover:bg-[#fc424a]'}`}>{services.serviceStatus}</button>
                                                        </td>
                                                        <td className="p-[15px] text-[14px] align-middle leading-none whitespace-nowrap text-white border-b border-b-[#2c2e33]">
                                                            <a href="" onClick={() => navigate('/edit-service',{state:{serviceId:services._id}})} className='inline-flex items-center justify-center w-8 h-8 rounded-[4px] border border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white mr-3'>
                                                                <FaPencilAlt size={14} />
                                                            </a>
                                                            <button href="" onClick={() => handleDeleteService(services._id, services.serviceName)} className='inline-flex items-center justify-center w-8 h-8 rounded-[4px] border border-[#fc424a] text-[#fc424a] hover:bg-[#fc424a] hover:text-white cursor-pointer'>
                                                                <ImBin size={14} />
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
