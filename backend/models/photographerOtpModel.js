import mongoose from "mongoose";

const photographerOtpSchema = new mongoose.Schema({
    photographer_id: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Photographer'
    },
    otp: {
        type:String,
        required:true
    },
    createdAt: {
        type:Date,
        default:Date.now,
        expires:60
    }
})

const photographerOtpModel = mongoose.model('PhotographerOtp', photographerOtpSchema)

export default photographerOtpModel