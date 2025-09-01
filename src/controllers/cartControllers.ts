import Cart from "../models/cart";
import CartItem from "../models/cartItem";
import Product from "../models/product";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { env } from "../config/env";
import { extractTokenAndDecode } from "../lib/utils";
// If exported, otherwise redefine

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

// Get user's cart
export const getCart = async (req: Request, res: Response) => {
  try {
    // Verify token
    const decoded = extractTokenAndDecode(req as Request);

    if (!decoded) {
      return res.status(401).json({
        message: "Not authorized to access this route",
      });
    }

    const userId = decoded.id; // Assuming user ID comes from auth middleware

    const cart = await Cart.findOne({ user: userId, isActive: true })
      .populate("items.product", "name price image")
      .exec();

    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        data: { items: [], totalAmount: 0 },
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart retrieved successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving cart",
    });
  }
};

// Add item to cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const decoded = extractTokenAndDecode(req as Request);

    if (!decoded) {
      return res.status(401).json({
        message: "Not authorized to access this route",
      });
    }

    const userId = decoded.id;
    const { productId, quantity = 1 } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (!product.isActive) {
      return res.status(400).json({
        success: false,
        message: "Product is not available",
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
        totalAmount: 0,
      });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update existing item quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      cart.items.push({
        product: productId,
        quantity,
        price: product.price,
      });
    }

    await cart.save(); // This will trigger the pre-save hook to calculate total

    // Populate and return updated cart
    const updatedCart = await Cart.findById(cart._id)
      .populate("items.product", "name price image")
      .exec();

    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding item to cart",
    });
  }
};

// Update cart item quantity
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const decoded = extractTokenAndDecode(req as Request);

    if (!decoded) {
      return res.status(401).json({
        message: "Not authorized to access this route",
      });
    }

    const userId = decoded.id;
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({ user: userId, isActive: true });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
      .populate("items.product", "name price image")
      .exec();

    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating cart item",
    });
  }
};
