import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import appointmentRouter from './routes/appointmentRoute.js';
import paymentRouter from './routes/paymentRoute.js';
import userRouter from './routes/userRoute.js';
import doctorRouter from './routes/doctorRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/users', userRouter);
app.use('/api/doctors', doctorRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});