import mongoose from 'mongoose';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';

// Create new appointment
const createAppointment = async (req, res) => {
    try {
        const { doctorId, appointmentDate, appointmentTime, patientName, patientEmail } = req.body;

        if (!doctorId || !appointmentDate || !appointmentTime || !patientName || !patientEmail) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Check doctor by either _id or externalId
        const doctorQuery = mongoose.Types.ObjectId.isValid(doctorId) 
            ? { _id: doctorId }
            : { externalId: doctorId };

        const doctor = await doctorModel.findOne(doctorQuery)
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        if (!doctor.availability) {
            return res.status(400).json({
                success: false,
                message: 'Doctor is not available for appointments'
            });
        }

        // Create new appointment
        const newAppointment = new appointmentModel({
            doctor: doctor._id, // Store doctor's _id
            patientName,
            patientEmail,
            appointmentDate,
            appointmentTime,
            fees: doctor.fees, // Include doctor's fees
            status: 'pending'
        });

        await newAppointment.save();

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully',
            appointment: newAppointment
        });

    } catch (error) {
        console.error('Error in createAppointment:', error);
        let errorMessage = 'Failed to book appointment';
        let statusCode = 500;

        if (error.name === 'ValidationError') {
            errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
            statusCode = 400;
        } else if (error.name === 'CastError') {
            errorMessage = 'Invalid data format';
            statusCode = 400;
        }

        res.status(statusCode).json({
            success: false,
            message: errorMessage,
            error: error.message
        });
    }
};

// Get appointments by patient email
const getPatientAppointments = async (req, res) => {
    try {
        const { patientEmail } = req.params;
        
        const appointments = await appointmentModel.find({ patientEmail })
            .populate('doctor', '-password')
            .sort({ appointmentDate: 1 });

        res.json({
            success: true,
            appointments
        });

    } catch (error) {
        console.error('Error in getPatientAppointments:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch appointments',
            error: error.message
        });
    }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { status } = req.body;

        if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value'
            });
        }

        const appointment = await appointmentModel.findByIdAndUpdate(
            appointmentId,
            { status },
            { new: true }
        ).populate('doctor', '-password');

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: 'Appointment not found'
            });
        }

        res.json({
            success: true,
            message: 'Appointment status updated successfully',
            appointment
        });

    } catch (error) {
        console.error('Error in updateAppointmentStatus:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update appointment status',
            error: error.message
        });
    }
};

// Get appointments by doctor ID
const getDoctorAppointments = async (req, res) => {
    try {
        const { doctorId } = req.params;
        
        const appointments = await appointmentModel.find({ doctor: doctorId })
            .sort({ appointmentDate: 1 });

        res.json({
            success: true,
            appointments
        });

    } catch (error) {
        console.error('Error in getDoctorAppointments:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch appointments',
            error: error.message
        });
    }
};

export { createAppointment, getPatientAppointments, updateAppointmentStatus, getDoctorAppointments };