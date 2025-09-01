import Cart from "../models/cart";
import CartItem from "../models/cartItem";
import { Request, Response } from "express";

// Get user's cart
export const getCart = async (req: Request, res: Response) => {
  //   try {
  //     // const userId = req.user?.id; // Assuming user ID comes from auth middleware
  //     const cart = await Cart.findOne({ user: userId, isActive: true })
  //       .populate("items.product", "name price image")
  //       .exec();
  //     if (!cart) {
  //       return res.status(200).json({
  //         success: true,
  //         message: "Cart is empty",
  //         data: { items: [], totalAmount: 0 },
  //       });
  //     }
  //     res.status(200).json({
  //       success: true,
  //       message: "Cart retrieved successfully",
  //       data: cart,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: "Error retrieving cart",
  //       error: error.message,
  //     });
  //   }
};
