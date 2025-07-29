import validator from 'validator';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt'
import otpModel from '../models/otpModel.js';
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import photographerModel from '../models/photographerModel.js';

const registerUser = async (req, res) => {
    try {
        const {name, email, mobile, password} = req.body
        if(!name || name.trim() === '' || !email || email.trim() === '' || !mobile || mobile.trim() === '' || !password || password.trim() === ''){
            return res.json({success:false, message:'missing details'})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false, message:'Please provide a valid email'})
        }

        const existingUser = await userModel.findOne({email:email.trim()})
        if(existingUser){
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

        const user = new userModel({
            name:name.trim(),
            email:email.trim(),
            mobile:mobile.trim(),
            password:hashedPassword
        })

        const userData = await user.save()

        if(userData){
            await sendVerifyMail(name.trim(), email.trim(), userData._id)

            return res.status(200).json({success:true, message:'OTP has been send', userId:userData._id})
        }else{
            return res.status(400).json({success:false, message:'Your registration has failed'})
        }
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const sendVerifyMail = async (name, email, user_id) => {
    try {
        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        const otpEntry = new otpModel({
            user_id:user_id,
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
        console.error(error.message)
    }
}

const verifyOtp = async (req, res) => {
    try {
        const {otp, userId} = req.body
        if(!userId || !otp){
            return res.status(400).json({success:false, message:'Missing UserId or OTP'})
        }

        const otpEntry = await otpModel.findOne({user_id: userId, otp: otp})
        if(!otpEntry){
            return res.status(400).json({success:false, message:'Invalid OTP or OTP has been expired'})
        }

        await userModel.findByIdAndUpdate(userId, {is_verified:true})

        await otpModel.deleteOne({_id:otpEntry._id})

        const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn:'7d'})

        res.status(200).json({success:true, message:'OTP verified successfully', token, userId})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const resendOtp = async (req, res) => {
    try {
        const {userId} = req.body
        if(!userId){
            return res.status(400).json({success:false, message:'Please register again'})
        }

        const user = await userModel.findById(userId)
        if(!user){
            return res.status(400).json({success:false, message:'User not found'})
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        await otpModel.updateOne(
            {user_id: userId},
            {$set:{otp: otp, createdAt: new Date()}},
            {upsert: true}
        )

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
            to:user.email,
            subject:"Resend email verification - OTP",
            html:`<p>Hi ${user.name},</p>
                  <p>Your new OTP for email verification is <strong>${otp}</strong>.</p>
                  <p>Please enter this OTP within the next 1 minute to verify your email.</p>`
        }

        transporter.sendMail(mailOptions, function (error, info){
            if(error){
                return res.status(400).json({success:false, message:'Failed to resend OTP. Please try again later.'})
            }else{
                return res.status(200).json({success:true, message:'OTP has been resend successfully'})
            }
        })
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const verifyLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || email.trim() === '' || !password || password.trim() === ''){
            return res.status(400).json({success:false, message:'Please provide email and password'})
        }

        const userData = await userModel.findOne({email:email})

        if(!userData){
            return res.status(400).json({success:false, message:'Invalid email or password'})
        }

        const passwordMatch = await bcrypt.compare(password, userData.password)
        if(passwordMatch){
            if(userData.is_verified === false){
                return res.status(400).json({success:false, message:'User not verified'})
            }else{
                if(userData.is_blocked === 'Active'){
                    const token = jwt.sign({id:userData._id}, process.env.JWT_SECRET, {expiresIn:'7d'})
                    return res.status(200).json({success:true, token})
                }else{
                    return res.status(400).json({success:false, message:'You are blocked'})
                }
            }
        }else{
            return res.status(400).json({success:false, message:'invalid credentials'})
        }
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const loadAllPhotographer = async (req, res) => {
    try {
        const photographers = await photographerModel.find({is_blocked: 'Active'})
        if(!photographers){
            return res.status(400).json({success:false, message:'No active photograpehrs'})
        }
        res.status(200).json({success:true, photographers})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

export {
    registerUser,
    verifyOtp,
    resendOtp,
    verifyLogin,
    loadAllPhotographer
}