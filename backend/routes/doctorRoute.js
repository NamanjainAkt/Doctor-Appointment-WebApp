import express from 'express';
import { getAllDoctors, getDoctor, updateDoctorStatus, deleteDoctor, changeAvailability } from '../controllers/doctorController.js';

const router = express.Router();

// Get all doctors
router.get('/', getAllDoctors);

// Get single doctor
router.get('/:id', getDoctor);

// Update doctor status
router.put('/status/:id', updateDoctorStatus);

// Delete doctor
router.delete('/:id', deleteDoctor);

// Change doctor availability
router.put('/availability', changeAvailability);

export default router;
