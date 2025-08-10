import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/Photographer/Sidebar'
import Navbar from '../../components/Photographer/Navbar'
import coverImg from '../../assets/IndianWedding-Landing.jpg'
import { RiImageEditLine } from "react-icons/ri";
import profileImg from '../../assets/gallery-3.jpg'
import { LuPhone } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FiAward } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { RiEdit2Fill } from "react-icons/ri";
import axios from 'axios';
import { PhotographerContext } from '../../context/PhotographerContext';
import { FiPlus } from "react-icons/fi";

const ProfileDetails = () => {

  const {photographerToken, backendUrl} = useContext(PhotographerContext)

    const [showSidebarItems, setShowSidebarItems] = useState(true)
    const [editModes, setEditModes] = useState({pforile:false, about:false, contact:false, equipment:false, achievements:false, specializations:false, socialLinks:false})
    const [profileData, setProfileData] = useState({})
    const [aboutText, setAboutText] = useState('')
    const [showAboutError, setShowAboutError] = useState('')

    const toggleSidebarItems = () => {
        setShowSidebarItems(prev => !prev)
    }

    const toggleEditMode = (section) => {
      setEditModes(prev => ({
        ...prev,
        [section]: !prev[section]
      }))

      if(section === "about" && !editModes.about){
        setAboutText(profileData.about)
      }
    }

    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          const {data} = await axios.get(`${backendUrl}/api/photographer/getProfile`, {headers:{photographerToken}})
          if(data.success){
            setProfileData(data.profileData)
          }else{
            alert('photographer phofile details fetching error')
          }
        } catch (error) {
          console.log(error)
        }
      }

      fetchProfileData()
    },[photographerToken])

    const saveAbout = async () => {
      try {
        setShowAboutError('');
        if(!aboutText || aboutText.trim() === ''){
          setShowAboutError('About is required')
          return
        }

        let formattedAbout = aboutText.trim().replace(/\s+/g, ' ');

        if(formattedAbout.length < 10){
          setShowAboutError('About must be at least 10 characters')
          return
        }

        if(formattedAbout.length > 1000){
          setShowAboutError('About cannot exceed 1000 characters')
          return
        }

        if (/^(.)\1+$/.test(formattedAbout)) {
          setShowAboutError('About cannot be just a single repeated character')
          return
        }

        const {data} = await axios.post(`${backendUrl}/api/photographer/updateAbout`, {about:formattedAbout}, {headers:{photographerToken}})
        if(data.success){
          setProfileData(prev => ({...prev, about:data.about}))
          setEditModes(prev => ({...prev, about:false}))
          alert('about updated successfully')
        }else{
          setShowAboutError(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const cancelEdit = () => {
      setAboutText(profileData.about || '')
      setEditModes(prev => ({...prev, about:false}))
      setShowAboutError('')
    }

  return (
    <div>
      <div className='flex'>
        <div className="hidden lg:block">
            <Sidebar showItems={showSidebarItems}/>
        </div>
        <div className='w-full'>
            <Navbar toggleSidebarItems={toggleSidebarItems} showItems={showSidebarItems}/>
            <div className='pt-[70px]'>
                <div className="bg-[#000000] py-[30px] px-[28px] w-full min-h-screen">
                    {/* <p className='text-white'>profile details of photographer</p> */}
                    <div className='-mx-3'>
                      <div className="mb-[24px] px-3">
                        <div className="relative w-full rounded-[4px] bg-[#191c24]">
                          <div className="relative py-[28px] px-[25px] h-64 sm:h-80 lg:h-96 overflow-hidden">
                            <img src={coverImg} className='h-full w-full object-cover rounded-[4px]' alt="" />
                            <div className='absolute bottom-10 right-10 bg-black/60 p-2 rounded-full hover:bg-black/80 transition cursor-pointer'>
                              <RiImageEditLine color='white' size={22} />
                            </div>
                          </div>

                          <div className='-mt-20 sm:-mt-24 lg:-mt-28 ml-6 sm:ml-10 p-5 relative z-10'>
                            <div className='relative flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6'>
                              <div className='relative'>
                                <img src={profileImg} className='w-24 h-24 sm:w-32 sm:h-32 lg:w-[180px] lg:h-[180px] object-cover rounded-lg' alt="" />
                                {/* <div className='absolute bottom-2 right-2 bg-black/60 p-2 rounded-full hover:bg-black/80 transition cursor-pointer'>
                                  <RiImageEditLine color='white' size={18} />
                                </div> */}
                              </div>
                              <div className='pb-2'>
                                  <h1 className='text-3xl font-bold text-white mb-1'>Photographer name</h1>
                                  <p className='text-lg text-[#ec0a30] font-medium mb-2'>Studio name</p>
                                  <div className='flex items-center gap-2'>
                                    <FiMapPin size={16} className='text-[#D7D7D7]' />
                                    <span className='text-[#D7D7D7]'>Location</span>
                                  </div>
                              </div>
                              <div className='absolute bottom-2 right-2 bg-black/60 p-2 md:px-5 rounded-full hover:bg-black/80 transition cursor-pointer'>
                                <RiEdit2Fill color='white' className='block md:hidden' size={18} />
                                <button className='text-white px-5 hidden md:block'>Edit Profile</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row -mx-3">
                      <div className="mb-[24px] xl:w-8/12 md:w-6/12 flex items-stretch px-3">
                        <div className="bg-[#191c24] rounded-[4px] w-full">
                          <div className="py-[28px] px-[25px]">
                            <div className='flex justify-between items-center mb-[18px]'>
                              <h1 className="text-white text-[18px] font-[500]">About</h1>
                              {profileData.about && (
                                <button onClick={() => toggleEditMode('about')} className='text-[#ec0a30] hover:text-red-400 transition cursor-pointer'>
                                  <RiEdit2Fill size={18} />
                                </button>
                              )}
                            </div>
                            {editModes.about ? (
                              <div className='space-y-3'>
                                <textarea name="" id="" value={aboutText} onChange={(e) => {setAboutText(e.target.value); if(showAboutError) setShowAboutError('')}} className={`w-full bg-[#2a2d36] text-[#D7D7D7] px-3 py-2 rounded h-32 resize-none outline-none ${showAboutError ? 'border border-red-500' : ''}`} placeholder='Tell people about yourself, your experience, and what makes you unique as a photographer...'></textarea>
                                {showAboutError && (
                                  <span className='text-red-500 text-xs block -mt-1'>{showAboutError}</span>
                                )}
                                <div className='flex gap-2'>
                                  <button type='button' onClick={saveAbout} className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm'>Save</button>
                                  <button type='button' onClick={cancelEdit} className='bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-sm'>Cancel</button>
                                </div>
                              </div>
                            ):(
                              <>
                              {profileData.about ? (
                                <div>
                                  <p className="text-[#D7D7D7] text-[14px]">{profileData.about}</p>
                                  {/* <p className="text-[#D7D7D7] text-[14px]">Passionate photographer specializing in capturing life\'s most precious moments. With over 8 years of experience, I blend artistic vision with technical expertise to create timeless memories that tell your unique story.</p> */}
                                </div>
                              ):(
                                <div className='text-center py-8 text-[#D7D7D7]'>
                                  <p className='text-sm mb-4'>Add a description about yourself to let clients know more about your photography style and experience.</p>

                                  <button onClick={() => toggleEditMode('about')} className='bg-[#ec0a30] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm flex items-center gap-2 mx-auto'>
                                      <FiPlus size={16} />
                                      Add Information
                                  </button>
                                </div>
                              )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mb-[24px] xl:w-4/12 md:w-6/12 flex items-stretch px-3">
                        <div className="bg-[#191c24] rounded-[4px] w-full">
                          <div className="py-[28px] px-[25px]">
                            <div className='flex justify-between items-center mb-[18px]'>
                              <h1 className="text-white text-[18px] font-[500]">Contact information</h1>
                              <button className='text-[#ec0a30] hover:text-red-400 transition'>
                                <RiEdit2Fill size={18} />
                              </button>
                            </div>
                            <div className='space-y-3'>
                              <div className='flex items-center gap-3'>
                                <LuPhone size={18} className='text-[#ec0a30]' />
                                <span className='text-[#D7D7D7] text-sm'>9874563210</span>
                              </div>
                              <div className='flex items-center gap-3'>
                                <CiMail size={18} strokeWidth={1} className='text-[#ec0a30]' />
                                <span className='text-[#D7D7D7] text-sm'>abcdefg@gmail.com</span>
                              </div>
                              <div className='flex items-center gap-3'>
                                <FaWhatsapp size={18} strokeWidth={1} className='text-[#ec0a30]' />
                                <a href="https://wa.me/9874563210" target='_blank' rel="noopener noreferrer" className='text-[#D7D7D7] text-sm'>9874563210</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row -mx-3">
                      <div className="mb-[24px] md:w-6/12 flex items-stretch px-3">
                        <div className="bg-[#191c24] rounded-[4px] w-full">
                          <div className="py-[28px] px-[25px]">
                            <div className='flex justify-between items-center mb-[18px]'>
                              <h1 className="text-white text-[18px] font-[500]">Professional Equipments</h1>
                              <button className='text-[#ec0a30] hover:text-red-400 transition'>
                                <RiEdit2Fill size={18} />
                              </button>
                            </div>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                              <div className='flex items-center gap-3'>
                                <FiCheckCircle size={16} className='text-green-500' />
                                <span className='text-[#D7D7D7] text-sm'>Canon EOS R5</span>
                              </div>
                              <div className='flex items-center gap-3'>
                                <FiCheckCircle size={16} className='text-green-500' />
                                <span className='text-[#D7D7D7] text-sm'>Sony A7R IV</span>
                              </div>
                              <div className='flex items-center gap-3'>
                                <FiCheckCircle size={16} className='text-green-500' />
                                <span className='text-[#D7D7D7] text-sm'>Professional Lighting Kit</span>
                              </div>
                              <div className='flex items-center gap-3'>
                                <FiCheckCircle size={16} className='text-green-500' />
                                <span className='text-[#D7D7D7] text-sm'>Drone Photography</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-[24px] md:w-6/12 flex items-stretch px-3">
                        <div className="bg-[#191c24] rounded-[4px] w-full">
                          <div className="py-[28px] px-[25px]">
                            <div className='flex justify-between items-center mb-[18px]'>
                              <h1 className="text-white text-[18px] font-[500]">Achievements</h1>
                              <button className='text-[#ec0a30] hover:text-red-400 transition'>
                                <RiEdit2Fill size={18} />
                              </button>
                            </div>
                            <div className='space-y-3'>
                              <div className='flex items-start gap-3'>
                                  <FiAward size={16} className='text-yellow-500 mt-1' />
                                  <span className='text-[#D7D7D7] text-sm'>Wedding Photographer of the Year 2023</span>
                              </div>
                              <div className='flex items-start gap-3'>
                                  <FiAward size={16} className='text-yellow-500 mt-1' />
                                  <span className='text-[#D7D7D7] text-sm'>Featured in Modern Wedding Magazine</span>
                              </div>
                              <div className='flex items-start gap-3'>
                                  <FiAward size={16} className='text-yellow-500 mt-1' />
                                  <span className='text-[#D7D7D7] text-sm'>500+ Happy Couples</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row -mx-3">
                      <div className="mb-[24px] xl:w-8/12 md:w-6/12 flex items-stretch px-3">
                        <div className="bg-[#191c24] rounded-[4px] w-full">
                          <div className="py-[28px] px-[25px]">
                            <div className='flex justify-between items-center mb-[18px]'>
                              <h1 className="text-white text-[18px] font-[500]">Specialisations</h1>
                              <button className='text-[#ec0a30] hover:text-red-400 transition'>
                                <RiEdit2Fill size={18} />
                              </button>
                            </div>
                            <div className='flex flex-wrap gap-3'>
                              <span className='bg-[#ec0a30] text-[#D7D7D7] text-sm px-4 py-2 rounded-full font-medium'>Wedding Photography</span>
                              <span className='bg-[#ec0a30] text-[#D7D7D7] text-sm px-4 py-2 rounded-full font-medium'>Portrait Sessions</span>
                              <span className='bg-[#ec0a30] text-[#D7D7D7] text-sm px-4 py-2 rounded-full font-medium'>Event Photography</span>
                              <span className='bg-[#ec0a30] text-[#D7D7D7] text-sm px-4 py-2 rounded-full font-medium'>Commercial Shoots</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-[24px] xl:w-4/12 md:w-6/12 flex items-stretch px-3">
                        <div className="bg-[#191c24] rounded-[4px] w-full">
                          <div className="py-[28px] px-[25px]">
                            <div className='flex justify-between items-center mb-[18px]'>
                              <h1 className="text-white text-[18px] font-[500]">Social Links</h1>
                              <button className='text-[#ec0a30] hover:text-red-400 transition'>
                                <RiEdit2Fill size={18} />
                              </button>
                            </div>
                            <div className='flex flex-col flex-wrap gap-3'>
                              <div className='flex gap-3 items-center'>
                                <button className='bg-[#ec0a30] w-fit hover:bg-[#701313] text-white p-3 rounded-xl hover:shadow-lg transition-all cursor-pointer'>
                                  <FaInstagram size={20} />
                                </button>
                                <p className='text-[#D7D7D7] text-sm'>photographer_instagram_id</p>
                              </div>
                              <div className='flex gap-3 items-center'>
                                <button className='bg-[#ec0a30] w-fit hover:bg-[#701313] text-white p-3 rounded-xl hover:shadow-lg transition-all cursor-pointer'>
                                  <FiFacebook size={20} />
                                </button>
                                <p className='text-[#D7D7D7] text-sm'>photographer_facebook_id</p>
                              </div>
                              <div className='flex gap-3 items-center'>
                                <button className='bg-[#ec0a30] w-fit hover:bg-[#701313] text-white p-3 rounded-xl hover:shadow-lg transition-all cursor-pointer'>
                                  <FiTwitter size={20} />
                                </button>
                                <p className='text-[#D7D7D7] text-sm'>photographer_twitter_id</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetails
