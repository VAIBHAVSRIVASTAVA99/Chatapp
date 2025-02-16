import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.auth.js";
import {server } from "./lib/socket.js";
dotenv.config();
const app = express();  
app.use(cookieParser());

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(3000, () => {
  console.log("Nodejs is running on PORT:5000");
});
const PORT = 5001;
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
