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

        const admin = await doctorModel.findOne({ email: email, role: 'admin' });
        if (!admin) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { email: admin.email, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.json({ success: true, message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Something went wrong" });
    }
};

// API to get all doctors list

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password'); // Exclude password from the response
        res.json({success: true, message: "Doctors fetched successfully", doctors});
    } catch (error) {
        console.error(error);
        res.json({success: false, message: "Something went wrong"});
    }
};



// Add this to your existing adminController.js

// API for doctor login
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const doctor = await doctorModel.findOne({ email: email });
        if (!doctor) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const passwordMatch = await bcrypt.compare(password, doctor.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { email: doctor.email, id: doctor._id, role: 'doctor' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.json({ success: true, message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Something went wrong" });
    }
};

// Get doctor profile
const getDoctorProfile = async (req, res) => {
    try {
        const doctorId = req.doctor.id;
        const doctor = await doctorModel.findById(doctorId).select('-password');
        
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        
        res.json({ success: true, doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

// Update doctor profile
const updateDoctorProfile = async (req, res) => {
    try {
        const doctorId = req.doctor.id;
        const { name, speciality, experience, about, fees, address, degree } = req.body;
        
        // Build update object
        const updateData = {};
        if (name) updateData.name = name;
        if (speciality) updateData.speciality = speciality;
        if (experience) updateData.experience = experience;
        if (about) updateData.about = about;
        if (fees) updateData.fees = Number(fees);
        if (degree) updateData.degree = degree;
        
        // Handle address update
        if (address) {
            try {
                updateData.address = typeof address === 'string' ? JSON.parse(address) : address;
            } catch (error) {
                return res.status(400).json({ success: false, message: "Invalid address format" });
            }
        }
        
        // Handle image update if provided
        if (req.file) {
            try {
                const imageUpload = await cloudinary.uploader.upload(req.file.path, {resource_type: "image"});
                updateData.image = imageUpload.secure_url;
            } catch (error) {
                console.error('Cloudinary upload error:', error);
                return res.status(500).json({ success: false, message: "Failed to upload image" });
            }
        }
        
        // Update doctor profile
        const doctor = await doctorModel.findByIdAndUpdate(
            doctorId,
            updateData,
            { new: true }
        ).select('-password');
        
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        
        res.json({ success: true, message: "Profile updated successfully", doctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

// Get doctor's appointments
const getDoctorAppointments = async (req, res) => {
    try {
        const doctorId = req.doctor.id;
        
        const appointments = await appointmentModel.find({ doctor: doctorId })
            .sort({ appointmentDate: -1, appointmentTime: 1 });
        
        res.json({ success: true, appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

// Get doctor's patients (unique patients from appointments)
const getDoctorPatients = async (req, res) => {
    try {
        const doctorId = req.doctor.id;
        
        // Get all appointments for this doctor
        const appointments = await appointmentModel.find({ doctor: doctorId });
        
        // Extract unique patients
        const uniquePatients = [];
        const patientEmails = new Set();
        
        appointments.forEach(appointment => {
            if (!patientEmails.has(appointment.patientEmail)) {
                patientEmails.add(appointment.patientEmail);
                uniquePatients.push({
                    name: appointment.patientName,
                    email: appointment.patientEmail,
                    lastAppointment: appointment.appointmentDate,
                    appointmentCount: 1
                });
            } else {
                // Update existing patient data
                const patient = uniquePatients.find(p => p.email === appointment.patientEmail);
                if (patient) {
                    patient.appointmentCount += 1;
                    if (new Date(appointment.appointmentDate) > new Date(patient.lastAppointment)) {
                        patient.lastAppointment = appointment.appointmentDate;
                    }
                }
            }
        });
        
        res.json({ success: true, patients: uniquePatients });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};

export {
  allDoctors,
  loginAdmin,
  addDoctor,
  loginDoctor,
  getDoctorProfile,
  updateDoctorProfile,
  getDoctorAppointments,
  getDoctorPatients
};