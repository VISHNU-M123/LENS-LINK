import photographerModel from "../models/photographerModel.js";
import photographerProfileModel from "../models/photographerProfileModel.js"
import sanitizeHtml from 'sanitize-html';

const updateAbout = async (req, res) => {
    try {
        const photographerId = req.photographerId
        
        const {about} = req.body

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        if(!about || about.trim() === ''){
            return res.status(400).json({success:false, message:'About is required'})
        }

        let formattedAbout = about.trim().replace(/\s+/g, ' ');

        if(formattedAbout.length < 10){
            return res.status(400).json({success:false, message:'About must be at least 10 characters'})
        }

        if(formattedAbout.length > 1000){
            return res.status(400).json({success:false, message:'About cannot exceed 1000 characters'})
        }

        if (/^(.)\1+$/.test(formattedAbout)) {
            return res.status(400).json({ success: false, message: 'About cannot be just a single repeated character' });
        }

        formattedAbout = sanitizeHtml(formattedAbout, {
            allowedTags:[],
            allowedAttributes:{}
        })

        const profile = await photographerProfileModel.findOneAndUpdate({photographer:photographerId}, {about:formattedAbout}, {new:true, upsert:true})

        res.status(200).json({success:true, about:profile.about})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const getProfile = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const profile = await photographerProfileModel.findOne({photographer:photographerId}).populate('photographer', 'name email mobile profileImage')

        if(!profile){
            return res.status(400).json({success:false, message:'Profile not found'})
        }

        res.status(200).json({success:true, profileData:profile})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const addEquipment = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const {equipment} = req.body

        if(!equipment || equipment.trim() === ''){
            return res.status(400).json({success:false, message:'Equipment is required'})
        }

        const profile = await photographerProfileModel.findOneAndUpdate({photographer:photographerId}, {$push:{equipment:equipment.trim()}},{new:true})

        if(!profile){
            return res.status(400).json({success:false, message:'Profile not found'})
        }

        res.status(200).json({success:true, equipment:profile.equipment})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const updateEquipment = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const {equipment} = req.body

        if(!equipment){
            return res.status(400).json({success:false, message:'Equipment is required'})
        }
        
        if(!Array.isArray(equipment)){
            return res.status(400).json({success:false, message:'Equipment must be an array'})
        }

        if(equipment.some(item => typeof item !== 'string' || item.trim() === '')){
            return res.status(400).json({success:false, message:'each equipment item must be a non empty string'})
        }

        const updatedEquipment = await photographerProfileModel.findOneAndUpdate({photographer:photographerId}, {equipment}, {new:true})
        res.status(200).json({success:true, equipment:updatedEquipment.equipment})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const addAchievement = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const {achievement} = req.body

        if(!achievement || achievement.trim() === ''){
            return res.status(400).json({success:false, message:'Achievement is required'})
        }

        const profile = await photographerProfileModel.findOneAndUpdate({photographer:photographerId}, {$push:{achievements:achievement.trim()}}, {new:true})

        if(!profile){
            return res.status(400).json({success:false, message:'Profile not found'})
        }

        res.status(200).json({success:true, achievements:profile.achievements})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const updateAchievement = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const {achievements} = req.body

        if(!achievements){
            return res.status(400).json({success:false, message:'Achievement is required'})
        }

        if(!Array.isArray(achievements)){
            return res.status(400).json({success:false, message:'Achievement must be an array'})
        }

        if(achievements.some(item => typeof item !== 'string' || item.trim() === '')){
            return res.status(400).json({success:false, message:'each achievement item must be a non empty string'})
        }

        const updatedAchievement = await photographerProfileModel.findOneAndUpdate({photographer:photographerId}, {achievements}, {new:true})
        res.status(200).json({success:true, achievements:updatedAchievement.achievements})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const addSpecialization = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const {specializations} = req.body

        if(!specializations || specializations.trim() === ''){
            return res.status(400).json({success:false, message:'Specialization is required'})
        }

        const profile = await photographerProfileModel.findOneAndUpdate({photographer:photographerId}, {$push:{specializations:specializations.trim()}}, {new:true})

        if(!profile){
            return res.status(400).json({success:false, message:'Profile not found'})
        }

        res.status(200).json({success:true, specializations:profile.specializations})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const updateSpecialization = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const {specializations} = req.body

        if(!specializations){
            return res.status(400).json({success:false, message:'Specialization is required'})
        }

        if(!Array.isArray(specializations)){
            return res.status(400).json({success:false, message:'Specialization must be an array'})
        }

        if(specializations.some(item => typeof item !== 'string' || item.trim() === '')){
            return res.status(400).json({success:false, message:'each specialization item must be a non empty string'})
        }

        const updatedSpecialization = await photographerProfileModel.findOneAndUpdate({photographer:photographerId}, {specializations}, {new:true})
        res.status(200).json({success:true, specializations:updatedSpecialization.specializations})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const addSocialLink = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const {platform, url} = req.body

        if(!platform || platform.trim() === ''){
            return res.status(400).json({success:false, message:'Platform is required'})
        }

        if(!url || url.trim() === ''){
            return res.status(400).json({success:false, message:'URL is required'})
        }

        const regexMap = {
            instagram : /^https?:\/\/(www\.)?instagram\.com\/.+/i,
            facebook : /^https?:\/\/(www\.)?facebook\.com\/.+/i,
            twitter : /^https?:\/\/(www\.)?twitter\.com\/.+/i,
            linkedin : /^https?:\/\/(www\.)?linkedin\.com\/.+/i,
            website : /^https?:\/\/.+/i
        }

        const key = platform.toLowerCase()
        const isValid = regexMap[key]?.test(url)

        if(!isValid){
            return res.status(400).json({success:false, message:`Invalid URL for ${platform}`})
        }

        const profile = await photographerProfileModel.findOneAndUpdate({photographer:photographerId}, {$push:{socialLinks:{platform:platform.trim(), url:url.trim()}}}, {new:true})

        if(!profile){
            return res.status(400).json({success:false, message:'Profile not found'})
        }

        res.status(200).json({success:true, socialLinks:profile.socialLinks})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const updateSocialLink = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const {socialLinks} = req.body

        if(!socialLinks){
            return res.status(400).json({success:false, message:'Social links are required'})
        }

        if(!Array.isArray(socialLinks)){
            return res.status(400).json({success:false, message:'Social links must be an array'})
        }

        const regexMap = {
            instagram: /^https?:\/\/(www\.)?instagram\.com\/.+/i,
            facebook: /^https?:\/\/(www\.)?facebook\.com\/.+/i,
            twitter: /^https?:\/\/(www\.)?twitter\.com\/.+/i,
            linkedin: /^https?:\/\/(www\.)?linkedin\.com\/.+/i,
            website: /^https?:\/\/.+/i
        }

        for(let link of socialLinks){
            if(!link.platform || typeof link.platform !== 'string' || link.platform.trim() === ''){
                return res.status(400).json({success:false, message:'Each link must have a valid platform'})
            }
            if(!link.url || typeof link.url !== 'string' || link.url.trim() === ''){
                return res.status(400).json({success:false, message:'Each link must have a valid url'})
            }

            const key = link.platform.toLowerCase()
            const isValid = regexMap[key]?.test(link.url)

            if(!isValid){
                return res.status(400).json({success:false, message:`Invalid URL for ${link.platform}`})
            }
        }

        const updatedSocialLink = await photographerProfileModel.findOneAndUpdate({photographer:photographerId}, {socialLinks}, {new:true})
        res.status(200).json({success:true, socialLinks:updatedSocialLink.socialLinks})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const addWhatsapp = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const {whatsapp} = req.body

        if(!whatsapp || whatsapp.trim() === ''){
            return res.status(400).json({success:false, message:'whatsapp number is required'})
        }

        const whatsappRegex = /^[0-9]{10}$/
        const isRepeatingWhatsapp = /^(.)\1+$/.test(whatsapp)
        if(!whatsappRegex.test(whatsapp) || isRepeatingWhatsapp){
            return res.status(400).json({success:false, message:'Invalid whatsapp number'})
        }

        const profile = await photographerProfileModel.findOneAndUpdate({photographer:photographerId}, {whatsapp}, {new:true}).populate('photographer', 'name email mobile')

        if(!profile){
            return res.status(400).json({success:false, message:'Profile not found'})
        }

        res.status(200).json({success:true, whatsapp:profile.whatsapp})

    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const updateContact = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const {mobile, whatsapp} = req.body

        if(!mobile || mobile.trim() === ''){
            return res.status(400).json({success:false, message:'Mobile is required'})
        }

        // if(!whatsapp || whatsapp.trim() === ''){
        //     return res.status(400).json({success:false, message:'Whatsapp is required'})
        // }

        const mobileRegex = /^[0-9]{10}$/
        const isRepeatingDigits = /^(.)\1+$/.test(mobile)
        if(!mobileRegex.test(mobile) || isRepeatingDigits){
            return res.status(400).json({success:false, message:'Invalid mobile number'})
        }

        const whatsappRegex = /^[0-9]{10}$/
        const isRepeatingWhatsapp = /^(.)\1+$/.test(whatsapp)
        if(whatsapp && (!whatsappRegex.test(whatsapp) || isRepeatingWhatsapp)){
            return res.status(400).json({success:false, message:'Invalid whatsapp number'})
        }

        const updatedPhotographer = await photographerModel.findByIdAndUpdate(photographerId, {mobile}, {new:true})

        const updatedProfile = await photographerProfileModel.findOneAndUpdate({photographer:photographerId}, {whatsapp}, {new:true})

        if(!updatedPhotographer || !updatedProfile){
            return res.status(400).json({success:false, message:'Profile not found'})
        }

        res.status(200).json({success:true, contact:{mobile:updatedPhotographer.mobile, whatsapp:updatedProfile.whatsapp}})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const updateCoverImage = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        if(!req.file){
            return res.status(400).json({success:false, message:'No image uploaded'})
        }
        
        const coverImage = `/uploads/${req.file.filename}`

        const profile = await photographerProfileModel.findOneAndUpdate({photographer:photographerId}, {coverImage:coverImage}, {new:true})

        if(!profile){
            return res.status(400).json({success:false, message:'Profile not found'})
        }

        res.status(200).json({success:true, coverImage:profile.coverImage})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const updateProfile = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const {name, studioName, location, experience} = req.body

        if(!name || name.trim() === ''){
            return res.status(400).json({success:false, message:'Name is required'})
        }

        if(!studioName || studioName.trim() === ''){
            return res.status(400).json({success:false, message:'Studio name is required'})
        }

        if(!location || location.trim() === ''){
            return res.status(400).json({success:false, message:'Location is required'})
        }

        if(!experience || experience.trim() === ''){
            return res.status(400).json({success:false, message:'Experience is required'})
        }

        let updatePhotographerData = {name:name}
        if(req.file){
            updatePhotographerData.profileImage = `/uploads/${req.file.filename}`
        }

        const updatedPhotographer = await photographerModel.findByIdAndUpdate(photographerId, updatePhotographerData, {new:true})

        const updatedProfile = await photographerProfileModel.findOneAndUpdate({photographer:photographerId}, {studioName:studioName, location:location, experience:experience}, {new:true})

        if(!updatedPhotographer || !updatedProfile){
            return res.status(400).json({success:false, message:'Profile not found'})
        }

        res.status(200).json({success:true, profile:{profileImage:updatedPhotographer.profileImage, name:updatedPhotographer.name, studioName:updatedProfile.studioName, location:updatedProfile.location, experience:updatedProfile.experience}})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

export {
    updateAbout,
    getProfile,
    addEquipment,
    updateEquipment,
    addAchievement,
    updateAchievement,
    addSpecialization,
    updateSpecialization,
    addSocialLink,
    updateSocialLink,
    addWhatsapp,
    updateContact,
    updateCoverImage,
    updateProfile
}