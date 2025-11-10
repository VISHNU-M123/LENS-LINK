import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import Navbar from '../../components/User/Navbar'
import PhotographersCard from '../../components/User/PhotographersCard'
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6";

const AllPhotographers = () => {

  const [photographers, setPhotographers] = useState([])
  const [showFilters, setShowFilters] = useState(false)

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
                <div className='text-center mb-10'>
                    <h1 className='font-[700] text-[36px] leading-tight text-white mb-3 text-center'>Find Your Perfect <span className='text-[#ec0a30]'>Photographer</span></h1>
                    <p className='text-[15px] text-white max-w-2xl mx-auto text-center mb-8'>Discover talented photographers in your area for weddings, events, portraits, and more</p>
                </div>

                <div className='relative max-w-4xl mx-auto mb-20 flex gap-2 flex-col md:flex-row'>
                    <div className='bg-white p-2 rounded-xl w-full'>
                        <div className='flex flex-row gap-2'>
                            <div className='flex-1 relative py-2'>
                                <CiSearch className='absolute left-4 top-1/2 transform -translate-y-1/2' size={20} />
                                <input type="text" className='pl-12 w-full outline-none text-[15px]' placeholder='Search by name, studio, or description...' />
                            </div>
                            <button className="bg-[#ec0a30] hover:bg-[#701313] text-white px-4 py-2 rounded-xl font-medium transition-colors cursor-pointer">
                                <CiSearch size={20} />
                            </button>
                        </div>
                    </div>

                    <div className='bg-white p-2 rounded-xl w-full md:w-[400px]'>
                        <div className='flex flex-row justify-between'>
                            <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center px-6 font-medium rounded-xl gap-2 relative py-2 cursor-pointer transition-all ${showFilters ? 'bg-[#ec0a30] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                                <CiFilter size={20} />
                                Filters
                                <FaChevronDown className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} size={12} />
                            </button>
                            <button className="bg-[#ec0a30] hover:bg-[#701313] text-white px-4 py-2 rounded-xl font-medium transition-colors cursor-pointer">
                                <CiSearch size={20} />
                            </button>
                        </div>
                    </div>

                    {/* filter dropdown */}
                    <div className={`absolute top-[100%] right-0 w-full md:max-w-[360px] overflow-hidden z-10 transition-all duration-500 ease-in-out ${showFilters ? 'opacity-100 max-h-[400px]' : 'opacity-0 max-h-0'}`}>
                        <div className='bg-white p-[20px] mt-[10px] rounded-md'>
                            <div className='py-2 space-y-2'>
                                <div>
                                    <label>Location</label>
                                    <div className='relative border border-gray-400 rounded-md'>
                                        <input type="text" className='px-4 py-2 w-full outline-none text-[15px]' placeholder='Search by name, studio, or description...' />
                                    </div>
                                </div>
                                <div>
                                    <label>Photographer Type</label>
                                    <div className='relative'>
                                        <select className='appearance-none w-full px-4 py-2 border border-gray-400 rounded-md outline-none text-[15px]'>
                                            <option value="">All Types</option>
                                            <option value="wedding">Wedding</option>
                                            <option value="portrait">Portrait</option>
                                            <option value="event">Event</option>
                                            <option value="commercial">Commercial</option>
                                        </select>
                                        <div className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2'>
                                            <FaChevronDown size={12} className='text-gray-500'/>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex gap-2 pt-4'>
                                    <button className='flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-300 text-gray-700 rounded-md font-medium transition-colors cursor-pointer'>Clear</button>
                                    <button className='flex-1 px-4 py-2 bg-[#ec0a30] hover:bg-[#701313] text-white rounded-md font-medium transition-colors cursor-pointer'>Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {photographers.map((photographer) => (
                    <PhotographersCard key={photographer._id} photographer={photographer} backendUrl={backendUrl}/>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AllPhotographers
