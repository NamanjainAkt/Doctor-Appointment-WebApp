import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        
        const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017";
        await mongoose.connect(`${mongoURI}/DocSched`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
}

export default connectDB