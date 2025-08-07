import express from 'express'
import { registerPhotographer, resendPhotographerOtp, verifyLoginPhotographer, verifyPhotographerOtp } from '../controllers/photographerController.js'
import photographerMiddleware from '../middlewares/photographerMiddleware.js'
import { addService, deleteService, loadAllServices, loadEditService, toggleServiceStatus, updateService } from '../controllers/serviceController.js'

const photographerRouter = express.Router()

photographerRouter.post('/register-photographer', registerPhotographer)
photographerRouter.post('/verify-photographerOtp', verifyPhotographerOtp)
photographerRouter.post('/resend-photographerOtp', resendPhotographerOtp)
photographerRouter.post('/login-photographer', verifyLoginPhotographer)

photographerRouter.post('/add-service', photographerMiddleware, addService)
photographerRouter.get('/allservices', photographerMiddleware, loadAllServices)
photographerRouter.post('/toggleServiceStatus', photographerMiddleware, toggleServiceStatus)
photographerRouter.post('/delete-service', photographerMiddleware, deleteService)
photographerRouter.post('/update-service', photographerMiddleware, updateService)
photographerRouter.get('/getEditService', photographerMiddleware, loadEditService)

export default photographerRouter