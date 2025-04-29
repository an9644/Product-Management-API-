import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { userRouter } from './Routes/userroutes.js';
import { adminRouter } from './Routes/adminrouter.js'; 

dotenv.config();
const app = express();

mongoose.connect('mongodb://localhost:27017/Product-Management-API')
  .then(() => console.log('MongoDB connected successfully.'))

app.use(json());
app.use('/', userRouter);
app.use('/admin', adminRouter);

const port = process.env.PORT ;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
