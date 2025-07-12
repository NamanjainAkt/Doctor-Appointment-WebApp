import express from 'express';
import {
  allDoctors,
  loginAdmin,
  addDoctor,
  loginDoctor,
  getDoctorProfile,
  updateDoctorProfile,
  getDoctorAppointments,
  getDoctorPatients
} from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import authDoctor from '../middlewares/authDoctor.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();

// Public routes
adminRouter.post('/login', loginAdmin);
adminRouter.post('/doctor-login', loginDoctor);

// Admin protected routes
adminRouter.post('/add-doctor', upload.single('image'), authAdmin, addDoctor);
adminRouter.post('/all-doctors', authAdmin, allDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailability);

// Doctor protected routes
adminRouter.get('/doctor-profile', authDoctor, getDoctorProfile);
adminRouter.put('/doctor-profile', upload.single('image'), authDoctor, updateDoctorProfile);
adminRouter.get('/doctor-appointments', authDoctor, getDoctorAppointments);
adminRouter.get('/doctor-patients', authDoctor, getDoctorPatients);

export default adminRouter;