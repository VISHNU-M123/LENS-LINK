import mongoose from "mongoose";

const photographerSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    mobile: {
        type:Number,
        required:true,
        default:'0000000000'
    },
    password: {
        type:String,
        required:true
    },
    profileImage: {
        type:String,
        default:''
    },
    experience: {
        type:Number,
        default:0
    },
    studioName: {
        type:String,
        required:true
    },
    location: {
        type:String,
        required:true
    },
    is_available: {
        type:Boolean,
        default:true
    },
    is_verified: {
        type:Boolean,
        default:false
    },
    is_blocked: {
        type:String,
        enum:["Active", "Blocked"],
        default:"Active"
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
})

const photographerModel = mongoose.model('Photographer', photographerSchema)

export default photographerModel