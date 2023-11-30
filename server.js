import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to DB');
    })
    .catch((err) => {
      throw err;
    });
};

//middlewares
app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://192.168.1.11:3000', '192.168.1.128:3000'],
    credentials: true,
  })
);
app.use('/api/auth/', authRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/task/', taskRoutes);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800, () => {
  connect();
  console.log('Connect to Server to port 8800');
});
