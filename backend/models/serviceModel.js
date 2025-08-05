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
    minPrice:{
        type:Number,
        required:true
    },
    maxPrice:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        enum:['INR', 'USD'],
        default:'INR'
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