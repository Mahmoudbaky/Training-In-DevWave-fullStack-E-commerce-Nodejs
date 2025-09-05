import mongoose from "mongoose";
import Category from "../models/category.js";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mahmoudsaleh3478y7:qDC4xfMnDZ5i3F3g@cluster0.xoowpfo.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=DevWaveEcommerce"
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

const categoriesToAdd = [
  { name: "Books", description: "Read and learn" },
  { name: "Home & Kitchen", description: "Essentials for your home" },
  { name: "Sports & Outdoors", description: "Gear for your adventures" },
  { name: "Toys & Games", description: "Fun for all ages" },
  { name: "Health & Personal Care", description: "Wellness products" },
  { name: "Automotive", description: "Car accessories and parts" },
  { name: "Garden & Outdoor", description: "Tools and decor for your garden" },
  { name: "Pet Supplies", description: "Everything for your pets" },
  { name: "Office Supplies", description: "Essentials for your workspace" },
  { name: "Baby Products", description: "Items for infants and toddlers" },
  { name: "Musical Instruments", description: "Instruments and accessories" },
];
const addCategories = async () => {
  try {
    await connectDB();
    for (const category of categoriesToAdd) {
      const newCategory = new Category(category);
      await newCategory.save();
    }
    console.log("Categories added successfully");
  } catch (err) {
    console.error("Error adding categories:", err);
  }
};

connectDB().then(addCategories);
