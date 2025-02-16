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

// ✅ Allow only specific origins (replace with your frontend URL)
const allowedOrigins = [
  "https://synkr.vercel.app",
  "https://synkr-bvco4y30w-vaibhav-srivastavas-projects-02619579.vercel.app",
  "http://localhost:3000" // for local testing
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE",
  credentials: true, // ✅ Allows cookies and authentication headers
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();  
});
