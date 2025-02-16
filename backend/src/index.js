import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.auth.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = 5001|| process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["synkr.vercel.app"],
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
