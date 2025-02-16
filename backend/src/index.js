import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.auth.js";
import { app, server } from "./lib/socket.js"; 
dotenv.config();
app.use(express.json());
app.use(cookieParser());
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

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
}).catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1); 
});
