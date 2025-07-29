import express from "express";
import { loadAllPhotographer, registerUser, resendOtp, verifyLogin, verifyOtp } from "../controllers/userController.js";

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/verify-otp', verifyOtp)
userRouter.post('/resend-otp', resendOtp)
userRouter.post('/login', verifyLogin)
userRouter.get('/allPhotographers', loadAllPhotographer)

export default userRouter