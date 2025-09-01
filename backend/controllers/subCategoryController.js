import categoryModel from "../models/categoryModel"
import subCategoryModel from "../models/subCategoryModel"

const addSubCategory = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const subCategoryName = req.body.subCategoryName.trim().toLowerCase()
        const {subCategoryDescription, subCategoryStatus, mainCategoryId} = req.body

        if(!subCategoryName || subCategoryName.trim() === ''){
            return res.status(400).json({success:false, message:'Subcategory name is required'})
        }

        if(!subCategoryDescription || subCategoryDescription.trim() === ''){
            return res.status(400).json({success:false, message:'Subcategory description is required'})
        }

        if(!['Active', 'Blocked'].includes(subCategoryStatus)){
            return res.status(400).json({success:false, message:'Invalid status'})
        }

        if(!mainCategoryId){
            return res.status(400).json({success:false, message:'Please select a main category'})
        }

        const mainCategory = await categoryModel.findById(mainCategoryId)

        if(!mainCategory){
            return res.status(400).json({success:false, message:'Main category not found'})
        }

        const existingSubCategory = await subCategoryModel.findOne({subCategoryName:subCategoryName, categoryId:mainCategoryId, photographer:photographerId})

        if(existingSubCategory){
            return res.status(400).json({success:false, message:'Subcategory already exists'})
        }

        const newSubCategory = new subCategoryModel({
            subCategoryName:subCategoryName,
            subCategoryDescription:subCategoryDescription,
            subCategoryStatus:subCategoryStatus,
            categoryId:mainCategoryId,
            photographer:photographerId
        })

        await newSubCategory.save()
        return res.status(200).json({success:true, message:'Subcategory added successfully'})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

export {
    addSubCategory
}