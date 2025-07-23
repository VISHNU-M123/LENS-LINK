import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import photographerRouter from "./routes/photographerRoute.js";

dotenv.config()
const app = express()

const PORT = 3000;

app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/user', userRouter)
app.use('/api/photographer', photographerRouter)

app.listen(PORT, () => {
    console.log('Server is running', PORT)
})