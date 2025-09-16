import categoryModel from "../models/categoryModel.js"

const addCategory = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const categoryName = req.body.categoryName.trim().toLowerCase()
        const {categoryDescription, categoryStatus} = req.body

        if(!categoryName || categoryName.trim() === ''){
            return res.status(400).json({success:false, message:'Category name is required'})
        }

        if(!categoryDescription || categoryDescription.trim() === ''){
            return res.status(400).json({success:false, message:'Category description is required'})
        }

        if(!['Active', 'Blocked'].includes(categoryStatus)){
            return res.status(400).json({success:false, message:'Invalid status'})
        }

        const existingCategory = await categoryModel.findOne({categoryName:categoryName, photographer:photographerId})

        if(existingCategory){
            return res.status(400).json({success:false, message:'Category already exists for this photographer'})
        }

        const newCategory = new categoryModel({
            categoryName:categoryName.trim().toLowerCase(),
            categoryDescription:categoryDescription,
            categoryStatus:categoryStatus,
            photographer:photographerId
        })

        await newCategory.save()
        return res.status(200).json({success:true, message:'Category added successfully'})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const loadAllCategory = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const categories = await categoryModel.find({photographer:photographerId})

        res.status(200).json({success:true, categories})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const toggleCategoryStatus = async (req, res) => {
    try {
        const photographerId = req.photographerId
        const {categoryId} = req.body

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const category = await categoryModel.findOne({_id:categoryId, photographer:photographerId})

        if(!category){
            return res.status(400).json({success:false, message:'Category not found'})
        }

        category.categoryStatus = category.categoryStatus === 'Active' ? 'Blocked' : 'Active'
        await category.save()

        res.status(200).json({success:true, message:'Category status updated successfully', updatedStatus:category.categoryStatus, category})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const loadEditCategory = async (req, res) => {
    try {
        const photographerId = req.photographerId
        const {categoryId} = req.params

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const category = await categoryModel.findOne({_id:categoryId, photographer:photographerId})

        if(!category){
            return res.status(400).json({success:false, message:'Category not found'})
        }

        res.status(200).json({success:true, category})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const updateCategory = async (req, res) => {
    try {
        const photographerId = req.photographerId
        const {categoryId} = req.params
        const {categoryName, categoryDescription, categoryStatus} = req.body

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const category = await categoryModel.findOne({_id:categoryId, photographer:photographerId})

        if(!category){
            return res.status(400).json({success:false, message:'Category not found'})
        }

        if(!categoryName || categoryName.trim() === ''){
            return res.status(400).json({success:false, message:'Category Name is required'})
        }

        if(!categoryDescription || categoryDescription.trim() === ''){
            return res.status(400).json({success:false, message:'Category description is required'})
        }

        if(!['Active', 'Blocked'].includes(categoryStatus)){
            return res.status(400).json({success:false, message:'Invalid Status'})
        }

        const existingCategory = await categoryModel.findOne({categoryName:categoryName, photographer:photographerId})

        if(existingCategory && existingCategory._id.toString() !== categoryId){
            return res.status(400).json({success:false, message:'Category already exists for this photographer'})
        }

        category.categoryName = categoryName
        category.categoryDescription = categoryDescription
        category.categoryStatus = categoryStatus

        await category.save()
        res.status(200).json({success:true, message:'Category updated successfully', category})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

export {
    addCategory,
    loadAllCategory,
    toggleCategoryStatus,
    loadEditCategory,
    updateCategory
}