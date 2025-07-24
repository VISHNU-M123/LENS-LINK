import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import OTP from './pages/OTP'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login-photographer' element={<Login/>}/>
        <Route path='/verify-photographerOtp' element={<OTP/>}/>
      </Routes>
    </div>
  )
}

export default App
