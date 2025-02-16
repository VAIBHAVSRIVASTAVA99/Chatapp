import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.auth.js";
import {server } from "./lib/socket.js";
app=express();
app.use(cookieParser());
dotenv.config();
app.use(express.json());
app.use(cors());

const corsOptions = {
  origin: "https://synkr.vercel.app",
  methods: "GET, POST, PUT, DELETE",
  credentials: true, 
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


const PORT = 5001;
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
