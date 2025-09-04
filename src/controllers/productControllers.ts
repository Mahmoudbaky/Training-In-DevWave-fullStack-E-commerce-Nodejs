import Product from "../models/product.js";
import { Request, Response } from "express";
import { createProductValidationSchema } from "../lib/validators.js";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const validationResponse = createProductValidationSchema.safeParse(
      req.body
    );

    if (!validationResponse.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid product data",
        errors: validationResponse.error,
      });
    }

    await Product.create(validationResponse.data);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validationResponse = createProductValidationSchema.safeParse(
      req.body
    );

    if (!validationResponse.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid product data",
        errors: validationResponse.error,
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      validationResponse.data,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    res.status(200).json({
      success: true,
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const filterProducts = async (req: Request, res: Response) => {
  try {
    const {
      category,
      brand,
      minPrice,
      maxPrice,
      stars,
      page = 1,
      limit = 10,
    } = req.query;

    const filters: any = {};

    if (category) filters.category = category;
    if (brand) filters.brand = brand;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }
    if (stars) filters.stars = { $gte: Number(stars) };

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(filters)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filters);

    res.status(200).json({
      success: true,
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

export const getBrands = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().select("brand -_id");
    const brands = products.map((product) => product.brand);

    res.status(200).json({
      success: true,
      brands: Array.from(new Set(brands)), // Unique brands
    });
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};
