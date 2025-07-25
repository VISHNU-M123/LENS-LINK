import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const OTP = () => {

    const length = 4
    const [otp, setOtp] = useState(new Array(length).fill(''))
    const [timer, setTimer] = useState(60)
    const [startTime, setStartTime] = useState(null)
    const [fieldErrors, setFieldErrors] = useState(new Array(length).fill(''))
    const [globalErrorMsg, setGlobalErrorMsg] = useState('')
    const inputsRef = useRef([])

    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const userId = searchParams.get('userId')

    const {backendUrl, token, setToken} = useContext(AppContext)

    const handleChange = (value, index) => {
        if(!isNaN(value) && value.length <= 1){
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            const newFieldErrors = [...fieldErrors]
            newFieldErrors[index] = ''
            setFieldErrors(newFieldErrors)

            if(value && index < length - 1){
                inputsRef.current[index + 1].focus()
            }
        }
    }

    const handleKeyDown = (e, index) => {
        if(e.key === 'Backspace'){
            if(!otp[index] && index > 0){
                inputsRef.current[index - 1].focus()
            }
        }
    }

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0')
        const s = String(seconds % 60).padStart(2, '0')
        return `${s}`
    }

    const startTimer = () => {
        const currentTime = Date.now()
        setStartTime(currentTime)
        localStorage.setItem('otpStartTime', currentTime.toString())
    }

    useEffect(() => {
        const savedStartTime = localStorage.getItem('otpStartTime')
        const now = Date.now()

        if(savedStartTime){
            const start = parseInt(savedStartTime)
            const elapsed = Math.floor((now - start) / 1000)
            const remaining = Math.max(0, 60 - elapsed)
            setStartTime(start)
            setTimer(remaining)
        }else{
            startTimer()
            setTimer(60)
        }
    },[])

    useEffect(() => {
        if(!startTime) return
        const interval = setInterval(() => {
            const now = Date.now()
            const elapsed = Math.floor((now - startTime) / 1000)
            const remaining = Math.max(0, 60 - elapsed)
            setTimer(remaining)
            if(remaining === 0){
                localStorage.removeItem('otpStartTime')
            }
        }, 1000);

        return () => clearInterval(interval)
    },[startTime])

    const handleVerifyOtp = async (event) => {
        event.preventDefault()

        let hasError = false
        const newFieldErrors = [...fieldErrors]

        otp.forEach((digit, index) => {
            if(!digit || isNaN(digit)){
                newFieldErrors[index] = 'Required'
                hasError = true
            }else{
                newFieldErrors[index] = ''
            }
        })

        setFieldErrors(newFieldErrors)

        if(hasError){
            setGlobalErrorMsg('Please fill in all OTP digits')
            return
        }

        try {
            const enteredOtp = otp.join('')
            const {data} = await axios.post(`${backendUrl}/api/user/verify-otp`, {userId, otp:enteredOtp})

            if(data.success){
                localStorage.setItem('token', data.token)
                setToken(data.token)
                navigate('/')
            }else{
                setGlobalErrorMsg(data.message)
            }
        } catch (error) {
            if(error.response.data.message){
                setGlobalErrorMsg(error.response.data.message)
            }else{
                setGlobalErrorMsg(data.message)
            }
        }
    }

    const handleResendOtp = async () => {
        try {
            console.log('backend url:', backendUrl)
            console.log('userId:', userId)
            const {data} = await axios.post(`${backendUrl}/api/user/resend-otp`, {userId})
            if(data.success){
                alert('OTP resend successfully')
                setOtp(new Array(length).fill(''))
                startTimer()
                setTimer(60)
            }else{
                setGlobalErrorMsg(data.message)
            }
        } catch (error) {
            if(error.response.data.message){
                setGlobalErrorMsg(error.response.data.message)
            }else{
                setGlobalErrorMsg(error.message)
            }
        }
    }

    useEffect(() => {
        if(globalErrorMsg){
            const timer = setTimeout(() => setGlobalErrorMsg(''), 5000);
            return () => clearTimeout(timer)
        }
    },[globalErrorMsg])

  return (
    <div className='min-h-screen flex items-center justify-center bg-black overflow-x-hidden'>
      <form action="" onSubmit={handleVerifyOtp} className='min-w-[340px]'>
        <div className='border border-green-600 p-8 rounded-2xl space-y-5'>
            <p className='text-center text-2xl font-bold text-green-600'>OTP</p>
            {globalErrorMsg && (
                <p className='text-center text-red-500 text-sm block mt-1'>{globalErrorMsg}</p>
            )}
            <div className='flex justify-around'>
                {otp.map((value, index) => (
                    <div>
                        <input key={index} ref={(el) => (inputsRef.current[index] = el)} className={`w-[40px] text-center border p-2 outline-none rounded text-md font-bold text-green-600 ${fieldErrors[index] ? 'border-red-500' : 'border-green-600'}`} type="text" inputMode='numeric' maxLength={1} value={value} onChange={(e) => handleChange(e.target.value, index)} onKeyDown={(e) => handleKeyDown(e, index)} />
                        {fieldErrors[index] && (
                            <span className='text-red-500 text-xs block mt-1'>{fieldErrors[index]}</span>
                        )}
                    </div>
                ))}
            </div>

            <div className={`h-[80px] w-[80px] border border-green-600 ${timer > 0 ? 'animate-ping' : ''} bg-green-600 mx-auto rounded-full text-white text-center items-center flex justify-center font-bold text-2xl`}>{formatTime(timer)}</div>
            <button type={timer === 0 ? 'button' : 'submit'} onClick={timer === 0 ? handleResendOtp : undefined} className='text-white bg-green-600 p-1 w-full rounded mt-2 cursor-pointer'>{timer === 0 ? 'Resend OTP' : 'Verify OTP'}</button>
        </div>
      </form>
    </div>
  )
}

export default OTP
