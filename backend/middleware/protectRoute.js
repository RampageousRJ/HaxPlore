import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(token);
        if (!token) {
            return res.status(401).json({error: 'Unauthorized- No Token Provided!'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        if (!decoded) {
            return res.status(401).json({error: 'Unauthorized- Invalid Token!'});
        }

        const user = await User.findById(decoded.userId).select('-password');
        console.log(user);
        if (!user) {
            return res.status(401).json({error: 'User not found!'});
        }
        
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        
        // If headers have already been sent, calling res.status().json() will cause an error.
        // Therefore, it's important to check if headers have been sent before attempting to send a response.
        if (res.headersSent) {
            return next(error);
        }

        res.status(500).json({error: 'Internal Server Error'});
    }
};

export default protectRoute;
