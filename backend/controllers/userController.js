import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import 'dotenv/config';

// Register new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        
        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }
        
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User with this email already exists" });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        
        await newUser.save();
        
        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        // Return success response with token and user info (excluding password)
        const userToReturn = { ...newUser._doc };
        delete userToReturn.password;
        
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: userToReturn
        });
        
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ success: false, message: "Registration failed" });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }
        
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        // Return success response with token and user info (excluding password)
        const userToReturn = { ...user._doc };
        delete userToReturn.password;
        
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: userToReturn
        });
        
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ success: false, message: "Login failed" });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        
        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        res.status(200).json({
            success: true,
            user
        });
        
    } catch (error) {
        console.error("Error in getUserProfile:", error);
        res.status(500).json({ success: false, message: "Failed to fetch user profile" });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, phone, address, gender, dob } = req.body;
        
        // Find user and update
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { name, phone, address, gender, dob },
            { new: true, runValidators: true }
        ).select("-password");
        
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });
        
    } catch (error) {
        console.error("Error in updateUserProfile:", error);
        res.status(500).json({ success: false, message: "Failed to update profile" });
    }
};

export { registerUser, loginUser, getUserProfile, updateUserProfile };