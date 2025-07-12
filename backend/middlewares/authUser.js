import jwt from 'jsonwebtoken';

// User authentication middleware
const authUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(403).json({ success: false, message: "Invalid token" });
        }
        
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in authUser middleware:", error);
        res.status(401).json({ success: false, message: "Authentication failed" });
    }
};

export default authUser;