// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";
// import postRoutes from "./routes/posts.routes.js";
// import userRoutes from "./routes/user.routes.js";

// dotenv.config();

// const app = express();

// // Allowed Origins
// const allowedOrigins = [
//     "https://linked-in-rouge.vercel.app",
//     "http://localhost:3000",
// ];

// // CORS Middleware
// app.use((req, res, next) => {
//     const origin = req.headers.origin;
    
//     if (allowedOrigins.includes(origin)) {
//         res.setHeader("Access-Control-Allow-Origin", origin);
//         res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
//         res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//         res.setHeader("Access-Control-Allow-Credentials", "true");
//     } else {
//         console.log(`❌ Blocked CORS Request from: ${origin}`);
//     }

//     if (req.method === "OPTIONS") {
//         return res.status(200).end();
//     }

//     next();
// });

// // Middleware
// app.use(express.json());
// app.use(express.static("uploads"));

// // Routes
// app.use(postRoutes);
// app.use(userRoutes);

// // Database Connection
// const start = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log("✅ Connected to MongoDB");

//         app.listen(9090, () => {
//             console.log("🚀 Server running on port 9090");
//         });
//     } catch (err) {
//         console.error("❌ Failed to connect to MongoDB:", err.message);
//         process.exit(1);
//     }
// };

// start();




// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";
// import postRoutes from "./routes/posts.routes.js";
// import userRoutes from "./routes/user.routes.js";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use(postRoutes);
// app.use(userRoutes);
// app.use(express.static("uploads"))


// const start = async () => {
//     const connectDB = await mongoose.connect("mongodb+srv://asthas418:rBfLWNtuanOwcYfX@cluster0.rnjde.mongodb.net/");
    
//     app.listen(9090, () => {
//         console.log("server is running on port 9090");
//     })
// }

// start();



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

