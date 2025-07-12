import jwt from 'jsonwebtoken';

// Doctor authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || decoded.role !== 'doctor') {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }
        
        req.doctor = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Authentication failed" });
    }
};

export default authDoctor;