import express from 'express';
import { createAppointment, getPatientAppointments, updateAppointmentStatus } from '../controllers/appointmentController.js';

const router = express.Router();

// Create new appointment
router.post('/create', createAppointment);

// Get appointments by patient email
router.get('/patient/:patientEmail', getPatientAppointments);

// Update appointment status
router.put('/status/:appointmentId', updateAppointmentStatus);

export default router;