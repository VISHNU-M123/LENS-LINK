import React, { useState } from 'react'
import profileImage from '../../assets/gallery-8.jpg'
import { IoEyeOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { IoStar } from "react-icons/io5";
import { LuMessageCircle } from "react-icons/lu";
import { IoCameraOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const PhotographersCard = ({photographer, backendUrl}) => {

    const [imageError, setImageError] = useState(false)

    const navigate = useNavigate()
  return (
    <div className='bg-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group'>
        <div className='relative overflow-hidden cursor-pointer group'>
            {!imageError ? (
                <img src={photographer.photographer.profileImage ? `${backendUrl}${photographer.photographer.profileImage}` : profileImage} onError={() => setImageError(true)} className='w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300' alt="" />
            ) : (
                <div className='w-full h-64 bg-zinc-700 flex items-center justify-center'>
                    <IoCameraOutline className='w-16 h-16 text-zinc-500' />
                </div>
            )}

            <div className='absolute inset-0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center'>
                <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2'>
                    <button className='bg-black bg-opacity-20 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-30 transition-all cursor-pointer'>
                        <IoEyeOutline className='w-5 h-5 text-white' />
                    </button>
                </div>
            </div>

            <button className='absolute top-3 right-3 bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-2 hover:bg-opacity-70 transition-all cursor-pointer'>
                <FaRegHeart className={`w-5 h-5 text-[#ec0a30]`} />
            </button>

            <div className='absolute top-3 left-3'>
                <span className='px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-white'>Available</span>
            </div>
        </div>

        <div className='p-5'>
            <div className='mb-3'>
                <h3 className='text-xl font-bold text-white mb-1 truncate'>{photographer.photographer.name}</h3>
                <p className='text-zinc-300 font-medium mb-1 truncate'>{photographer.studioName}</p>
                <div className='flex items-center text-zinc-400 text-sm mb-2'>
                    <FiMapPin className='w-4 h-4 mr-1' />
                    <span className='truncate'>{photographer.location}</span>
                </div>
            </div>

            <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center'>
                    <div className='flex items-center'>
                        {[...Array(5)].map((_, i) => (
                            <IoStar key={i} className={`w-4 h-4 text-yellow-400 fill-yellow-400`} 
                            />
                        ))}
                    </div>
                    <span className='text-white text-sm ml-2'>rating</span>
                    <span className='text-zinc-400 text-sm ml-1'>(2 reviews)</span>
                </div>
            </div>

            <div className='mb-4'>
                <div className='flex flex-wrap gap-1'>
                    <span className='px-2 py-1 bg-zinc-700 text-zinc-300 text-xs rounded-full'>spec</span>
                    <span className='px-2 py-1 bg-zinc-700 text-zinc-300 text-xs rounded-full'>Wedding Photography</span>
                </div>
            </div>

            <div className='flex justify-between items-center mb-4'>
                <div>
                    <p className='text-zinc-400 text-xs'>Starting from</p>
                    <p className='text-white font-bold text-lg'>$15000</p>
                </div>
                <div>
                    <p className='text-zinc-400 text-xs'>Experience</p>
                    <p className='text-white font-medium'>{photographer.experience} years</p>
                </div>
            </div>

            <div className='flex gap-2'>
                <button onClick={() => navigate(`/photographer-profile/${photographer.photographer._id}`)} className='flex-1 bg-[#ec0a30] hover:bg-[#701313] text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer'>
                    <IoEyeOutline className='w-4 h-4' />
                    view portfolio
                </button>
                <button className='bg-zinc-700 hover:bg-zinc-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center cursor-pointer'>
                    <LuMessageCircle  className='w-4 h-4' />
                </button>
            </div>
        </div>
    </div>
  )
}

export default PhotographersCard
