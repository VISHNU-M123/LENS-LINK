import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
    photographer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Photographer',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const serviceModel = mongoose.model('Service', serviceSchema)

export default serviceModel