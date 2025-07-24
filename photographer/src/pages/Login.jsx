import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()
  const [state, setState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState({name:'', email:'', mobile:'', password:''})
  const [globalErrorMsg, setGlobalErrorMsg] = useState('')

  const {backendUrl, photographerToken, setPhotographerToken} = useContext(AppContext)

  const handleFieldChange = (fieldName, setField) => (e) => {
    const value = e.target.value
    setField(value)

    if(showErrorMsg[fieldName]){
      setShowErrorMsg((prev) => ({...prev, [fieldName]: ''}))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      
      let hasError = false
      let newErrors = {name:'', email:'', mobile:'', password:''}

      if(state === 'Sign Up'){
        if(!name || name.trim() === ''){
          newErrors.name = 'Name is required'
          hasError = true
        }

        if(!email || email.trim() === ''){
          newErrors.email = 'Email is required'
          hasError = true
        }else{
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if(!emailRegex.test(email)){
            newErrors.email = 'Please provide a valid email'
            hasError = true
          }
        }

        if(!mobile || mobile.trim() === ''){
          newErrors.mobile = 'Mobile number is required'
          hasError = true
        }else{
          const mobileRegex = /^[0-9]{10}$/
          const isRepeatingDigits = /^(.)\1+$/.test(mobile)
          if(!mobileRegex.test(mobile) || isRepeatingDigits){
            newErrors.mobile = 'Invalid mobile number'
            hasError = true
          }
        }

        if(!password || password.trim() === ''){
          newErrors.password = 'Password is required'
          hasError = true
        }else{
          const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          if(!passwordRegex.test(password)){
            newErrors.password = 'Password must be at least 8 characters long, and include a letter, a number, and a special character.'
            hasError = true
          }
        }
      }else{
        if(!email || email.trim() === ''){
          newErrors.email = 'Email is required'
          hasError = true
        }else{
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if(!emailRegex.test(email)){
            newErrors.email = 'Please provide a valid email'
            hasError = true
          }
        }

        if(!password || password.trim() === ''){
          newErrors.password = 'Password is required'
          hasError = true
        }
      }

      setShowErrorMsg(newErrors)

      if(hasError){
        return
      }

      setGlobalErrorMsg('')

      if(state === 'Sign Up'){
        const {data} = await axios.post(`${backendUrl}/api/photographer/register-photographer`, {name, email, mobile, password})

        if(data.success){
          navigate(`/verify-photographerOtp?photographerId=${data.photographerId}`)
        }else{
          setGlobalErrorMsg(data.message)
        }
      }else{
        const {data} = await axios.post(`${backendUrl}/api/photographer/login-photographer`, {email, password})

        if(data.success){
          localStorage.setItem('photographerToken', data.photographerToken)
          setPhotographerToken(data.photographerToken)
          navigate('/dashboard')
        }else{
          setGlobalErrorMsg(data.message)
        }
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setGlobalErrorMsg(error.response.data.message)
      }else{
        setGlobalErrorMsg(error.message)
      }
    }
  }

  useEffect(() => {
    if(globalErrorMsg){
      const timer = setTimeout(() => {setGlobalErrorMsg('')}, 5000)
      return () => clearTimeout(timer)
    }
  },[globalErrorMsg])

  useEffect(() => {
    if(photographerToken){
      navigate('/dashboard')
    }
  },[photographerToken])

  return (
    <div className='min-h-screen flex items-center justify-center bg-black overflow-x-hidden'>
      <form action="" className='min-w-[340px]'>
        <div className='border border-green-600 p-8 rounded-2xl space-y-3'>
            <p className='text-center text-2xl font-bold text-green-600'>{state === 'Sign Up' ? 'Create account photographer' : 'Login photographer'}</p>
            {/* <p className='text-center text-red-500 text-sm block mt-1'>error messages</p> */}
            {
                state === 'Sign Up' && 
                <div>
                    <p className='text-green-600 font-normal'>Name</p>
                    <input className={`w-full border p-2 outline-none rounded text-sm font-light text-green-600`} type="text" name='name' placeholder='Name' onChange={handleFieldChange('name', setName)} value={name} />
                    {/* <span className='text-red-500 text-xs block mt-1'>name error message</span> */}
                </div>
            }
            <div>
                <p className='text-green-600 font-normal'>Email</p>
                <input className={`w-full border p-2 outline-none rounded text-sm font-light text-green-600`} type="email" name='email' placeholder='Email' onChange={handleFieldChange('email', setEmail)} value={email} />
                {/* <span className='text-red-500 text-xs block mt-1'>email error message</span> */}
            </div>
            <div>
                <p className='text-green-600 font-normal'>Password</p>
                <input className={`w-full border p-2 outline-none rounded text-sm font-light text-green-600`} type="password" name='password' placeholder='Password' onChange={handleFieldChange('password', setPassword)} value={password} />
                {/* <span className='text-red-500 text-xs block mt-1'>password error message</span> */}
            </div>
            {
                state === 'Sign Up' && 
                <div>
                    <p className='text-green-600 font-normal'>Phone</p>
                    <input className={`w-full border p-2 outline-none rounded text-sm font-light text-green-600`} type="tel" name='mobile' placeholder='Phone' onChange={handleFieldChange('mobile', setMobile)} value={mobile} />
                    {/* <span className='text-red-500 text-xs block mt-1'>mobile error message</span> */}
                </div>
            }
            <button type='submit' className='text-white bg-green-600 p-1 w-full rounded mt-2 cursor-pointer'>{state === 'Sign Up' ? 'Create account' : 'Login'}</button>

            {
                state === 'Sign Up' 
                ? <p className='text-gray-300 font-light cursor-pointer'>already have an account ? <span className='text-green-600 font-medium' onClick={() => {setState('Login')}}>login here</span></p>
                : <p className='text-gray-300 font-light cursor-pointer'>dont have an account ? <span className='text-green-600 font-medium' onClick={() => {setState('Sign Up')}}>create an account</span></p>
            }
        </div>
      </form>
    </div>
  )
}

export default Login
