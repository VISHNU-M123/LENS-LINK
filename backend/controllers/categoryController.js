import categoryModel from "../models/categoryModel"

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

export {
    addCategory
}