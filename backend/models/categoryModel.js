import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    categoryDescription:{
        type:String,
        required:true
    },
    categoryStatus:{
        type:String,
        enum:['Active', 'Blocked'],
        default:'Active'
    },
    photographer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Photographer',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const categoryModel = mongoose.model('Category', categorySchema)

export default categoryModel