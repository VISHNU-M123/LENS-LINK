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

        {/* photographers routes */}
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login-photographer' element={<PhotographerLogin/>}/>
        <Route path='/verify-photographerOtp' element={<PhotographerOTP/>}/>
      </Routes>
    </div>
  )
}

export default App
