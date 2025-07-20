import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
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

const otpModel = mongoose.model('Otp', otpSchema)

export default otpModel