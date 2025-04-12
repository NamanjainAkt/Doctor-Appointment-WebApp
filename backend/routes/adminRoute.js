import express from 'express';
import { loginAdmin } from '../controllers/adminController.js';
import { addDoctor } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);
adminRouter.post('/add-doctor', upload.single('image'), addDoctor);

export default adminRouter;