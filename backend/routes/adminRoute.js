import express from 'express';
import { allDoctors, loginAdmin } from '../controllers/adminController.js';
import { addDoctor } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);
adminRouter.post('/add-doctor', upload.single('image'), addDoctor);
adminRouter.post('/all-doctors', authAdmin,allDoctors);
adminRouter.post('/change-availability', authAdmin,changeAvailability);



export default adminRouter;