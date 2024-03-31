import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/user.route.js'
import bookingRoutes from './routes/booking.routes.js'
import paymentRoutes from './routes/payement.routes.js'
import connectToMongoDb from "./db/connectToMongoDb.js";


dotenv.config()

const PORT=process.env.PORT||3000;
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173'
}))


// Routes
app.use("/api/auth",authRoutes)
app.use("/api/booking",bookingRoutes)
app.use("/api/payment",paymentRoutes)

app.listen(3000,()=>{
    connectToMongoDb();
    console.log(`server running on port ${PORT}`)
})