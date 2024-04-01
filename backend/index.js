import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/user.route.js'
import bookingRoutes from './routes/booking.routes.js'
import paymentRoutes from './routes/payement.routes.js'
import verifyRoutes from './routes/verify.routes.js'
import securityRoutes from './routes/security.routes.js'
import connectToMongoDb from "./db/connectToMongoDb.js";
import { Server } from 'socket.io'
import http from 'http'


dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))


// Routes
app.use("/api/auth", authRoutes)
app.use("/api/booking", bookingRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/security", securityRoutes)
app.use("/api/forgot-password", verifyRoutes)

// SocketLayer
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Adjust this to your client's origin
        methods: ["GET", "POST"]
    }
});


server.listen(PORT, () => {
    connectToMongoDb();
    console.log(`Server running on port ${PORT}`);
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Example of sending a message to the client
    socket.emit('welcome', 'Welcome to the Socket.IO server!');

    // Handling a disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

export default io