import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    subCategoryName:{
        type:String,
        required:true
    },
    subCategoryDescription:{
        type:String
    },
    subCategoryStatus:{
        type:String,
        enum:['Active', 'Blocked'],
        default:'Active'
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
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

const subCategoryModel = mongoose.model('subCategory', subCategorySchema)

export default subCategoryModel