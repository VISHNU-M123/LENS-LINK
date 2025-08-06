import serviceModel from "../models/serviceModel.js";

const addService = async (req, res) => {
    try {
        const photographerId = req.photographerId
        const serviceName = req.body.serviceName.trim().toLowerCase()
        const {serviceDescription, minPrice, maxPrice, currency, serviceDuration, serviceStatus} = req.body

        if(!serviceName || serviceName.trim() === ''){
            return res.status(400).json({success:false, message:'Service Name is required'})
        }

        if(!serviceDescription || serviceDescription.trim() === ''){
            return res.status(400).json({success:false, message:'Service Description is required'})
        }

        if (minPrice === undefined || minPrice === null || (typeof minPrice === 'string' && minPrice.trim() === '')) {
            return res.status(400).json({success:false, message:'Minimum price is required'});
        }

        if (maxPrice === undefined || maxPrice === null || (typeof maxPrice === 'string' && maxPrice.trim() === '')) {
            return res.status(400).json({success:false, message:'Maximum price is required'});
        }

        const minPriceNum = Number(minPrice)
        const maxPriceNum = Number(maxPrice)

        if(isNaN(minPriceNum) || minPriceNum < 0){
            return res.status(400).json({success:false, message:'Invalid Minimum price'})
        }

        if(isNaN(maxPriceNum) || maxPriceNum < 0){
            return res.status(400).json({success:false, message:'Invalid Maximun price'})
        }

        if(minPriceNum > maxPriceNum){
            return res.status(400).json({success:false, message:'Minimum price cannot be greater than Maximum price'})
        }

        if(!['INR', 'USD'].includes(currency)){
            return res.status(400).json({success:false, message:'Invalid currency'})
        }

        if(!serviceDuration || serviceDuration.trim() === ''){
            return res.status(400).json({success:false, message:'Service Duration is requried'})
        }

        if(!['Active', 'Blocked'].includes(serviceStatus)){
            return res.status(400).json({success:false, message:'Invalid status'})
        }

        const existingService = await serviceModel.findOne({photographer:photographerId, serviceName:serviceName})

        if(existingService){
            return res.status(400).json({success:false, message:'Service already exists'})
        }

        const newService = new serviceModel({
            photographer:photographerId,
            serviceName:serviceName.trim().toLowerCase(),
            serviceDescription:serviceDescription,
            minPrice:minPriceNum,
            maxPrice:maxPriceNum,
            currency:currency,
            serviceDuration:serviceDuration,
            serviceStatus:serviceStatus
        })

        await newService.save()
        return res.status(200).json({success:true, message:'Service added successfully'})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const loadAllServices = async (req, res) => {
    try {
        const photographerId = req.photographerId

        if(!photographerId){
            return res.status(400).json({success:false, message:'Photographer not found'})
        }

        const allServices = await serviceModel.find({photographer:photographerId}).sort({createdAt: -1})

        return res.status(200).json({success:true, allServices})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const toggleServiceStatus = async (req, res) => {
    try {
        const {serviceId} = req.body
        const photographerId = req.photographerId

        const service = await serviceModel.findOne({
            _id:serviceId,
            photographer:photographerId
        })

        if(!service){
            return res.status(400).json({success:false, message:'Service not found or unauthorized'})
        }

        service.serviceStatus = service.serviceStatus === 'Active' ? 'Blocked' : 'Active'

        await service.save()
        return res.status(200).json({success:true, serviceStatus:service.serviceStatus})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

const deleteService = async (req, res) => {
    try {
        const {serviceId} = req.body
        const photographerId = req.photographerId

        const service = await serviceModel.findOneAndDelete({
            _id:serviceId,
            photographer:photographerId
        })

        if(!service){
            return res.status(400).json({success:false, message:'Service not found or unauthorized'})
        }

        return res.status(200).json({success:true, message:'Service deleted successfully'})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

export {
    addService,
    loadAllServices,
    toggleServiceStatus,
    deleteService
}