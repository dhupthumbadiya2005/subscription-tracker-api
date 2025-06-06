import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';


const authMiddleware = async (req, res, next) => {
    try{
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized, no token'
            });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        
        const user =  await User.findById(decoded.userId) ;

        if(!user){
            return res.status(401).json({
                success: false,
                message: 'Not authorized, user not found'
            });
        }

        req.user = user; // Attach user to request object
        next(); // Call the next middleware or route handler
     
    }
    catch(error){
        console.error('Authentication error:', error);
        return res.status(401).json({
            success: false,
            message: 'Not authorized, token failed'
        });
    }

}

export default authMiddleware;