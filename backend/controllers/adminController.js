import validator from "validator";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary";
import doctorModel from "../models/doctormodel.js";  // Fixed casing here
import jwt from "jsonwebtoken";
import 'dotenv/config';



//API for adding doctor
const addDoctor = async (req, res) => {
    try{
        const {name, email, password, speciality, experience,about, fees,address} = req.body;
        const {image} = req.file;
        
        //chekcing for all data to add doctor
        if(!name || !email || !password || !speciality || !experience || !about || !fees || !address || !image){
            return res.json({success:false,message: "All fields are required"});
        }

        //cvalidate email
        if(!validator.isEmail(email)){
            return res.json({success:false,message: "please enter a valid email"});
        }

        //validate  strong password
        if(password.length < 8){
            return res.json({success:false,message: "password must be at least 8 characters long"});
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type: "image"});
        const imageUrl = imageUpload.secure_url;

        //create doctor
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            image: imageUrl,
            degree,
            date:Date.now(),
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

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(
                process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD,
                process.env.JWT_SECRET
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

export { loginAdmin };  // Add this export

export default {addDoctor,loginAdmin};