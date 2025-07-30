import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    try {
        const {token} = req.headers
        if(!token){
            return res.status(400).json({success:false, message:'Not authorized. Login again'})
        }

        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = tokenDecoded.id
        next()
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}

export default authMiddleware