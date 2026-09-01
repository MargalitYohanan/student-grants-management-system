import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './api/routes/authRoutes.js';
import requestRoutes from './api/routes/requestRoutes.js'

dotenv.config();

const app = express();


mongoose.connect(process.env.URI)
    .then(() => {
        console.log('connect to mongoDB!');
    })
    .catch(error => {
        console.error(error);
    })


// מאפשר לקליינט האנגולר (רץ על פורט 4200) לקרוא ל-API שרץ על פורט 3000
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/request', requestRoutes);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`my app is running on http://localhost:${port}`);
})