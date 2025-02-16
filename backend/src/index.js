import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.auth.js";
import { server } from "./lib/socket.js";

dotenv.config();
const app = express();

const corsOptions = {
    origin: [
        "https://synkr-c5e5.onrender.com",
        "https://synkr-jqczxab7c-vaibhav-srivastavas-projects-02619579.vercel.app",
        // During development, you might want to add localhost
        "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Apply middlewares in correct order
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // You imported cookieParser but weren't using it

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});
