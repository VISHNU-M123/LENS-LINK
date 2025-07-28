import React from 'react'
import PhotographersCard from '../components/PhotographersCard'
import Navbar from '../components/Navbar'

const AllPhotographers = () => {
  return (
    <div className="w-full overflow-x-hidden bg-black">
      <Navbar/>
      <div className='min-h-screen bg-black p-5 mt-16'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-3xl font-bold text-white mb-8 text-center'>Photographers</h1>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            <PhotographersCard/>
            <PhotographersCard/>
            <PhotographersCard/>
            <PhotographersCard/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllPhotographers
