import express from 'express'
import { registerPhotographer, resendPhotographerOtp, verifyLoginPhotographer, verifyPhotographerOtp } from '../controllers/photographerController.js'
import photographerMiddleware from '../middlewares/photographerMiddleware.js'
import { addService, deleteService, loadAllServices, loadEditService, toggleServiceStatus, updateService } from '../controllers/serviceController.js'
import { addAchievement, addEquipment, addSocialLink, addSpecialization, addWhatsapp, getProfile, updateAbout, updateAchievement, updateContact, updateCoverImage, updateEquipment, updateSocialLink, updateSpecialization } from '../controllers/photographerProfileController.js'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname
        cb(null, name)
    }
})

const upload = multer({storage:storage})

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

photographerRouter.get('/getProfile', photographerMiddleware, getProfile)
photographerRouter.post('/updateAbout', photographerMiddleware, updateAbout)
photographerRouter.post('/addEquipment', photographerMiddleware, addEquipment)
photographerRouter.post('/updateEquipment', photographerMiddleware, updateEquipment)

photographerRouter.post('/addAchievement', photographerMiddleware, addAchievement)
photographerRouter.post('/updateAchievement', photographerMiddleware, updateAchievement)

photographerRouter.post('/addSpecialization', photographerMiddleware, addSpecialization)
photographerRouter.post('/updateSpecialization', photographerMiddleware, updateSpecialization)

photographerRouter.post('/addSocialLink', photographerMiddleware, addSocialLink)
photographerRouter.post('/updateSocialLink', photographerMiddleware, updateSocialLink)

photographerRouter.post('/addWhatsapp', photographerMiddleware, addWhatsapp)
photographerRouter.post('/updateContact', photographerMiddleware, updateContact)

photographerRouter.post('/updateCoverImage', photographerMiddleware, upload.single('coverImage'), updateCoverImage)

export default photographerRouter