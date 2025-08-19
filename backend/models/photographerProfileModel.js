import mongoose from "mongoose";

const photographerProfileSchema = new mongoose.Schema({
    photographer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Photographer',
        required:true
    },
    studioName:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
    },
    location:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        default:0
    },
    about:{
        type:String,
        required:true
    },
    whatsapp:{
        type:String,
        default:''
    },
    specializations:{
        type:[String],
        default:[]
    },
    equipment:{
        type:[String],
        default:[]
    },
    achievements:{
        type:[String],
        default:[]
    },
    socialLinks:[{
        platform:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }]
})

const photographerProfileModel = mongoose.model('photographerProfile', photographerProfileSchema)

export default photographerProfileModel