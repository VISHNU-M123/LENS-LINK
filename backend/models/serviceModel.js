import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
    photographer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Photographer',
        required:true
    },
    serviceName:{
        type:String,
        required:true
    },
    serviceDescription:{
        type:String,
        required:true
    },
    servicePrice:{
        type:String,
        required:true
    },
    serviceDuration:{
        type:String,
        required:true
    },
    serviceStatus:{
        type:String,
        enum:["Active", "Blocked"],
        default:"Active"
    },
    // isAvailable:{
    //     type:Boolean,
    //     default:true
    // },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const serviceModel = mongoose.model('Service', serviceSchema)

export default serviceModel