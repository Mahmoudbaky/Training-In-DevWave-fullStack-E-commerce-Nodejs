import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import { authRoutes } from "./routes/index.js";
import { env } from "./config/env.js";
import cors from "cors";
import { setupSwagger } from "./config/swagger.js";

dotenv.config();
const app = express();

// CORS configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
    ];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Accept",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Headers",
    "x-uploadthing-package",
    "x-uploadthing-version",
    "traceparent",
    "user-agent",
    "b3",
    "referer",
    "sec-ch-ua",
    "sec-ch-ua-mobile",
    "sec-ch-ua-platform",
  ],
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Setup swagger
setupSwagger(app);
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Insurance Payments API is running" });
});

// Handle 404 - catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
  });
});

mongoose
  .connect(env.MONGODB_URI as string)
  .then(() => {
    app.listen(env.PORT, () => {
      console.log("Connected to MongoDB");
      console.log(`Server is running on port ${env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

export default app;
