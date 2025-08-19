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
import { RiAddLine } from "react-icons/ri";
import { ImBin } from "react-icons/im";
import { FaLinkedin } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa";
import { IoBriefcaseOutline } from "react-icons/io5";

const ProfileDetails = () => {

  const {photographerToken, backendUrl} = useContext(PhotographerContext)

    const [showSidebarItems, setShowSidebarItems] = useState(true)
    const [editModes, setEditModes] = useState({profile:false, about:false, contact:false, equipment:false, achievements:false, specializations:false, socialLinks:false})
    const [profileData, setProfileData] = useState({equipment:[], achievements:[], specializations:[], socialLinks:[], photographer:{}})
    const [aboutText, setAboutText] = useState('')
    const [showAboutError, setShowAboutError] = useState('')

    const [newEquipment, setNewEquipment] = useState('')
    const [isAddingEquipment, setIsAddingEquipment] = useState(false)
    const [showEquipmentError, setShowEquipmentError] = useState('')
    const [isEditingEquipment, setIsEditingEquipment] = useState(false)
    const [editedEquipment, setEditedEquipment] = useState([])
    const [editEquipmentError, setEditEquipmentError] = useState([])

    const [newAchievement, setNewAchievement] = useState('')
    const [isAddingAchievement, setIsAddingAchievement] = useState(false)
    const [showAchievementError, setShowAchievementError] = useState('')
    const [isEditingAchievement, setIsEditingAchievement] = useState(false)
    const [editedAchievement, setEditedAchievement] = useState([])
    const [editAchievementError, setEditAchievementError] = useState([])

    const [newSpecialization, setNewSpecialization] = useState('')
    const [isAddingSpecialization, setIsAddingSpecialization] = useState(false)
    const [showSpecializationError, setShowSpecializationError] = useState('')
    const [isEditingSpecialization, setIsEditingSpecialization] = useState(false)
    const [editedSpecialization, setEditedSpecialization] = useState([])
    const [editSpecializationError, setEditSpecializationError] = useState([])

    const [newSocialLink, setNewSocialLink] = useState({platform:'', url:''})
    const [isAddingSocialLink, setIsAddingSocialLink] = useState(false)
    const [showSocialLinkError, setShowSocialLinkError] = useState('')
    const [isEditingSocialLink, setIsEditingSocialLink] = useState(false)
    const [editedSocialLink, setEditedSocialLink] = useState([])
    const [editSocialLinkError, setEditSocialLinkError] = useState([])

    const [newWhatsapp, setNewWhatsapp] = useState('')
    const [isAddingWhatsapp, setIsAddingWhatsapp] = useState(false)
    const [showWhatsappError, setShowWhatsappError] = useState('')
    const [isEditingWhatsapp, setIsEditingWhatsapp] = useState(false)
    const [editedWhatsapp, setEditedWhatsapp] = useState('')

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

    const addNewEquipment = async () => {
      try {
        setShowEquipmentError('')

        if(!newEquipment || newEquipment.trim() === ''){
          setShowEquipmentError('Equipment name is required')
          return
        }

        const {data} = await axios.post(`${backendUrl}/api/photographer/addEquipment`, {equipment:newEquipment}, {headers:{photographerToken}})
        if(data.success){
          alert('new equipment added successfylly')
          setProfileData(prev => ({...prev, equipment:data.equipment}))
          setNewEquipment('')
          setIsAddingEquipment(false)
        }else{
          alert(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const updateEquipment = async () => {
      try {

        const errors = Array(editedEquipment.length).fill('')
        let hasError = false

        const cleanedEquipment = editedEquipment.map((item, index) => {
          let trimmed = typeof item === 'string' ? item.trim() : ''
          if(!trimmed){
            errors[index] = 'this field cannot be empty'
            hasError = true
          }
          return trimmed
        })

        setEditEquipmentError(errors)

        if(hasError) return

        if(cleanedEquipment.some(item => item === '')){
          alert('each equipment item must be a non empty string')
          return
        }

        const {data} = await axios.post(`${backendUrl}/api/photographer/updateEquipment`, {equipment:cleanedEquipment}, {headers:{photographerToken}})
        if(data.success){
          setProfileData(prev => ({...prev, equipment:data.equipment}))
          setIsEditingEquipment(false)
          alert('equipments edited successfully')
        }else{
          alert(data.message)
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

    const addNewAchievement = async () => {
      try {
        setShowAchievementError('')

        if(!newAchievement || newAchievement.trim() === ''){
          setShowAchievementError('Achievement is required')
          return
        }

        const {data} = await axios.post(`${backendUrl}/api/photographer/addAchievement`, {achievement:newAchievement}, {headers:{photographerToken}})
        if(data.success){
          alert('new achievement added successfully')
          setProfileData(prev => ({...prev, achievements:data.achievements}))
          setNewAchievement('')
          setIsAddingAchievement(false)
        }else{
          alert(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const updateAchievement = async () => {
      try {
        
        const errors = Array(editedAchievement.length).fill('')
        let hasError = false

        const cleanedAchievement = editedAchievement.map((item, index) => {
          let trimmed = typeof item === 'string' ? item.trim() : ''
          if(!trimmed){
            errors[index] = 'this field cannot be empty'
            hasError = true
          }
          return trimmed
        })

        setEditAchievementError(errors)

        if(hasError) return

        if(cleanedAchievement.some(item => item === '')){
          alert('Each achievement item must be a non empty string')
          return
        }

        const {data} = await axios.post(`${backendUrl}/api/photographer/updateAchievement`, {achievements:cleanedAchievement}, {headers:{photographerToken}})
        if(data.success){
          setProfileData(prev => ({...prev, achievements:data.achievements}))
          setIsEditingAchievement(false)
          alert('achievements edited successfully')
        }else{
          alert(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const addNewSpecialization = async () => {
      try {
        setShowSpecializationError('')

        if(!newSpecialization || newSpecialization.trim() === ''){
          setShowSpecializationError('Specialization is required')
          return
        }

        const {data} = await axios.post(`${backendUrl}/api/photographer/addSpecialization`, {specializations:newSpecialization}, {headers:{photographerToken}})
        if(data.success){
          alert('new specialization added successfully')
          setProfileData(prev => ({...prev, specializations:data.specializations}))
          setNewSpecialization('')
          setIsAddingSpecialization(false)
        }else{
          alert(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const updateSpecialization = async () => {
      try {
        const errors = Array(editedSpecialization.length).fill('')
        let hasError = false

        const cleanedSpecialization = editedSpecialization.map((item, index) => {
          let trimmed = typeof item === 'string' ? item.trim() : ''
          if(!trimmed){
            errors[index] = 'this field cannot be empty'
            hasError = true
          }
          return trimmed
        })

        setEditSpecializationError(errors)

        if(hasError) return

        if(cleanedSpecialization.some(item => item === '')){
          alert('Each specialization item must be a non empty string')
          return
        }

        const {data} = await axios.post(`${backendUrl}/api/photographer/updateSpecialization`, {specializations:cleanedSpecialization}, {headers:{photographerToken}})
        if(data.success){
          setProfileData(prev => ({...prev, specializations:data.specializations}))
          setIsEditingSpecialization(false)
          alert('specializations edited successfully')
        }else{
          alert(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const addNewSocialLink = async () => {
      try {
        setShowSocialLinkError('')

        if(!newSocialLink.platform || newSocialLink.platform.trim() === ''){
          setShowSocialLinkError('Platform is required')
          return
        }

        if(!newSocialLink.url || newSocialLink.url.trim() === ''){
          setShowSocialLinkError('URL is required')
          return
        }

        const {data} = await axios.post(`${backendUrl}/api/photographer/addSocialLink`, {platform:newSocialLink.platform, url:newSocialLink.url}, {headers:{photographerToken}})
        if(data.success){
          alert('new social link added successfully')
          setProfileData(prev => ({...prev, socialLinks:data.socialLinks}))
          setNewSocialLink({platform:'', url:''})
          setIsAddingSocialLink(false)
        }else{
          alert(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const updateSocialLink = async () => {
      try {
        const errors = Array(editedSocialLink.length).fill({platform:'', url:''})
        let hasError = false

        const cleanedSocialLink = editedSocialLink.map((item, index) => {
          let platform = item.platform.trim()
          let url = item.url.trim()

          if(!platform){
            errors[index] = {...errors[index], platform:'Platform cannot be empty'}
            hasError = true
          }

          if(!url){
            errors[index] = {...errors[index], url:'URL cannot be empty'}
            hasError = true
          }

          return {platform, url}
        })

        setEditSocialLinkError(errors)

        if(hasError) return

        const {data} = await axios.post(`${backendUrl}/api/photographer/updateSocialLink`, {socialLinks:cleanedSocialLink}, {headers:{photographerToken}})
        if(data.success){
          setProfileData(prev => ({...prev, socialLinks:data.socialLinks}))
          setIsEditingSocialLink(false)
          alert('social links edited successfully')
        }else{
          alert(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const addWhatsapp = async () => {
      try {
        if(!newWhatsapp || newWhatsapp.trim() === ''){
          setShowWhatsappError('Whatsapp number is required')
          return
        }

        const {data} = await axios.post(`${backendUrl}/api/photographer/addWhatsapp`, {whatsapp:newWhatsapp}, {headers:{photographerToken}})
        if(data.success){
          alert('whatsapp added successfully')
          setProfileData(prev => ({...prev, whatsapp:newWhatsapp}))
          setIsAddingWhatsapp(false)
          setNewWhatsapp('')
        }else{
          setShowWhatsappError(data.message)
        }
      } catch (error) {
        console.log(error)
      }
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
                                  <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1'>Photographer name</h1>
                                  <p className='text-base sm:text-lg text-[#ec0a30] font-medium mb-2'>Studio name</p>
                                  <div className='flex flex-col md:flex-row flex-wrap md:items-center md:gap-4 gap-2'>
                                    <div className='flex items-center gap-2'>
                                      <FiMapPin size={16} className='text-[#D7D7D7]' />
                                      <span className='text-[#D7D7D7] text-xs md:text-sm'>Location</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                      <IoBriefcaseOutline size={16} className='text-[#D7D7D7]' />
                                      <span className='text-[#D7D7D7] text-xs md:text-sm'>50 + years Experience</span>
                                    </div>
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
                                  <button type='button' onClick={saveAbout} className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm cursor-pointer'>Save</button>
                                  <button type='button' onClick={cancelEdit} className='bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-sm cursor-pointer'>Cancel</button>
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

                                  <button onClick={() => toggleEditMode('about')} className='bg-[#ec0a30] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm flex items-center gap-2 mx-auto cursor-pointer'>
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
                                <span className='text-[#D7D7D7] text-sm'>{profileData.photographer.mobile}</span>
                              </div>
                              <div className='flex items-center gap-3'>
                                <CiMail size={18} strokeWidth={1} className='text-[#ec0a30]' />
                                <span className='text-[#D7D7D7] text-sm'>{profileData.photographer.email}</span>
                              </div>
                              {isEditingWhatsapp ? (
                                <div>
                                  <div className="flex flex-col">
                                    <div className='flex items-center gap-3'>
                                      <input type="text" value={editedWhatsapp} onChange={(e) => {setEditedWhatsapp(e.target.value); setShowWhatsappError('')}} className={`flex-1 bg-[#2a2d36] text-[#D7D7D7] px-3 py-2 rounded border text-sm outline-none ${showWhatsappError ? 'border-red-500' : 'border-gray-600'}`} />
                                      <button type='button' className='text-red-500 hover:text-red-700 transition cursor-pointer'>
                                        <ImBin size={14} />
                                      </button>
                                    </div>
                                    {showWhatsappError && (
                                      <span className='text-red-500 text-xs mt-1'>{showWhatsappError}</span>
                                    )}
                                  </div>
                                  <div className='flex gap-2 my-4'>
                                    <button className='bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition text-sm cursor-pointer'>Save</button>
                                    <button onClick={() => setIsEditingWhatsapp(false)} className='bg-gray-600 text-white px-3 py-2 rounded hover:bg-gray-700 transition text-sm cursor-pointer'>Cancel</button>
                                  </div>
                                </div>
                              ):(
                                <>
                                  {profileData.whatsapp && (
                                    <div className='flex items-center gap-3'>
                                      <FaWhatsapp size={18} strokeWidth={1} className='text-[#ec0a30]' />
                                      <a href="https://wa.me/9874563210" target='_blank' rel="noopener noreferrer" className='text-[#D7D7D7] text-sm'>{profileData.whatsapp}</a>
                                    </div>
                                  )}
                                </>
                              )}
                              {isAddingWhatsapp && (
                                <div>
                                  <div className='flex gap-2'>
                                    <input value={newWhatsapp} onChange={(e) => {setNewWhatsapp(e.target.value); if(showWhatsappError) setShowWhatsappError('')}} type="text" className={`flex-1 bg-[#2a2d36] text-[#D7D7D7] px-3 py-2 rounded border text-sm outline-none ${showWhatsappError ? 'border-red-500' : 'border-gray-600'}`} placeholder='Add whatsapp number' />
                                    <button onClick={addWhatsapp} className='bg-[#ec0a30] text-white px-3 py-2 rounded hover:bg-red-700 transition cursor-pointer'>
                                      <RiAddLine size={16} />
                                    </button>
                                  </div>
                                  {showWhatsappError && (
                                    <span className='text-red-500 text-xs block mt-1'>{showWhatsappError}</span>
                                  )}
                                </div>
                              )}
                              {!profileData.whatsapp && (
                                <div className={`text-center text-[#D7D7D7] pt-4`}>
                                  {/* {!profileData.whatsapp && (
                                    <p className='text-sm mb-4'>Add your whatsapp number</p>
                                  )} */}
                                  {!isEditingWhatsapp && !isAddingWhatsapp && (
                                    <button onClick={() => setIsAddingWhatsapp(true)} className='bg-[#ec0a30] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm flex items-center gap-2 mx-auto cursor-pointer'>
                                      <FiPlus size={16} />
                                      Add Whatsapp
                                    </button>
                                  )}
                                  {isAddingWhatsapp && (
                                    <button onClick={() => {setIsAddingWhatsapp(false); setShowWhatsappError('')}} className='bg-[#ec0a30] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm flex items-center gap-2 mx-auto cursor-pointer'>
                                      Cancel
                                    </button>
                                  )}
                                </div>
                              )}
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
                              {profileData.equipment.length > 0 && (
                                <button onClick={() => {setEditedEquipment([...profileData.equipment]); setIsEditingEquipment(true)}} className='text-[#ec0a30] hover:text-red-400 transition cursor-pointer'>
                                  <RiEdit2Fill size={18} />
                                </button>
                              )}
                            </div>
                            {isEditingEquipment ? (
                              <div>
                                <div className='grid grid-cols-1 xl:grid-cols-2 gap-3'>
                                  {editedEquipment.map((item, index) => (
                                    <div className='flex flex-col'>
                                      <div key={index} className='flex items-center gap-3'>
                                        <input type="text" value={item} onChange={(e) => {const newItems = [...editedEquipment]; newItems[index] = e.target.value; setEditedEquipment(newItems); const newErrors = [...editEquipmentError]; newErrors[index]=''; setEditEquipmentError(newErrors)}} className={`flex-1 bg-[#2a2d36] text-[#D7D7D7] px-3 py-2 rounded border text-sm outline-none ${editEquipmentError[index] ? 'border-red-500' : 'border-gray-600'}`} />
                                        <button onClick={() => {const newItems = editedEquipment.filter((_, i) => i !== index); setEditedEquipment(newItems)}} type='button' className='text-red-500 hover:text-red-700 transition cursor-pointer'>
                                          <ImBin size={14} />
                                        </button>
                                      </div>
                                      {editEquipmentError[index] && (
                                        <span className="text-red-500 text-xs mt-1">{editEquipmentError[index]}</span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                                <div className="flex gap-2 my-4">
                                  <button onClick={updateEquipment} className='w-full xl:w-fit bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm cursor-pointer'>save</button>
                                  <button onClick={() => {setIsEditingEquipment(false); setEditEquipmentError([])}} className='w-full xl:w-fit bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-sm cursor-pointer'>cancel</button>
                                </div>
                              </div>
                            ):(
                              <div>
                                {profileData.equipment.length > 0 && (
                                  <div className='mb-4'>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                      {profileData.equipment.map((item, index) => (
                                        <div key={index} className='flex items-center gap-3'>
                                          <div className='flex-shrink-0'>
                                            <FiCheckCircle size={16} className='text-green-500' />
                                          </div>
                                          <span className='text-[#D7D7D7] text-sm truncate max-w-[200px]'>{item}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            {isAddingEquipment && (
                              <div>
                                <div className='flex gap-2'>
                                  <input value={newEquipment} onChange={(e) => {setNewEquipment(e.target.value); if(showEquipmentError) setShowEquipmentError('')}} type="text" className={`flex-1 bg-[#2a2d36] text-[#D7D7D7] px-3 py-2 rounded border text-sm outline-none ${showEquipmentError ? 'border-red-500' : 'border-gray-600'}`} placeholder='e.g., Canon EOS R5, Professional Lighting Kit' />
                                  <button onClick={addNewEquipment} className='bg-[#ec0a30] text-white px-3 py-2 rounded hover:bg-red-700 transition cursor-pointer'>
                                    <RiAddLine size={16} />
                                  </button>
                                </div>
                                {showEquipmentError && (
                                  <span className='text-red-500 text-xs block mt-1'>{showEquipmentError}</span>
                                )}
                              </div>
                            )}
                            <div className={`text-center ${profileData.equipment.length === 0 ? 'py-8' : 'pt-4'}  text-[#D7D7D7]`}>
                              {profileData.equipment.length === 0 && (
                                <p className='text-sm mb-4'>Add yor equipments details</p>
                              )}
                              {!isEditingEquipment && !isAddingEquipment && (
                                <button onClick={() => setIsAddingEquipment(true)} className='bg-[#ec0a30] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm flex items-center gap-2 mx-auto cursor-pointer'>
                                  <FiPlus size={16} />
                                  Add Information
                                </button>
                              )}
                              {isAddingEquipment && (
                                <button onClick={() => {setIsAddingEquipment(false); setShowEquipmentError('')}} className='bg-[#ec0a30] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm flex items-center gap-2 mx-auto cursor-pointer'>
                                  Cancel
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-[24px] md:w-6/12 flex items-stretch px-3">
                        <div className="bg-[#191c24] rounded-[4px] w-full">
                          <div className="py-[28px] px-[25px]">
                            <div className='flex justify-between items-center mb-[18px]'>
                              <h1 className="text-white text-[18px] font-[500]">Achievements</h1>
                              {profileData.achievements.length > 0 && (
                                <button onClick={() => {setEditedAchievement([...profileData.achievements]); setIsEditingAchievement(true)}} className='text-[#ec0a30] hover:text-red-400 transition cursor-pointer'>
                                  <RiEdit2Fill size={18} />
                                </button>
                              )}
                            </div>
                            {isEditingAchievement ? (
                              <div>
                                <div className='grid grid-cols-1 gap-3'>
                                  {editedAchievement.map((item, index) => (
                                    <div key={index} className='flex flex-col'>
                                      <div className='flex items-center gap-3'>
                                        <input type="text" value={item} onChange={(e) => {const newItems = [...editedAchievement]; newItems[index] = e.target.value; setEditedAchievement(newItems); const newErrors = [...editAchievementError]; newErrors[index] = ''; setEditAchievementError(newErrors)}} className={`flex-1 bg-[#2a2d36] text-[#D7D7D7] px-3 py-2 rounded border text-sm outline-none ${editAchievementError[index] ? 'border-red-500' : 'border-gray-600'}`} />
                                        <button onClick={() => {const newItems = editedAchievement.filter((_, i) => i !== index); setEditedAchievement(newItems)}} type='button' className='text-red-500 hover:text-red-700 transition cursor-pointer'>
                                          <ImBin size={14} />
                                        </button>
                                      </div>
                                      {editAchievementError[index] && (
                                        <span className='text-red-500 text-xs mt-1'>{editAchievementError[index]}</span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                                <div className='flex gap-2 my-4'>
                                  <button onClick={updateAchievement} className='w-full xl:w-fit bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm cursor-pointer'>Save</button>
                                  <button onClick={() => {setIsEditingAchievement(false); setEditAchievementError([])}} className='w-full xl:w-fit bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-sm cursor-pointer'>Cancel</button>
                                </div>
                              </div>
                            ):(
                              <div>
                                {profileData.achievements.length > 0 && (
                                  <div className='mb-4'>
                                    <div className='space-y-3'>
                                      {profileData.achievements.map((item, index) => (
                                        <div key={index} className='flex items-start gap-3'>
                                            <FiAward size={16} className='text-yellow-500 mt-1' />
                                            <span className='text-[#D7D7D7] text-sm'>{item}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            {isAddingAchievement && (
                              <div>
                                <div className="flex gap-2">
                                  <input value={newAchievement} onChange={(e) => {setNewAchievement(e.target.value); if(showAchievementError) setShowAchievementError('')}} type="text" className={`flex-1 bg-[#2a2d36] text-[#D7D7D7] px-3 py-2 rounded border text-sm outline-none ${showAchievementError ? 'border-red-500' : 'border-gray-600'}`} placeholder='e.g., Wedding Photographer of the Year 2023' />
                                  <button onClick={addNewAchievement} className='bg-[#ec0a30] text-white px-3 py-2 rounded hover:bg-red-700 transition cursor-pointer'>
                                    <RiAddLine size={16} />
                                  </button>
                                </div>
                                {showAchievementError && (
                                  <span className='text-red-500 text-xs block mt-1'>{showAchievementError}</span>
                                )}
                              </div>
                            )}
                            <div className={`text-center ${profileData.achievements.length === 0 ? 'py-8' : 'pt-4'} text-[#D7D7D7]`}>
                              {profileData.achievements.length === 0 && (
                                <p className='text-sm mb-4'>Add your achievement details</p>
                              )}
                              {!isEditingAchievement && !isAddingAchievement && (
                                <button onClick={() => setIsAddingAchievement(true)} className='bg-[#ec0a30] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm flex items-center gap-2 mx-auto cursor-pointer'>
                                  <FiPlus size={16} />
                                  Add Information
                                </button>
                              )}
                              {isAddingAchievement && (
                                <button onClick={() => {setIsAddingAchievement(false); setShowAchievementError('')}} className='bg-[#ec0a30] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm flex items-center gap-2 mx-auto cursor-pointer'>
                                  Cancel
                                </button>
                              )}
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
                              {profileData.specializations.length > 0 && (
                                <button onClick={() => {setEditedSpecialization([...profileData.specializations]); setIsEditingSpecialization(true)}} className='text-[#ec0a30] hover:text-red-400 transition cursor-pointer'>
                                  <RiEdit2Fill size={18} />
                                </button>
                              )}
                            </div>
                            {isEditingSpecialization ? (
                              <div>
                                <div className='grid grid-cols-1 xl:grid-cols-2 gap-3'>
                                  {editedSpecialization.map((item, index) => (
                                    <div key={index} className='flex flex-col'>
                                      <div className='flex items-center gap-3'>
                                        <input type="text" value={item} onChange={(e) => {const newItems = [...editedSpecialization]; newItems[index] = e.target.value; setEditedSpecialization(newItems); const newErrors = [...editSpecializationError]; newErrors[index] = ''; setEditSpecializationError(newErrors)}} className={`flex-1 bg-[#2a2d36] text-[#D7D7D7] px-3 py-2 rounded border text-sm outline-none ${editSpecializationError[index] ? 'border-red-500' : 'border-gray-600'}`} />
                                        <button onClick={() => {const newItems = editedSpecialization.filter((_, i) => i !== index); setEditedSpecialization(newItems)}} type='button' className='text-red-500 hover:text-red-700 transition cursor-pointer'>
                                          <ImBin size={14} />
                                        </button>
                                      </div>
                                      {editSpecializationError[index] && (
                                        <span className='text-red-500 text-xs mt-1'>{editSpecializationError[index]}</span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                                <div className='flex gap-2 my-4'>
                                  <button onClick={updateSpecialization} className='w-full xl:w-fit bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm cursor-pointer'>Save</button>
                                  <button onClick={() => {setIsEditingSpecialization(false); setEditSpecializationError([])}} className='w-full xl:w-fit bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-sm cursor-pointer'>Cancel</button>
                                </div>
                              </div>
                            ):(
                              <div>
                                {profileData.specializations.length > 0 && (
                                  <div className='flex flex-wrap gap-3 mb-4'>
                                    {profileData.specializations.map((item, index) => (
                                      <span key={index} className='bg-[#ec0a30] text-[#D7D7D7] text-sm px-4 py-2 rounded-full font-medium'>{item}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                            {isAddingSpecialization && (
                              <div>
                                <div className='flex gap-2'>
                                  <input type="text" value={newSpecialization} onChange={(e) => {setNewSpecialization(e.target.value); if(showSpecializationError) setShowSpecializationError('')}} className={`flex-1 bg-[#2a2d36] text-[#D7D7D7] px-3 py-2 rounded border text-sm outline-none ${showSpecializationError ? 'border-red-500' : 'border-gray-600'}`} placeholder='e.g., Food Photography' />
                                  <button onClick={addNewSpecialization} className='bg-[#ec0a30] text-white px-3 py-2 rounded hover:bg-red-700 transition cursor-pointer'>
                                    <RiAddLine size={16} />
                                  </button>
                                </div>
                                {showSpecializationError && (
                                  <span className='text-red-500 text-xs block mt-1'>{showSpecializationError}</span>
                                )}
                              </div>
                            )}
                            <div className={`text-center ${profileData.specializations.length === 0 ? 'py-8' : 'pt-4'} text-[#D7D7D7]`}>
                              {profileData.specializations.length === 0 && (
                                <p className='text-sm mb-4'>Add your specialization details</p>
                              )}
                              {!isEditingSpecialization && !isAddingSpecialization && (
                                <button onClick={() => setIsAddingSpecialization(true)} className='bg-[#ec0a30] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm flex items-center gap-2 mx-auto cursor-pointer'>
                                  <FiPlus size={16} />
                                  Add Information
                                </button>
                              )}
                              {isAddingSpecialization && (
                                <button onClick={() => {setIsAddingSpecialization(false); setShowSpecializationError('')}} className='bg-[#ec0a30] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm flex items-center gap-2 mx-auto cursor-pointer'>
                                  Cancel
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-[24px] xl:w-4/12 md:w-6/12 flex items-stretch px-3">
                        <div className="bg-[#191c24] rounded-[4px] w-full">
                          <div className="py-[28px] px-[25px]">
                            <div className='flex justify-between items-center mb-[18px]'>
                              <h1 className="text-white text-[18px] font-[500]">Social Links</h1>
                              {profileData.socialLinks.length > 0 && (
                                <button onClick={() => {setEditedSocialLink(profileData.socialLinks.map(link => ({...link}))); setEditSocialLinkError(profileData.socialLinks.map(() => ({platform:'', url:''}))); setIsEditingSocialLink(true)}} className='text-[#ec0a30] hover:text-red-400 transition cursor-pointer'>
                                  <RiEdit2Fill size={18} />
                                </button>
                              )}
                            </div>
                            {isEditingSocialLink ? (
                              <div>
                                <div className='grid grid-cols-1 gap-3'>
                                  {editedSocialLink.map((item, index) => (
                                    <div key={index} className='flex flex-col'>
                                      <div className='flex flex-col gap-3'>
                                        <select name="" id="" value={item.platform} onChange={(e) => {const newItems = [...editedSocialLink]; newItems[index].platform = e.target.value; setEditedSocialLink(newItems); const newErrors = [...editSocialLinkError]; newErrors[index] = ''; setEditSocialLinkError(newErrors)}} className={`flex-1 bg-[#2a2d36] text-[#D7D7D7] px-3 py-2 rounded border text-sm outline-none ${editSocialLinkError[index].platform ? 'border-red-500' : 'border-gray-600'}`}>
                                          <option value="">Select platform</option>
                                          <option value="Instagram">Instagram</option>
                                          <option value="Facebook">Facebook</option>
                                          <option value="Twitter">Twitter</option>
                                          <option value="LinkedIn">LinkedIn</option>
                                          <option value="Website">Website</option>
                                        </select>
                                        {editSocialLinkError[index].platform && (
                                          <span className='text-red-500 text-xs -mt-1'>{editSocialLinkError[index].platform}</span>
                                        )}
                                        
                                        <div className='flex flex-col'>
                                          <div className='flex gap-2'>
                                            <input type="text" value={item.url} onChange={(e) => {const newItems = [...editedSocialLink]; newItems[index].url = e.target.value; setEditedSocialLink(newItems); const newErrors = [...editSocialLinkError]; newErrors[index] = ''; setEditSocialLinkError(newErrors)}} className={`flex-1 bg-[#2a2d36] text-[#D7D7D7] px-3 py-2 rounded border text-sm outline-none ${editSocialLinkError[index].url ? 'border-red-500' : 'border-gray-600'}`} />
                                            <button onClick={() => {const newItems = editedSocialLink.filter((_, i) => i !== index); setEditedSocialLink(newItems)}} type='button' className='text-red-500 hover:text-red-700 transition cursor-pointer'>
                                              <ImBin size={14} />
                                            </button>
                                          </div>
                                          {editSocialLinkError[index].url && (
                                            <span className='text-red-500 text-xs mt-1'>{editSocialLinkError[index].url}</span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                <div className='flex gap-2 my-4'>
                                  <button onClick={updateSocialLink} className='w-full xl:w-fit bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm cursor-pointer'>Save</button>
                                  <button onClick={() => {setIsEditingSocialLink(false); setEditSocialLinkError([])}} className='w-full xl:w-fit bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition text-sm cursor-pointer'>Cancel</button>
                                </div>
                              </div>
                            ):(
                              <div>
                                {profileData.socialLinks.length > 0 && (
                                  <div className='flex flex-col flex-wrap gap-3 mb-4'>
                                    {profileData.socialLinks.map((item, index) => {

                                      const getIcon = (platform) => {
                                        switch (platform) {
                                          case 'Instagram' :
                                            return <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />;
                                          case 'Facebook' :
                                            return <FiFacebook className="w-4 h-4 sm:w-5 sm:h-5" />;
                                          case 'Twitter' :
                                            return <FiTwitter className="w-4 h-4 sm:w-5 sm:h-5" />;
                                          case 'LinkedIn' :
                                            return <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />;
                                          case 'Website' :
                                            return <FaGlobe className="w-4 h-4 sm:w-5 sm:h-5" />;
                                          default :
                                          return <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                                        }
                                      }

                                      return (
                                        <div key={index} className='flex gap-3 items-center'>
                                          <button className='bg-[#ec0a30] w-fit hover:bg-[#701313] text-white p-2 sm:p-3 rounded-md sm:rounded-xl hover:shadow-lg transition-all cursor-pointer'>
                                            {getIcon(item.platform)}
                                          </button>
                                          <p className='text-[#D7D7D7] text-sm'>{item.url}</p>
                                        </div>
                                      )
                                    })}
                                  </div>
                                )}
                              </div>
                            )}
                            {isAddingSocialLink && (
                              <div className='flex flex-col gap-3'>
                                <select name="" id="" value={newSocialLink.platform} onChange={(e) => {setNewSocialLink((prev) => ({...prev, platform:e.target.value})); if(showSocialLinkError) setShowSocialLinkError('')}} className={`flex-1 bg-[#2a2d36] text-[#D7D7D7] px-3 py-2 rounded border text-sm outline-none ${showSocialLinkError ? 'border-red-500' : 'border-gray-600'}`}>
                                  <option value="">Select Platform</option>
                                  <option value="Instagram">Instagram</option>
                                  <option value="Facebook">Facebook</option>
                                  <option value="Twitter">Twitter</option>
                                  <option value="LinkedIn">LinkedIn</option>
                                  <option value="Website">Website</option>
                                </select>
                                <div className='flex gap-2'>
                                  <input type="text" value={newSocialLink.url} onChange={(e) => {setNewSocialLink((prev) => ({...prev, url:e.target.value})); if(showSocialLinkError) setShowSocialLinkError('')}} className={`flex-1 bg-[#2a2d36] text-[#D7D7D7] px-3 py-2 rounded border text-sm outline-none ${showSocialLinkError ? 'border-red-500' : 'border-gray-600'}`} placeholder='Enter URL' />
                                  <button onClick={addNewSocialLink} className='bg-[#ec0a30] text-white px-3 py-2 rounded hover:bg-red-700 transition cursor-pointer'>
                                    <RiAddLine size={16} />
                                  </button>
                                </div>  
                                {showSocialLinkError && (
                                  <span className='text-red-500 text-xs block -mt-1'>{showSocialLinkError}</span>
                                )}
                              </div>
                            )}
                            <div className={`text-center ${profileData.socialLinks.length === 0 ? 'py-8' : 'pt-4'} text-[#D7D7D7]`}>
                              {profileData.socialLinks.length === 0 && (
                                <p className='text-sm mb-4'>Add your social links</p>
                              )}
                              {!isEditingSocialLink && !isAddingSocialLink && (
                                <button onClick={() => setIsAddingSocialLink(true)} className='bg-[#ec0a30] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm flex items-center gap-2 mx-auto cursor-pointer'>
                                  <FiPlus size={16} />
                                  Add Information
                                </button>
                              )}
                              {isAddingSocialLink && (
                                <button onClick={() => {setIsAddingSocialLink(false); setShowSocialLinkError('')}} className='bg-[#ec0a30] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm flex items-center gap-2 mx-auto cursor-pointer'>
                                  Cancel
                                </button>
                              )}
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
