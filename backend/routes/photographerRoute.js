import express from 'express'
import { addService, registerPhotographer, resendPhotographerOtp, verifyLoginPhotographer, verifyPhotographerOtp } from '../controllers/photographerController.js'
import photographerMiddleware from '../middlewares/photographerMiddleware.js'

const photographerRouter = express.Router()

photographerRouter.post('/register-photographer', registerPhotographer)
photographerRouter.post('/verify-photographerOtp', verifyPhotographerOtp)
photographerRouter.post('/resend-photographerOtp', resendPhotographerOtp)
photographerRouter.post('/login-photographer', verifyLoginPhotographer)

photographerRouter.post('/add-service', photographerMiddleware, addService)

export default photographerRouter