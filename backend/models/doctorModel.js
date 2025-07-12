import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    externalId: {
        type: String,
        unique: true,
        sparse: true // Allows null values and only enforces uniqueness on non-null values
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    speciality: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        default: true,
    },
    fees: {
        type: Number,
        required: true,
    },
    address: {
        type: Object,  // Changed from Objects to Object
        required: true
    },
    date: {
        type: Number,
        default: Date.now,
    },
    slots_booked: {
        type: Object,  // Changed from Objects to Object
        default: {},
    },
}, { minimize: false });

const doctorModel = mongoose.models.doctor || mongoose.model("Doctor", doctorSchema);

export default doctorModel;