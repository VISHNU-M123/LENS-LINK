import photographerProfileModel from "../models/photographerProfileModel.js"

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

        const profile = await photographerProfileModel.findOneAndUpdate({photographer:photographerId}, {about:about}, {new:true, upsert:true})

        if(!profile){
            return res.status(400).json({success:false, message:'Profile not found'})
        }

        res.status(200).json({success:true, about:profile.about})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

export {
    updateAbout
}