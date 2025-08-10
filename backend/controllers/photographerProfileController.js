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

        const profile = await photographerProfileModel.findOne({photographer:photographerId})

        if(!profile){
            return res.status(400).json({success:false, message:'Profile not found'})
        }

        res.status(200).json({success:true, profileData:profile})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

export {
    updateAbout,
    getProfile
}