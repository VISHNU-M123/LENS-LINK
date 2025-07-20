import validator from 'validator';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt'
import otpModel from '../models/otpModel.js';
import nodemailer from 'nodemailer'

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

            return res.status(200).json({success:true, message:'OTP has been send'})
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
        res.status(500).json({success:false, message:error.message})
    }
}

export {
    registerUser
}