import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.auth.js";
import { app, server } from "./lib/socket.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

export const corsOptions = {
  origin: "https://synkr.vercel.app",
  methods: "GET, POST, PUT, DELETE",
  credentials: true 
};

app.use(cors(corsOptions));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


const PORT = 5001;
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
