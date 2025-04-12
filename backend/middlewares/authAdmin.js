import jwt from 'jsonwebtoken';

//admin authentication

const authAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || decoded.role !== 'admin') {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }
        req.admin = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "something went wrong" });
    }

}

export default authAdmin;