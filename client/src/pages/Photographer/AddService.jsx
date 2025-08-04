import React, { useContext, useState } from 'react'
import Sidebar from '../../components/Photographer/Sidebar'
import Navbar from '../../components/Photographer/Navbar'
import ServiceForm from '../../components/Photographer/ServiceForm'
import { PhotographerContext } from '../../context/PhotographerContext'
import axios from 'axios'

const AddService = () => {

    const [showSidebarItems, setShowSidebarItems] = useState(true)

    const {photographerToken, backendUrl} = useContext(PhotographerContext)

    const toggleSidebarItems = () => {
        setShowSidebarItems(prev => !prev)
    }

    const handleAddService = async (formData) => {
      try {
        const {data} = await axios.post(`${backendUrl}/api/photographer/add-service`, formData, {headers:{photographerToken}})
        if(data.success){
          alert('Service added successfully')
        }else{
          alert('Error adding services')
        }
      } catch (error) {
        console.log(error)
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
              <ServiceForm heading='Add Service' subHeadingService = 'Add Service' mode='add' onSubmit={handleAddService}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddService
