import React, { useState } from 'react'
import Navbar from '../../components/User/Navbar'
import { FiShare2 } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";
import { LuPhone } from "react-icons/lu";
import { FiCheckCircle } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { CiGlobe } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { FiTwitter } from "react-icons/fi";
import { FiAward } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { FiPlayCircle } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa";
import { Users, Camera, Award, Star} from 'lucide-react'

const PhotographerProfilePage = () => {

    const [activeTab, setActiveTab] = useState('about')
    const [showBookingModal, setShowBookingModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)

    const tabs = [
        { id: 'about', label: 'About', icon: Users },
        { id: 'gallery', label: 'Gallery', icon: Camera },
        { id: 'services', label: 'Services', icon: Award },
        { id: 'reviews', label: 'Reviews', icon: Star }
    ];
  return (
    <div className='w-full overflow-x-hidden bg-black'>
      <Navbar/>
      <div className='min-h-screen bg-gray-50'>
        <div className='relative h-80 bg-gradient-to-r from-purple-600 to-indigo-600 overflow-hidden'>
            <img src="" className='w-full h-full object-cover opacity-60' alt="" />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>

            <div className='absolute top-6 right-6 flex gap-3'>
                <button className='bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-all'>
                    <FiShare2 size={20} />
                </button>
                <button className='bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-all'>
                    <FaRegHeart size={20} />
                </button>
            </div>
        </div>

        <div className='relative max-w-6xl mx-auto px-6 -mt-20'>
            <div className='bg-white rounded-2xl shadow-xl p-8'>
                <div className='flex flex-col lg:flex-row gap-8'>
                    <div className='flex flex-col items-center lg:items-start'>
                        <img src="" className='w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg' alt="" />
                        <div className='mt-4 text-center lg:text-left'>
                            <h1 className='text-3xl font-bold text-gray-900'>Photographer name</h1>
                            <p className='text-lg text-purple-600 font-medium'>Studio name</p>
                            <div className='flex items-center justify-center lg:justify-start gap-2 mt-2'>
                                <FiMapPin size={16} className='text-gray-500' />
                                <span className='text-gray-600'>Location</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex-1'>
                        <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
                            <div className='text-center'>
                                <div className='flex items-center justify-center gap-1 mb-1'>
                                    <FaStar size={20} className='text-yellow-400 fill-current' />
                                    <span className='text-2xl font-bold text-gray-900'>Ratings</span>
                                </div>
                                <p className='text-gray-600 text-sm'>Reviews</p>
                            </div>
                            <div className='text-center'>
                                <div className='text-2xl font-bold text-gray-900 mb-1'>Completed shorts</div>
                                <p className='text-gray-600 text-sm'>Photos delivered</p>
                            </div>
                            <div className='text-center'>
                                <div className='text-2xl font-bold text-gray-900 mb-1'>Experience</div>
                                <p className='text-gray-600 text-sm'>Experience</p>
                            </div>
                            <div className='text-center'>
                                <div className='flex items-center justify-center gap-2 mb-1'>
                                    <div className='w-3 h-3 rounded-full bg-green-400'></div>
                                    <span className='text-sm font-medium'>Available</span>
                                </div>
                                <p className='text-gray-600 text-sm'>Response: 24:00</p>
                            </div>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-4'>
                            <button onClick={() => setShowBookingModal(true)} className='flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2'>
                                <CiCalendar size={20} />
                                Book Now
                            </button>
                            <button className='flex-1 bg-white border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center justify-center gap-2'>
                                <FiMessageCircle size={20} />
                                Message
                            </button>
                            <button className='bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all'>
                                <LuPhone size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='max-w-6xl mx-auto px-6 mt-8'>
            <div className='bg-white rounded-xl shadow-sm p-2'>
                <div className='flex gap-1 overflow-x-auto'>
                    {tabs.map((tab) => {
                        const Icon = tab.icon
                        return (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}>
                                <Icon size={18}/>
                                {tab.label}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>

        <div className='max-w-6xl mx-auto px-6 mt-8 pb-12'>
            {activeTab === 'about' && (
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    <div className='lg:col-span-2 space-y-8'>
                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <h3 className='text-xl font-bold text-gray-900 mb-4'>About Me</h3>
                            <p className='text-gray-600 leading-relaxed'>Bio</p>
                        </div>
                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <h3 className='text-xl font-bold text-gray-900 mb-4'>Specializations</h3>
                            <div className='flex flex-wrap gap-3'>
                                <span className='bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium'>Specializations</span>
                            </div>
                        </div>
                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <h3 className='text-xl font-bold text-gray-900 mb-4'>Professional equipments</h3>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                <div className='flex items-center gap-3'>
                                    <FiCheckCircle size={16} className='text-green-500' />
                                    <span className='text-gray-600'>Items</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='space-y-6'>
                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <h3 className='text-xl font-bold text-gray-900 mb-4'>Contact Information</h3>
                            <div className='space-y-3'>
                                <div className='flex items-center gap-3'>
                                    <LuPhone size={18} className='text-purple-600' />
                                    <span className='text-gray-600'>9874563210</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <CiMail size={18} className='text-purple-600' />
                                    <span className='text-gray-600'>abcdefg@gmail.com</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <CiGlobe size={18} className='text-purple-600' />
                                    <span className='text-gray-600'>asdfghjk.com</span>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <h3 className='text-xl font-bold text-gray-900 mb-4'>Follow Me</h3>
                            <div className='flex gap-3'>
                                <button className='bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-xl hover:shadow-lg transition-all'>
                                    <FaInstagram size={20} />
                                </button>
                                <button className='bg-blue-600 text-white p-3 rounded-xl hover:shadow-lg transition-all'>
                                    <FiFacebook size={20} />
                                </button>
                                <button className='bg-blue-400 text-white p-3 rounded-xl hover:shadow-lg transition-all'>
                                    <FiTwitter size={20} />
                                </button>
                            </div>
                        </div>
                        <div className='bg-white rounded-xl shadow-sm p-6'>
                            <h3 className='text-xl font-bold text-gray-900 mb-4'>Achievements</h3>
                            <div className='space-y-3'>
                                <div className='flex items-start gap-3'>
                                    <FiAward size={16} className='text-yellow-500 mt-1' />
                                    <span className='text-gray-600 text-sm'>Achievement</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'gallery' && (
                <div className='bg-white rounded-xl shadow-sm p-6'>
                    <div className='flex justify-between items-center mb-6'>
                        <h3 className='text-xl font-bold text-gray-900'>Featured work</h3>
                        <button className='bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2'>
                            View full portfolio
                            <FaArrowRight size={16} />
                        </button>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        <div className='relative group cursor-pointer overflow-hidden rounded-xl'>
                            <img src="" className='w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300' alt="" />
                            <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                                <FiPlayCircle className='text-white' size={48} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'services' && (
                <div className='bg-white rounded-xl shadow-sm p-6'>
                    <h3 className='text-xl font-bold text-gray-900 mb-6'>Services & Pricing</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow'>
                            <div className='flex justify-between items-start mb-3'>
                                <h4 className='text-lg font-semibold text-gray-900'>Service name</h4>
                                <span className='text-purple-600 font-bold'>Service price</span>
                            </div>
                            <div className='flex items-center gap-2 text-gray-600 mb-4'>
                                <FaRegClock size={16} />
                                <span className='text-sm'>service duration</span>
                            </div>
                            <button className='w-full bg-purple-100 text-purple-700 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors'>Book this service</button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'reviews' && (
                <div className='bg-white rounded-xl shadow-sm p-6'>
                    <div className='flex justify-between items-center mb-6'>
                        <h3 className='text-xl font-bold text-gray-900'>Client reviews</h3>
                        <button className='bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors'>write review</button>
                    </div>
                    <div className='space-y-6'>
                        <div className='border-b border-gray-200 pb-6 last:border-b-0'>
                            <div className='flex items-start gap-4'>
                                <img src="" className='w-12 h-12 rounded-full object-cover' alt="" />
                                <div className='flex-1'>
                                    <div className='flex items-center gap-3 mb-2'>
                                        <h4 className='font-semibold text-gray-900'>Review name</h4>
                                        <div className='flex items-center gap-1'>
                                            {[...Array(5)].map((_,i) => (
                                                <FaStar key={i} size={14} className='text-yellow-400 fill-current' />
                                            ))}
                                        </div>
                                        <span className='text-gray-500 text-sm'>review date</span>
                                    </div>
                                    <p className='text-gray-600'>review comment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {showBookingModal && (
            <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
                <div className='bg-white rounded-2xl max-w-md w-full p-6'>
                    <h3 className='text-xl font-bold text-gray-900 mb-4'>Book a session</h3>
                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Service Type</label>
                            <select className='w-full border border-gray-300 rounded-lg px-3 py-2'>
                                <option value="">Wedding</option>
                                <option value="">Portrait </option>
                                <option value="">Event</option>
                            </select>
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Preffered Date</label>
                            <input type="date" className='className="w-full border border-gray-300 rounded-lg px-3 py-2' name="" id="" />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Message</label>
                            <textarea className='w-full border border-gray-300 rounded-lg px-3 py-2 h-24' name="" id="" placeholder='Tell me about your event...'></textarea>
                        </div>
                        <div className='flex gap-3 pt-4'>
                            <button onClick={() => setShowBookingModal(false)} className='flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50'>Cancel</button>
                            <button className='flex-1 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700'>send request</button>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {selectedImage && (
            <div onClick={() => setSelectedImage(null)} className='fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4'>
                <img src="" className='max-w-full max-h-full object-contain' alt="" />
            </div>
        )}
      </div>
    </div>
  )
}

export default PhotographerProfilePage
