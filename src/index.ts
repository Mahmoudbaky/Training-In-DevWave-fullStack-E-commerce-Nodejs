import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import { authRoutes } from "./router/index.js";
import { env } from "./config/env.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

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
