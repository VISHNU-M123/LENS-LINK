import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import OTP from './pages/OTP'
import ForgotPassword from './pages/ForgotPassword'
import AllPhotographers from './pages/AllPhotographers'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verify-otp' element={<OTP/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/allPhotographers' element={<AllPhotographers/>}/>
      </Routes>
    </div>
  )
}

export default App
