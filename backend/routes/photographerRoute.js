import express from 'express'
import { registerPhotographer, verifyPhotographerOtp } from '../controllers/photographerController'

const photographerRouter = express.Router()

photographerRouter.post('/register-photographer', registerPhotographer)
photographerRouter.post('/verify-photographerOtp', verifyPhotographerOtp)

export default photographerRouter