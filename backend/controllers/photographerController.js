import validator from 'validator'
import photographerModel from '../models/photographerModel'
import bcrypt from 'bcrypt'
import photographerOtpModel from '../models/photographerOtpModel'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const registerPhotographer = async (req, res) => {
    try {
        const {name, email, mobile, password} = req.body
        if(!name || name.trim() === '' || !email || email.trim() === '' || !mobile || mobile.trim() === '' || !password || password.trim() === ''){
            return res.json({success:false, message:'missing details'})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false, message:'Please provide a valid email'})
        }

        const existingPhotographer = await photographerModel.findOne({email:email.trim()})
        if(existingPhotographer){
            return res.status(400).json({success:false, message:'Email already registered. Please use another email or login.'})
        }

        const mobileRegex = /^[0-9]{10}$/
        const isRepeatingDigits = /^(.)\1+$/.test(mobile)
        if(!mobileRegex.test(mobile) || isRepeatingDigits){
            return res.status(400).json({success:false, message:'Invalid mobile number'})
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if(!passwordRegex.test(password)){
            return res.status(400).json({success:false, message:'Password must be at least 8 characters long, and include a letter, a number, and a special character.'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const photographer = new photographerModel({
            name:name.trim(),
            email:email.trim(),
            mobile:mobile.trim(),
            password:hashedPassword
        })

        const photographerData = await photographer.save()

        if(photographerData){
            await sendVerifyMail(name.trim(), email.trim(), photographerData._id)

            return res.status(200).json({success:true, message:'OTP has been send', photographerId:photographerData._id})
        }else{
            return res.status(400).json({success:false, message:'Your registration has failed'})
        }
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const sendVerifyMail = async (name, email, photographer_id) => {
    try {
        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        const otpEntry = new photographerOtpModel({
            photographer_id:photographer_id,
            otp:otp
        })

        await otpEntry.save()

        const transporter = nodemailer.createTransport({
            host:process.env.SMTP_HOST,
            port:parseInt(process.env.SMTP_PORT),
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.SMTP_USER,
                pass:process.env.SMTP_PASS
            }
        })

        const mailOptions = {
            from:process.env.FROM_EMAIL,
            to:email,
            subject:"Email Verification - OTP",
            html:`<p>Hi ${name}</p>
                  <p>Your OTP for email verification is <strong>${otp}</strong>.</p>
                  <p>Please enter this OTP within the next 1 minute to verify your email.</p>`
        }

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error)
            }else{
                console.log('Email has been send: ', info.response)
            }
        })
    } catch (error) {
        console.log(error.message)
    }
}

const verifyPhotographerOtp = async (req, res) => {
    try {
        const {otp, photographerId} = req.body
        if(!photographerId || !otp){
            return res.status(400).json({success:false, message:'Missing PhotographerId or OTP'})
        }

        const otpEntry = await photographerOtpModel.findOne({photographer_id: photographerId, otp: otp})
        if(!otpEntry){
            return res.status(400).json({success:false, message:'Invalid OTP or OTP has been expired'})
        }

        await photographerModel.findByIdAndUpdate(photographerId, {is_verified:true})

        await photographerOtpModel.deleteOne({_id:otpEntry._id})

        const photographerToken = jwt.sign({photographerId}, process.env.JWT_SECRET, {expiresIn:'7d'})

        res.status(200).json({success:true, message:'OTP verified successfully', photographerToken, photographerId})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

export {
    registerPhotographer,
    verifyPhotographerOtp
}