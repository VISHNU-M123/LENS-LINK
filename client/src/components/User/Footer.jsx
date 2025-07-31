import React from 'react'
import footerLogo from '../../assets/f-logo.png'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import instaImgOne from '../../assets/insta-1.jpg'
import instaImgTwo from '../../assets/insta-2.jpg'
import instaImgThree from '../../assets/insta-3.jpg'
import { IoIosSend } from "react-icons/io";

const Footer = () => {
  return (
    <div className='bg-black'>
      <div className='bg-black  pt-16 px-4 md:px-8 xl:max-w-7xl xl:mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-10 gap-1'>
            {/* first section in footer */}
            <div className='mb-8'>
                <img src={footerLogo} alt="" />
                <p className='text-[#c4c4c4] mt-8'>Capturing timeless memories across weddings, engagements, and celebrations — where every photo tells your story with heart and elegance.</p>
                <div className='flex mt-5 gap-5'>
                    <FaFacebookF color='white' size={18} />
                    <FaTwitter color='white' size={18} />
                    <FaYoutube color='white' size={18} />
                    <FaInstagram color='white' size={18} />
                </div>
            </div>

            {/* Instagram section in footer */}
            <div className='mb-8'>
                <h1 className='text-white text-[20px] font-[700]'>INSTAGRAM</h1>
                <div className='flex gap-1 mt-8'>
                    <img src={instaImgOne} alt="" className='h-18 w-auto' />
                    <img src={instaImgTwo} alt="" className='h-18 w-auto' />
                    <img src={instaImgThree} alt="" className='h-18 w-auto' />
                </div>
            </div>

            {/* Quick links section in footer */}
            <div className='mb-8'>
                <h1 className='text-white text-[20px] font-[700]'>QUICK LINKS</h1>
                <div className='flex mt-8 gap-16'>
                    <ul className='space-y-3'>
                        <li className='text-[#c4c4c4]'>Home</li>
                        <li className='text-[#c4c4c4]'>About</li>
                        <li className='text-[#c4c4c4]'>Contact</li>
                    </ul>
                    <ul className='space-y-3'>
                        <li className='text-[#c4c4c4]'>Gallery</li>
                        <li className='text-[#c4c4c4]'>Portfolio</li>
                        <li className='text-[#c4c4c4]'>Services</li>
                    </ul>
                </div>
            </div>

            {/* Subscribe section in footer */}
            <div className='mb-8'>
                <h1 className='text-white text-[20px] font-[700]'>SUBSCRBE</h1>
                <p className='text-[#c4c4c4] mt-8'>Subscribe to get updates on our latest shoots, exclusive offers, and behind-the-scenes moments from our studio.</p>
                <div className='mt-5'>
                    <form action="">
                        <div className='flex'>
                            <input type="text" className='px-5 py-3 text-white outline-none border border-[#ec0a30] w-full' placeholder='Email' />
                            <button className='bg-[#ec0a30] px-3 py-3 flex items-center justify-center'><IoIosSend color='white' size={30} /></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div className='border-t border-t-[#181d1d] mt-12 pb-4'>
            <div className='flex items-center justify-center py-8'>
                <p className='text-[#666666] text-[15px]'>Copyright © 2025 All rights reserved</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
