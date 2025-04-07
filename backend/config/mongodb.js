import mongoose from "mongoose";
import { encodeURIComponent } from 'url';

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB");
        });

        // URL encode the password if it contains special characters
        const encodedURI = process.env.MONGO_URI.replace(
            /:\/\/([^:]+):([^@]+)@/,
            (match, user, pass) => `://${user}:${encodeURIComponent(pass)}@`
        );

        await mongoose.connect(`${encodedURI}/DocSched?retryWrites=true&w=majority`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
}

export default connectDB;