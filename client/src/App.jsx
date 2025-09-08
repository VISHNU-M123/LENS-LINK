import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AllPhotographers from './pages/User/AllPhotographers'
import Login from './pages/User/Login'
import OTP from './pages/User/OTP'
import ForgotPassword from './pages/User/ForgotPassword'
import ProfilePage from './pages/User/ProfilePage'
import Dashboard from './pages/Photographer/Dashboard'
import PhotographerLogin from './pages/Photographer/PhotographerLogin'
import PhotographerOTP from './pages/Photographer/PhotographerOTP'
import PhotographerProfilePage from './pages/User/PhotographerProfilePage'
import Gallery from './pages/Gallery'
import Service from './pages/Photographer/Service'
import AddService from './pages/Photographer/AddService'
import EditService from './pages/Photographer/EditService'
import ProfileDetails from './pages/Photographer/ProfileDetails'
import AddCategorySubcategory from './pages/Photographer/AddCategorySubcategory'
import AllCategory from './pages/Photographer/AllCategory'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verify-otp' element={<OTP/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/allPhotographers' element={<AllPhotographers/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/photographer-profile' element={<PhotographerProfilePage/>}/>
        <Route path='/gallery' element={<Gallery/>}/>

        {/* photographers routes */}
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login-photographer' element={<PhotographerLogin/>}/>
        <Route path='/verify-photographerOtp' element={<PhotographerOTP/>}/>
        <Route path='/service' element={<Service/>}/>
        <Route path='/add-service' element={<AddService/>}/>
        <Route path='/edit-service' element={<EditService/>}/>
        <Route path='/profile-details' element={<ProfileDetails/>}/>
        <Route path='/add-category' element={<AddCategorySubcategory/>}/>
        <Route path='/all-category' element={<AllCategory/>}/>
      </Routes>
    </div>
  )
}

export default App
