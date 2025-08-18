import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
app.use(cors({
    origin: ['http://localhost:3000', 'https://linked-in-rouge.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  }));

// const corsOptions = {
//     origin: ['http://localhost:3000','https://linked-eg76llh87-astha-singhs-projects-23c6e7e7.vercel.app'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };

// Middleware
// app.use(cors(corsOptions));
app.use(express.json());
// app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));


// Routes
app.use(postRoutes);
app.use(userRoutes);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        app.listen(9090, () => {
            console.log("Server is running on port 9090");
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1); // Exit process on database connection failure
    }
};

start();

