import mongoose from 'mongoose';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';

// Create new appointment
const createAppointment = async (req, res) => {
    try {
        const { doctorId, appointmentDate, appointmentTime, patientName, patientEmail } = req.body;

        // Validate required fields
        if (!doctorId || !appointmentDate || !appointmentTime || !patientName || !patientEmail) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        // Validate doctorId format
        if (!mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid doctor ID format'
            });
        }

        // Validate date format and ensure it's not in the past
        const appointmentDateTime = new Date(appointmentDate);
        if (isNaN(appointmentDateTime.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid appointment date format'
            });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (appointmentDateTime < today) {
            return res.status(400).json({
                success: false,
                message: 'Appointment date cannot be in the past'
            });
        }

        // Check if doctor exists
        const doctor = await doctorModel.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Check if doctor is available
        if (!doctor.Available) {
            return res.status(400).json({
                success: false,
                message: 'Doctor is not available for appointments'
            });
        }

        // Create new appointment
        const appointment = new appointmentModel({
            doctor: doctorId,
            appointmentDate,
            appointmentTime,
            patientName,
            patientEmail,
            status: 'pending',
            fees: doctor.fees
        });

        await appointment.save();

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully',
            appointment
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

export { createAppointment, getPatientAppointments, updateAppointmentStatus };