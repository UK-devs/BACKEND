import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import inputRoute from './routes/input.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/reports", inputRoute);
app.use("/uploads", express.static('uploads'));



// Response handler middleware
app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const message = "";
    return res.status(statusCode).json({
        success: [200, 201, 204].some(a => a === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data,
    });
});

// Database Connection
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to UnladKomunidad Database");
    } catch (error) {
        throw error;
    }
}

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    connectMongoDB();
    console.log(`Server is running on port ${PORT}`);
});
