import mongoose from 'mongoose';
import 'dotenv/config';
import doctorModel from '../models/doctorModel.js';

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Migration function to add externalId to existing doctors
const migrateDoctors = async () => {
    try {
        await connectDB();
        
        // Get all doctors without externalId
        const doctors = await doctorModel.find({ externalId: { $exists: false } });
        console.log(`Found ${doctors.length} doctors without externalId`);
        
        // Update each doctor with a new externalId
        for (let i = 0; i < doctors.length; i++) {
            const doctor = doctors[i];
            const externalId = `doc${i + 1}`;
            
            await doctorModel.findByIdAndUpdate(doctor._id, { externalId });
            console.log(`Updated doctor ${doctor.name} with externalId ${externalId}`);
        }
        
        console.log('Migration completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

// Run the migration
migrateDoctors();