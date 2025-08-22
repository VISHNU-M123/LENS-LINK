import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import photographerRouter from "./routes/photographerRoute.js";
import path from 'path'
import { fileURLToPath } from "url";

dotenv.config()
const app = express()

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

connectDB()

app.use('/api/user', userRouter)
app.use('/api/photographer', photographerRouter)

app.listen(PORT, () => {
    console.log('Server is running', PORT)
})