import express from "express";
import { getUserProfile, loadAllPhotographer, loadSinglePhotographer, registerUser, resendOtp, verifyLogin, verifyOtp } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/verify-otp', verifyOtp)
userRouter.post('/resend-otp', resendOtp)
userRouter.post('/login', verifyLogin)
userRouter.get('/allPhotographers', loadAllPhotographer)
userRouter.get('/getUserProfile', authMiddleware, getUserProfile)
userRouter.get('/loadSinglePhotographer/:photographerId', loadSinglePhotographer)

export default userRouter