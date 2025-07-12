import express from 'express';
import { createAppointment, getPatientAppointments, updateAppointmentStatus, getDoctorAppointments } from '../controllers/appointmentController.js';

const router = express.Router();

// Create new appointment
router.post('/create', createAppointment);

// Get appointments by patient email
router.get('/patient/:patientEmail', getPatientAppointments);

// Update appointment status
router.put('/status/:appointmentId', updateAppointmentStatus);

// Get appointments by doctor ID
router.get('/doctor/:doctorId', getDoctorAppointments);

export default router;