import express from "express";
import { protect, authorize } from "../middleware/auth.js";

import * as cartController from "../controllers/cartControllers.js";

export const router = express.Router();

router.get(
  "/get-cart",
  protect,
  authorize("user", "admin"),
  cartController.getCart
);

/**
 * @openapi
 * /api/cart/add-to-cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64c8e8f1d3a2f1a2b3c4d5e6
 *               quantity:
 *                 type: integer
 *                 example: 2
 *                 default: 1
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Item added to cart successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64c9a9f2d3a2f1a2b3c4d5f7
 *                     user:
 *                       type: string
 *                       example: 64c7a7f1d3a2f1a2b3c4d5e8
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: 64c8e8f1d3a2f1a2b3c4d5e6
 *                               name:
 *                                 type: string
 *                                 example: iPhone 15
 *                               price:
 *                                 type: number
 *                                 example: 1199.99
 *                               image:
 *                                 type: string
 *                                 example: https://example.com/images/iphone15.png
 *                           quantity:
 *                             type: integer
 *                             example: 2
 *                           price:
 *                             type: number
 *                             example: 1199.99
 *                     totalAmount:
 *                       type: number
 *                       example: 2399.98
 *       400:
 *         description: Product is not available
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Product is not available
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not authorized to access this route
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Product not found
 *       500:
 *         description: Error adding item to cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error adding item to cart
 */

router.post(
  "/add-to-cart",
  protect,
  authorize("user", "admin"),
  cartController.addToCart
);

export default router;
