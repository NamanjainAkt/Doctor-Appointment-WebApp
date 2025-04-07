import jwt from 'jsonwebtoken';

//admin authentication

const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;
        if (!atoken) {
            return res.json({ success: false, message: "No token provided" });
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        if (token_decode === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "No token provided" });
        }

        next();
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "something went wrong" });
    }

}

export default authAdmin;