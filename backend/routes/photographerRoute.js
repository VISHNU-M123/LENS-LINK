import express from 'express'
import { registerPhotographer, verifyLoginPhotographer, verifyPhotographerOtp } from '../controllers/photographerController.js'

const photographerRouter = express.Router()

photographerRouter.post('/register-photographer', registerPhotographer)
photographerRouter.post('/verify-photographerOtp', verifyPhotographerOtp)
photographerRouter.post('/login-photographer', verifyLoginPhotographer)

export default photographerRouter