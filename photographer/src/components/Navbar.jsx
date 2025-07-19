import React, { useEffect, useRef, useState } from 'react'
import logo_mini from '../assets/logo-mini.svg'
import { MdOutlineMenu } from "react-icons/md";
import { FaRegFile } from "react-icons/fa6";
import { PiGlobeBold } from "react-icons/pi";
import { MdLayers } from "react-icons/md";
import { IoGridSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import faceImgOne from '../assets/face4.jpg'
import { FaBell } from "react-icons/fa";
import { FaCalendarDay } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaLink } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import profileIcon from '../assets/face15.jpg'
import { MdLogout } from "react-icons/md";
import { MdFormatLineSpacing } from "react-icons/md";
import Sidebar from './Sidebar';

const Navbar = ({toggleSidebarItems, showItems}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isEmailMsgOpen, setIsEmailMsgOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const menuRef = useRef(null);
  const emailMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event){
      if(menuRef.current && !menuRef.current.contains(event.target)){
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside)
  },[])

  useEffect(() => {
    function handleClickOutside(event){
      if(emailMenuRef.current && !emailMenuRef.current.contains(event.target)){
        setIsEmailMsgOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside)
  },[])

  useEffect(() => {
    function handleClickOutside(event){
      if(notificationRef.current && !notificationRef.current.contains(event.target)){
        setIsNotificationOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside)
  },[])

  useEffect(() => {
    function handleClickOutside(event){
      if(profileRef.current && !profileRef.current.contains(event.target)){
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  },[])

  return (
    <div className={`bg-[#191c24] flex flex-row z-[1030] w-full fixed transition-all ease-in-out duration-300 ${showItems ? 'lg:w-[calc(100%-244px)]' : 'lg:w-[calc(100%-70px)]'}`}>
      <div className='bg-[#191c24] flex items-center lg:hidden w-[75px]'>
        <a href="" className='pl-[20px]'>
          <img src={logo_mini} alt="" className='[width:calc(70px-50px)] max-w-full h-[28px] m-auto' />
        </a>
      </div>
      <div className='px-[15px] w-full h-[70px] flex items-stretch flex-grow-1' style={{ boxShadow: '20px 19px 34px -15px rgba(0, 0, 0, 0.5)' }}>
        <button className='text-[14px] h-[70px] self-center cursor-pointer px-[12px] hidden lg:block' onClick={toggleSidebarItems}><MdOutlineMenu color='#6c7293' /></button>
        <ul className='w-full flex items-center flex-row flex-1'>
          <li className='w-full'>
            <form action="" className='mx-[16px] text-[15px] py-[8px] text-white hidden lg:block'>
              <input type="text" className='bg-[#191c24] border border-[#2c2e33] outline-none rounded-[6px] px-[20px] pt-[13px] pb-[11px] text-[14px] w-3/4' placeholder='Search products' />
            </form>
          </li>
        </ul>
        <ul className='flex items-center'>
          <li ref={menuRef} className='relative hidden lg:block'>
            <button onClick={() => setIsOpen(!isOpen)} className={`mx-[16px] ${isOpen ? 'bg-green-500' : ''} text-white px-[12px] py-[6px] text-[15px] rounded-[4px] hover:bg-green-500 cursor-pointer`}>+ Create New Project</button>
            <div className={`bg-[#191c24] absolute rounded-[4px] min-w-[235px] mt-0 top-[48px] left-auto right-0 shadow-[0px_0px_35px_-3px_rgb(0,0,0)] transition-all ease-in-out duration-300 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
              <h1 className='p-[16px] text-[15px] font-[500] text-white'>Projects</h1>
              <div className='h-[0.5px] w-full bg-gray-700'></div>
              <a href="" className='flex items-center py-[11px] px-[13px]'>
                <div>
                  <div className='bg-black w-[40px] h-[40px] flex items-center justify-center rounded-full'>
                    <FaRegFile className='text-blue-400 text-[17px]' />
                  </div>
                </div>
                <div className='pl-[15px]'>
                  <p className='mb-[4px] max-w-[200px] text-white text-[14px]'>Software Development</p>
                </div>
              </a>
              <div className='h-[0.5px] w-full bg-gray-700'></div>
              <a href="" className='flex items-center py-[11px] px-[13px]'>
                <div>
                  <div className='bg-black w-[40px] h-[40px] flex items-center justify-center rounded-full'>
                    <PiGlobeBold className='text-violet-500 text-[17px]' />
                  </div>
                </div>
                <div className='pl-[15px]'>
                  <p className='mb-[4px] max-w-[200px] text-white text-[14px]'>UI Development</p>
                </div>
              </a>
              <div className='h-[0.5px] w-full bg-gray-700'></div>
              <a href="" className='flex items-center py-[11px] px-[13px]'>
                <div>
                  <div className='bg-black w-[40px] h-[40px] flex items-center justify-center rounded-full'>
                    <MdLayers  className='text-red-500 text-[17px]' />
                  </div>
                </div>
                <div className='pl-[15px]'>
                  <p className='mb-[4px] max-w-[200px] text-white text-[14px]'>Software Testing</p>
                </div>
              </a>
              <div className='h-[0.5px] w-full bg-gray-700'></div>
              <p className='text-white text-[14px] p-[16px] text-center'>See all projects</p>
            </div>
          </li>
          <li className='hidden lg:block'>
            <a href="" className='mx-[16px] inline-block'>
              <IoGridSharp size={18} color='white' />
            </a>
          </li>
          <li ref={emailMenuRef} className='relative py-[8px]'>
            <a href="" onClick={(e) => {e.preventDefault(); e.stopPropagation(); setIsEmailMsgOpen(!isEmailMsgOpen)}} className='relative mx-[12px] md:mx-[16px] inline-block'>
              <MdEmail size={20} color='white' />
              <span className='absolute w-[7px] h-[7px] bg-green-500 top-0 right-0 rounded-full'></span>
            </a>
            <div className={`absolute mt-0 top-[48px] md:left-auto md:right-0 md:translate-x-0 left-1/2 -translate-x-1/2 max-w-[90vw] rounded-[4px] bg-[#191c24] shadow-[0px_0px_35px_-3px_rgb(0,0,0)] min-w-[260px] transition-all ease-in-out duration-300 ${isEmailMsgOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
              <h1 className='p-[16px] text-[15px] font-[500] text-white'>Messages</h1>
              <div className='h-[1px] w-full bg-gray-700'></div>
              <a href="" className='py-[11px] px-[13px] flex items-center cursor-pointer'>
                <div>
                  <img src={faceImgOne} className='w-[40px] h-[40px] rounded-full' alt="" />
                </div>
                <div className='pl-[15px]'>
                  <p className='text-[14px] mb-[4px] text-white'>Mark send you a message</p>
                  <p className='text-[#6c7293] text-[14px]'>1 Minutes ago</p>
                </div>
              </a>
              <div className='h-[1px] w-full bg-gray-700'></div>
              <a href="" className='py-[11px] px-[13px] flex items-center cursor-pointer'>
                <div>
                  <img src={faceImgOne} className='w-[40px] h-[40px] rounded-full' alt="" />
                </div>
                <div className='pl-[15px]'>
                  <p className='text-[14px] mb-[4px] text-white'>Cregh send you a message</p>
                  <p className='text-[#6c7293] text-[14px]'>15 Minutes ago</p>
                </div>
              </a>
              <div className='h-[1px] w-full bg-gray-700'></div>
              <a href="" className='py-[11px] px-[13px] flex items-center cursor-pointer'>
                <div>
                  <img src={faceImgOne} className='w-[40px] h-[40px] rounded-full' alt="" />
                </div>
                <div className='pl-[15px]'>
                  <p className='text-[14px] mb-[4px] text-white'>Profile picture updated</p>
                  <p className='text-[#6c7293] text-[14px]'>18 Minutes ago</p>
                </div>
              </a>
              <div className='h-[1px] w-full bg-gray-700'></div>
              <p className='text-center p-[16px] text-white'>4 new messages</p>
            </div>
          </li>
          <li ref={notificationRef} className='relative py-[8px]'>
            <a href="" onClick={(e) => {e.preventDefault(); e.stopPropagation(); setIsNotificationOpen(!isNotificationOpen)}} className='mx-[12px] md:mx-[16px] relative inline-block'>
              <FaBell size={18} color='white' />
              <span className='absolute w-[7px] h-[7px] bg-red-500 top-0 right-0 rounded-full'></span>
            </a>
            <div className={`absolute mt-0 top-[48px] md:left-auto md:right-0 md:translate-x-0 left-1/2 -translate-x-1/2 max-w-[90vw] bg-[#191c24] rounded-[4px] shadow-[0px_0px_35px_-3px_rgb(0,0,0)] min-w-[280px] transition-all duration-300 ease-in-out ${isNotificationOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
              <h1 className='p-[16px] text-[15px] font-[500] text-white'>Notifications</h1>
              <div className='h-[0.5px] w-full bg-gray-700'></div>
              <a href="" className='py-[11px] px-[13px] flex items-center'>
                <div className='relative'>
                  <div className='w-[40px] h-[40px] bg-black flex items-center justify-center rounded-full'>
                    <FaCalendarDay className='text-green-500 text-[17px]'/>
                  </div>
                </div>
                <div className='pl-[15px] whitespace-nowrap'>
                  <p className='mb-[4px] text-white text-[14px]'>Event today</p>
                  <p className='text-[#6c7293] text-[14px] max-w-[200px] overflow-hidden text-ellipsis'>Just a reminder that you have an event today</p>
                </div>
              </a>
              <div className='h-[0.5px] w-full bg-gray-700'></div>
              <a href="" className='py-[11px] px-[13px] flex items-center'>
                <div className='relative'>
                  <div className='w-[40px] h-[40px] bg-black flex items-center justify-center rounded-full'>
                    <IoMdSettings className='text-red-500 text-[17px]'/>
                  </div>
                </div>
                <div className='pl-[15px] whitespace-nowrap'>
                  <p className='mb-[4px] text-white text-[14px]'>Settings</p>
                  <p className='text-[#6c7293] text-[14px] max-w-[200px] overflow-hidden text-ellipsis'>Update dashboard</p>
                </div>
              </a>
              <div className='h-[0.5px] w-full bg-gray-700'></div>
              <a href="" className='py-[11px] px-[13px] flex items-center'>
                <div className='relative'>
                  <div className='w-[40px] h-[40px] bg-black flex items-center justify-center rounded-full'>
                    <FaLink className='text-yellow-500 text-[17px]' />
                  </div>
                </div>
                <div className='pl-[15px] whitespace-nowrap'>
                  <p className='mb-[4px] text-white text-[14px]'>Launch Admin</p>
                  <p className='text-[#6c7293] text-[14px] max-w-[200px] overflow-hidden text-ellipsis'>New admin wow!</p>
                </div>
              </a>
              <div className='h-[0.5px] w-full bg-gray-700'></div>
              <p className='p-[16px] text-[14px] text-center text-white'>See all notifications</p>
            </div>
          </li>
          <li ref={profileRef} className='relative'>
            <a href="" onClick={(e) => {e.preventDefault(); e.stopPropagation(); setIsProfileOpen(!isProfileOpen)}} className='mx-[12px] md:mx-[16px] py-[8px] relative inline-block whitespace-nowrap'>
              <div className='flex items-center'>
                <img src={profileIcon} alt="" className='h-[35px] w-[35px] rounded-full' />
                <p className='ml-[16px] text-[14px] text-white whitespace-nowrap hidden md:block'>Henry Klein</p>
                <IoMdArrowDropdown className='text-[#a7afb7] text-[18px] hidden md:block' />
              </div>
            </a>
            <div className={`absolute mt-0 top-[48px] left-auto right-0 bg-[#191c24] rounded-[4px] shadow-[0px_0px_35px_-3px_rgb(0,0,0)] min-w-[150px] transition-all duration-300 ease-in-out ${isProfileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
              <h1 className='p-[16px] text-[15px] font-[500] text-white'>Profile</h1>
              <div className='h-[0.5px] w-full bg-gray-700'></div>
              <a href="" className='py-[11px] px-[13px] flex items-center'>
                <div className='relative'>
                  <div className='w-[40px] h-[40px] flex items-center justify-center bg-black rounded-full'>
                    <IoMdSettings className='text-green-500 text-[17px]'/>
                  </div>
                </div>
                <div className='pl-[15px]'>
                  <p className='mb-[4px] text-[14px] text-white'>Settings</p>
                </div>
              </a>
              <div className='h-[0.5px] w-full bg-gray-700'></div>
              <a href="" className='py-[11px] px-[13px] flex items-center'>
                <div className='relative'>
                  <div className='w-[40px] h-[40px] flex items-center justify-center bg-black rounded-full'>
                    <MdLogout className='text-red-500 text-[17px]' />
                  </div>
                </div>
                <div className='pl-[15px]'>
                  <p className='mb-[4px] text-[14px] text-white'>Logout</p>
                </div>
              </a>
              <div className='h-[0.5px] w-full bg-gray-700'></div>
              <p className='p-[16px] text-center text-[14px] text-white'>Advanced settings</p>
            </div>
          </li>
        </ul>
        <button className='pl-[15px] pr-[11px] h-[70px] self-center lg:hidden' onClick={() => setIsMobileSidebarOpen(true)}>
          <span>
            <MdFormatLineSpacing color='#6c7293' size={20} />
          </span>
        </button>
        {
          isMobileSidebarOpen && (
            <div className='fixed inset-0 z-40 lg:hidden' onClick={() => setIsMobileSidebarOpen(false)}></div>
          )
        }
        <div className={`fixed top-[70px] right-0 h-full w-[244px] bg-[#191c24] z-50 transition-transform duration-300 ease-in-out ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
          <Sidebar showItems={true} hideLogoSection={true}/>
        </div>
      </div>
    </div>
  )
}

export default Navbar