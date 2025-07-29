import React, { useContext, useEffect, useState } from 'react'
import PhotographersCard from '../components/PhotographersCard'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { AppContext } from '../context/AppContext'

const AllPhotographers = () => {

  const [photographers, setPhotographers] = useState([])

  const {backendUrl, token} = useContext(AppContext)

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const {data} = await axios.get(`${backendUrl}/api/user/allPhotographers`)
        if(data.success){
          setPhotographers(data.photographers)
        }else{
          alert(data.error)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchPhotographers()
  }, [])
  return (
    <div className="w-full overflow-x-hidden bg-black">
      <Navbar/>
      <div className='min-h-screen bg-black p-5 mt-16'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='font-[700] text-[36px] text-white mb-8 text-center'>PHOTOGRAPHERS</h1>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {photographers.map((photographer) => (
              <PhotographersCard key={photographer._id} photographer={photographer}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllPhotographers
