import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.auth.js";
import {  server } from "./lib/socket.js";

dotenv.config();
const app = express();
app.use(cors());

const corsOptions = {
    origin: ["https://synkr-c5e5.onrender.com"],
    methods: "POST,GET,PUT,DELETE,PATCH,HEAD",
    credentials: true,
};

app.use(express.json());

app.use(cors(corsOptions)); 
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();  
});
