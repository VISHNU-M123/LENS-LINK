import React, { useContext, useEffect, useRef, useState } from 'react'
import logo from '../assets/logo-main-3.png'
import { CiSearch } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import {NavLink, useNavigate} from 'react-router-dom'
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdOutlineArrowRight } from "react-icons/md";
import user from '../assets/client-3.jpg'
import { IoIosArrowForward } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { AppContext } from '../context/AppContext';

const Navbar = () => {

  const {token, setToken, userData} = useContext(AppContext)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobilePagesOpen, setMobilePagesOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false)

  const dropdownRef = useRef(null)
  const togglerRef = useRef(null)
  const loginDropdownRef = useRef(null)
  const loginToggleRef = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target) && togglerRef.current && !togglerRef.current.contains(event.target)){
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  },[])

  useEffect(() => {
    const handleLoginClickOutside = (event) => {
      if(loginDropdownRef.current && !loginDropdownRef.current.contains(event.target) && loginToggleRef.current && !loginToggleRef.current.contains(event.target)){
        setIsLoginDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleLoginClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleLoginClickOutside)
    }
  },[])

  return (
    <>
      <div className='items-center h-[90px] lg:grid lg:grid-cols-[1.3fr_3fr_1fr] flex justify-between mx-5 lg:mx-0 bg-transparent'>
        <div>
          <img onClick={() => navigate('/')} className='mx-auto cursor-pointer h-[90px]' src={logo} alt="" />
        </div>
        <div className='hidden lg:block'>
          <ul className='flex justify-between'>
            <NavLink to='/' className={({isActive}) => 
              isActive
              ? 'font-bold border-b-[3px] border-b-[#ec0a30] py-8 text-white'
              : 'font-bold border-b-[3px] border-b-transparent hover:border-b-[3px] hover:border-[#ec0a30] py-8 cursor-pointer text-white'
            }>
              HOME
            </NavLink>

            <NavLink to='/allPhotographers' className={({isActive}) =>
              isActive
              ? 'font-bold border-b-[3px] border-b-[#ec0a30] py-8 text-white'
              : 'font-bold border-b-[3px] border-b-transparent hover:border-b-[3px] hover:border-[#ec0a30] py-8 cursor-pointer text-white'
            }>
              PHOTOGRAPHERS
            </NavLink>

            <NavLink to='/about' className={({isActive}) => 
              isActive
              ? 'font-bold border-b-[3px] border-b-[#ec0a30] py-8 text-white'
              : 'font-bold border-b-[3px] border-b-transparent hover:border-b-[3px] hover:border-[#ec0a30] py-8 cursor-pointer text-white'
            }>
              ABOUT
            </NavLink>
            
            <NavLink to='/services' className={({isActive}) => 
              isActive
              ? 'font-bold border-b-[3px] border-b-[#ec0a30] py-8 text-white'
              : 'font-bold border-b-[3px] border-b-transparent hover:border-b-[3px] hover:border-[#ec0a30] py-8 cursor-pointer text-white'
            }>
              SERVICE
            </NavLink>

            <NavLink to='/pricing' className={({isActive}) => 
              isActive
              ? 'font-bold border-b-[3px] border-b-[#ec0a30] py-8 text-white'
              : 'font-bold border-b-[3px] border-b-transparent hover:border-b-[3px] hover:border-[#ec0a30] py-8 cursor-pointer text-white'
            }>
              PRICING
            </NavLink>

            <NavLink to='/portfolio' className={({isActive}) => 
              isActive
              ? 'font-bold border-b-[3px] border-b-[#ec0a30] py-8 text-white'
              : 'font-bold border-b-[3px] border-b-transparent hover:border-b-[3px] hover:border-[#ec0a30] py-8 cursor-pointer text-white'
            }>
              PORTFOLIO
            </NavLink>

            <NavLink to='/blog' className={({isActive}) => 
              isActive
              ? 'font-bold border-b-[3px] border-b-[#ec0a30] py-8 text-white'
              : 'font-bold border-b-[3px] border-b-transparent hover:border-b-[3px] hover:border-[#ec0a30] py-8 cursor-pointer text-white'
            }>
              BLOG
            </NavLink>
              <li className='relative font-bold hover:border-b-[3px] border-b-[#ec0a30] py-8 cursor-pointer group text-white'>PAGES
                <ul className='absolute bg-[#111111] w-[180px] top-[105px] group-hover:top-[90px] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out'>
                  <NavLink to='/gallery'>
                    <li className='text-[#ffffff] py-[5px] px-[18px] font-[400]'>Gallery</li>
                  </NavLink>
                  <NavLink to='/portfolio-details'>
                    <li className='text-[#ffffff] py-[5px] px-[18px] font-[400]'>Portfolio Details</li>
                  </NavLink>
                  <NavLink to='/blog-details'>
                    <li className='text-[#ffffff] py-[5px] px-[18px] font-[400]'>Blog Details</li>
                  </NavLink>
                </ul>
              </li>
            <NavLink to='/contact' className={({isActive}) => 
              isActive
              ? 'font-bold border-b-[3px] border-b-[#ec0a30] py-8 text-white'
              : 'font-bold border-b-[3px] border-b-transparent hover:border-b-[3px] hover:border-[#ec0a30] py-8 cursor-pointer text-white'
            }>
              CONTACT
            </NavLink>
          </ul>
        </div>

        <div className='flex items-center gap-3'>
          <div className='bg-[#ec0a30] w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-md text-white mx-auto mr-0'>
            <CiSearch strokeWidth={3} />
          </div>
          {token && userData 
            ?
            <div ref={togglerRef} onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='bg-[#ec0a30] md:w-12 md:h-12 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden text-md text-white mx-auto ml-0 cursor-pointer'>
              <img src={user} className='w-full h-full object-cover rounded-full' alt="" />
            </div>
            :
            <button ref={loginToggleRef} onClick={() => setIsLoginDropdownOpen(!isLoginDropdownOpen)} className='bg-[#ec0a30] rounded-full flex items-center justify-center overflow-hidden text-md text-white mx-auto ml-0 cursor-pointer sm:px-8 sm:py-2 p-2'>
              <span className='hidden sm:inline'>Login</span>
              <FaUser className='sm:hidden w-4 h-4' />
            </button>
          }

          {/* login dropdown */}
          <div ref={loginDropdownRef} className={`absolute top-[10%] right-[5%] w-[320px]  overflow-hidden z-10 transition-all duration-500 ease-in-out ${isLoginDropdownOpen ? 'opacity-100 max-h-[400px]' : 'opacity-0 max-h-0'}`}>
            <div className='bg-[rgba(0,0,0,0.84)] p-[20px] m-[10px]'>
              <div className='flex flex-col items-center gap-3'>
                <button onClick={() => navigate('/login')} className='text-white bg-[#ec0a30] px-3 py-1 w-full rounded-full'>Login as user</button>
                <button className='text-white bg-[#ec0a30] px-3 py-1 w-full rounded-full'>Login as photographer</button>
              </div>
            </div>
          </div>

          {/* dropdown menu for the profile */}
          <div ref={dropdownRef} className={`absolute top-[10%] right-[5%] w-[320px]  overflow-hidden z-10 transition-all duration-500 ease-in-out ${isDropdownOpen ? 'opacity-100 max-h-[400px]' : 'opacity-0 max-h-0'}`}>
            <div className='bg-[rgba(0,0,0,0.84)] p-[20px] m-[10px]'>
              <div className='flex items-center'>
                <img src={user} alt="" className='w-[60px] rounded-full mr-[15px]' />
                <h1 className='font-[500] text-[#ffff]'>user name</h1>
              </div>
              <hr className='border-0 h-[1px] w-[100%] bg-[#ccc] mt-[15px] mb-[10px]'/>
              <a href="" className='group flex items-center text-decoration-none text-[#ffff] my-[12px]'>
                <FaUser className='w-[48px] h-auto bg-[#ec0a30] rounded-full p-[8px] mr-[15px]' />
                <p className='w-[100%] hover:font-[600]'>Edit profile</p>
                <span className='text-[16px] transition-transform duration-300 group-hover:translate-x-2'><IoIosArrowForward /></span>
              </a>
              <a href="" className='group flex items-center text-decoration-none text-[#ffff] my-[12px]'>
                <IoMdSettings className='w-[48px] h-auto bg-[#ec0a30] rounded-full p-[8px] mr-[15px]' />
                <p className='w-[100%] hover:font-[600]'>Settings & privacy</p>
                <span className='text-[16px] transition-transform duration-300 group-hover:translate-x-2'><IoIosArrowForward /></span>
              </a>
              <a href="" className='group flex items-center text-decoration-none text-[#ffff] my-[12px]'>
                <IoIosHelpCircle className='w-[48px] h-auto bg-[#ec0a30] rounded-full p-[8px] mr-[15px]' />
                <p className='w-[100%] hover:font-[600]'>Help & support</p>
                <span className='text-[16px] transition-transform duration-300 group-hover:translate-x-2'><IoIosArrowForward /></span>
              </a>
              <a href="" className='group flex items-center text-decoration-none text-[#ffff] my-[12px]'>
                <MdLogout className='w-[48px] h-auto bg-[#ec0a30] rounded-full p-[8px] mr-[15px]' />
                <p className='w-[100%] hover:font-[600]'>Logout</p>
                <span className='text-[16px] transition-transform duration-300 group-hover:translate-x-2'><IoIosArrowForward /></span>
              </a>
            </div>
          </div>

          <div className='block lg:hidden cursor-pointer' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <GiHamburgerMenu size={24} color='white' />
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className='w-full z-10 px-[20px] pb-[5px]'>
          <div className='bg-[#111]'>
            <ul>
              <NavLink to='/'>
                <li className='py-[8px] px-[30px] cursor-pointer hover:bg-[#ec0a30] active:bg-[#ec0a30] text-[#fff] text-[14px] font-[400]'>Home</li>
              </NavLink>
              <NavLink to='/allPhotographers'>
                <li className='py-[8px] px-[30px] cursor-pointer hover:bg-[#ec0a30] active:bg-[#ec0a30] text-[#fff] text-[14px] font-[400]'>Photographers</li>
              </NavLink>
              <NavLink to='/about'>
                <li className='py-[8px] px-[30px] cursor-pointer hover:bg-[#ec0a30] active:bg-[#ec0a30] text-[#fff] text-[14px] font-[400]'>About</li>
              </NavLink>
              <NavLink to='/services'>
                <li className='py-[8px] px-[30px] cursor-pointer hover:bg-[#ec0a30] active:bg-[#ec0a30] text-[#fff] text-[14px] font-[400]'>Services</li>
              </NavLink>
              <NavLink to='/pricing'>
                <li className='py-[8px] px-[30px] cursor-pointer hover:bg-[#ec0a30] active:bg-[#ec0a30] text-[#fff] text-[14px] font-[400]'>Pricing</li>
              </NavLink>
              <NavLink to='/portfolio'>
                <li className='py-[8px] px-[30px] cursor-pointer hover:bg-[#ec0a30] active:bg-[#ec0a30] text-[#fff] text-[14px] font-[400]'>Portfolio</li>
              </NavLink>
              <NavLink to='/blog'>
                <li className='py-[8px] px-[30px] cursor-pointer hover:bg-[#ec0a30] active:bg-[#ec0a30] text-[#fff] text-[14px] font-[400]'>Blog</li>
              </NavLink>
              <li className='text-[#fff] text-[14px] font-[400]'>
                <div className='flex items-center text-center py-[8px] px-[30px] cursor-pointer hover:bg-[#ec0a30] active:bg-[#ec0a30] w-full transition-colors duration-300' onClick={() => setMobilePagesOpen(!mobilePagesOpen)}>
                  Pages
                  <span className='ml-[5px]'>{mobilePagesOpen ? (<MdOutlineArrowDropDown size={20} />) : (<MdOutlineArrowRight size={20} />)}</span>
                </div>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobilePagesOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <ul>
                      <NavLink to='/gallery'>
                        <li className='text-[#ffffff] py-[8px] px-[30px] font-[400] hover:bg-[#ec0a30] active:bg-[#ec0a30]'>Gallery</li>
                      </NavLink>
                      <NavLink to='/portfolio-details'>
                        <li className='text-[#ffffff] py-[8px] px-[30px] font-[400] hover:bg-[#ec0a30] active:bg-[#ec0a30]'>Portfolio Details</li>
                      </NavLink>
                      <NavLink to='/blog-details'>
                        <li className='text-[#ffffff] py-[8px] px-[30px] font-[400] hover:bg-[#ec0a30] active:bg-[#ec0a30]'>Blog Details</li>
                      </NavLink>
                    </ul>
                  </div>
              </li>
              <NavLink to='/contact'>
                <li className='py-[8px] px-[30px] cursor-pointer hover:bg-[#ec0a30] active:bg-[#ec0a30] text-[#fff] text-[14px] font-[400]'>Contact</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
