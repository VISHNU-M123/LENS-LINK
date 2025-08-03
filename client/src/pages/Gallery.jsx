import React, { useState } from 'react'
import Navbar from '../components/User/Navbar'
import Footer from '../components/User/Footer'
import galleryImgOne from '../assets/gallery-1.jpg'
import galleryImgTwo from '../assets/gallery-2.jpg'
import galleryImgThree from '../assets/gallery-3.jpg'
import galleryImgFour from '../assets/gallery-4.jpg'
import galleryImgFive from '../assets/gallery-5.jpg'
import galleryImgSix from '../assets/gallery-6.jpg'
import galleryImgSeven from '../assets/gallery-7.jpg'
import galleryImgEight from '../assets/gallery-8.jpg'
import galleryImgNine from '../assets/gallery-9.jpg'
import galleryImgTen from '../assets/gallery-10.jpg'
import galleryImgEleven from '../assets/gallery-11.jpg'
import galleryImgTwelve from '../assets/gallery-12.jpg'
import galleryImgThirteen from '../assets/gallery-13.jpg'
import galleryImgFourteen from '../assets/gallery-14.jpg'
import galleryImgFifteen from '../assets/gallery-15.jpg'
import galleryImgSixteen from '../assets/gallery-16.jpg'
import galleryImgSeventeen from '../assets/gallery-17.jpg'
import {Plus} from 'lucide-react'
import { FaRegHeart } from "react-icons/fa";

const Gallery = () => {

    const images = [ galleryImgOne, galleryImgTwo, galleryImgThree, galleryImgFour, galleryImgFive, galleryImgSix, galleryImgSeven, galleryImgEight, galleryImgNine, galleryImgTen, galleryImgEleven, galleryImgTwelve, galleryImgThirteen, galleryImgFourteen, galleryImgFifteen, galleryImgSixteen, galleryImgSeventeen]
    const [lightBoxImg, setLightBoxImg] = useState(null)

  return (
    <div className='w-full overflow-x-hidden bg-black'>
        <Navbar/>
        <div className='min-h-screen bg-black p-5 mt-16'>
            <div className='max-w-7xl mx-auto'>
                <div className='text-center mb-10'>
                    <h1 className='font-[700] text-[36px] leading-tight text-white mb-3 text-center'>Photography Gallery</h1>
                    <p className='text-[15px] text-[#D7D7D7] max-w-2xl mx-auto text-center mb-8'>Discover amazing works from talented photographers worldwide</p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
                    <button className='text-[#888888] text-[17px] px-1.5 md:px-6 border-r border-[#ccc] pr-1.5 md:pl-8'>All</button>
                    <button className='text-[#888888] text-[17px] px-1.5 md:px-6 border-r border-[#ccc] pr-1.5 md:pl-8'>Weddings</button>
                    <button className='text-[#888888] text-[17px] px-1.5 md:px-6 border-r border-[#ccc] pr-1.5 md:pl-8'>Engagements</button>
                    <button className='text-[#888888] text-[17px] px-1.5 md:px-6 border-r border-[#ccc] pr-1.5 md:pl-8'>Bridal Showers</button>
                    <button className='text-[#888888] text-[17px] px-1.5 md:px-6 border-r border-[#ccc] pr-1.5 md:pl-8'>Haldi</button>
                    <button className='text-[#888888] text-[17px] px-1.5 md:px-6 '>Videos</button>
                </div>
                
                <div className='pt-5 md:pt-10'>
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-3 px-0 space-y-3">
                        {
                            images.map((image, index) => (
                                <div key={index} className='relative group overflow-hidden'>
                                    <img src={image} alt="" className='w-full h-auto cursor-pointer block' />
                                    <div className='absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-100'>
                                        <Plus className='w-8 h-8 text-white cursor-pointer' onClick={() => setLightBoxImg(image)}/>
                                    </div>
                                    <div className='absolute bottom-0 left-0 right-0 pb-5 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-5 transition-all duration-300 cursor-pointer'>
                                        <h1 className='text-white font-bold leading-tight'>photographer Name</h1>
                                        <p className='text-white font-semibold'>studio name</p>
                                    </div>
                                    <div className='absolute top-3 right-3 flex flex-col items-center opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-5 transition-all duration-300 cursor-pointer'>
                                        <div className='bg-white/20 rounded-full p-2'>
                                            <FaRegHeart color='white'/>
                                        </div>
                                        <span className='text-white text-sm mt-1'>120</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {
                        lightBoxImg && (
                            <div className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center' onClick={() => setLightBoxImg(null)}>
                                <img src={lightBoxImg} alt="" className='max-w-full max-h-full shadow-lg' />
                            </div>
                        )
                    }
                </div>

                <div className='flex items-center justify-center mt-12 pb-24'>
                    <button className='text-white bg-green-600 text-md font-bold tracking-widest py-3.5 px-20 cursor-pointer'>LOAD MORE</button>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
  )
}

export default Gallery
