import jwt from 'jsonwebtoken'

const photographerMiddleware = (req, res, next) => {
    try {
        const {photographerToken} = req.headers
        if(!photographerToken){
            return res.status(400).json({success:false, message:'Not authorized. Login again'})
        }

        const tokenDecoded = jwt.verify(photographerToken, process.env.JWT_SECRET)

        req.photographerId = tokenDecoded.id
        next()
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}

export default photographerMiddleware