import validator from "validator";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary";
import doctorModel from "../models/doctorModel.js";  // Fixed casing here
import jwt from "jsonwebtoken";
import 'dotenv/config';



//API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const {name, email, password, speciality, experience, about, fees, address, degree} = req.body;
        
        // Validate required fields
        if(!name || !email || !password || !speciality || !experience || !about || !fees || !address || !degree){
            return res.status(400).json({success: false, message: "All fields are required"});
        }

        // Check for image file
        if(!req.file) {
            return res.status(400).json({success: false, message: "Doctor's image is required"});
        }

        // Validate email
        if(!validator.isEmail(email)){
            return res.status(400).json({success: false, message: "Please enter a valid email"});
        }

        // Check if email already exists
        const existingDoctor = await doctorModel.findOne({ email });
        if(existingDoctor) {
            return res.status(400).json({success: false, message: "Email already registered"});
        }

        // Validate password strength
        if(password.length < 8){
            return res.status(400).json({success: false, message: "Password must be at least 8 characters long"});
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to cloudinary
        let imageUrl;
        try {
            const imageUpload = await cloudinary.uploader.upload(req.file.path, {resource_type: "image"});
            imageUrl = imageUpload.secure_url;
        } catch (error) {
            console.error('Cloudinary upload error:', error);
            return res.status(500).json({success: false, message: "Failed to upload image"});
        }

        // Parse address if it's a string
        let parsedAddress;
        try {
            parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;
        } catch (error) {
            return res.status(400).json({success: false, message: "Invalid address format"});
        }

        // Create doctor
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            experience,
            about,
            fees: Number(fees),
            address: parsedAddress,
            image: imageUrl,
            degree,
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save();

        res.json({success:true,message: "Doctor added successfully"});


    }
    catch(error){
        console.log(error);
        res.json({success:false,message: "something went wrong"});
    }

}
//adpi for the admin login

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                { email: process.env.ADMIN_EMAIL, role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );
            res.json({ success: true, message: "Login successful", token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Something went wrong" });
    }
};

export { loginAdmin, addDoctor };