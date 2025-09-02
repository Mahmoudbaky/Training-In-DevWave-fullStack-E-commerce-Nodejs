import express from "express";

import * as productControllers from "../controllers/productControllers.js";

export const router = express.Router();

/**
 * @openapi
 * /api/products/create:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15
 *               description:
 *                 type: string
 *                 example: Latest Apple smartphone with A17 chip
 *               price:
 *                 type: number
 *                 example: 1199.99
 *               category:
 *                 type: string
 *                 example: 64c8e8f1d3a2f1a2b3c4d5e6   # categoryId
 *               stock:
 *                 type: integer
 *                 example: 50
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: https://example.com/images/iphone15.png
 *               banner:
 *                 type: string
 *                 example: https://example.com/images/iphone15-banner.png
 *               deliveryDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-09-15T12:00:00Z
 *               stars:
 *                 type: integer
 *                 example: 4
 *               discount:
 *                 type: integer
 *                 example: 10
 *               saleRate:
 *                 type: integer
 *                 example: 1000
 *     responses:
 *       201:
 *         description: Product created successfully
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
 *                   example: Product created successfully
 *       400:
 *         description: Invalid product data
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
 *                   example: Invalid product data
 *                 errors:
 *                   type: object
 *                   description: Validation error details
 *       500:
 *         description: Internal server error
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
 *                   example: Internal server error
 */

router.post("/create", productControllers.createProduct);

/**
 * @openapi
 * /api/products/update/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro
 *               description:
 *                 type: string
 *                 example: Updated description for iPhone 15 Pro
 *               price:
 *                 type: number
 *                 example: 1299.99
 *               category:
 *                 type: string
 *                 example: 64c8e8f1d3a2f1a2b3c4d5e6   # categoryId
 *               stock:
 *                 type: integer
 *                 example: 40
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: https://example.com/images/iphone15-pro.png
 *               banner:
 *                 type: string
 *                 example: https://example.com/images/iphone15-banner.png
 *               deliveryDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-09-15T12:00:00Z
 *               stars:
 *                 type: integer
 *                 example: 4
 *               discount:
 *                 type: integer
 *                 example: 10
 *               saleRate:
 *                 type: integer
 *                 example: 1000
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *                   example: Product updated successfully
 *       400:
 *         description: Invalid product data
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
 *                   example: Invalid product data
 *                 errors:
 *                   type: object
 *                   description: Validation error details
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
 *         description: Internal server error
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
 *                   example: Internal server error
 */

router.put("/update/:id", productControllers.updateProduct);

/**
 * @openapi
 * /api/products/all:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 64c8e8f1d3a2f1a2b3c4d5e6
 *                       name:
 *                         type: string
 *                         example: iPhone 15
 *                       description:
 *                         type: string
 *                         example: Latest Apple smartphone with A17 chip
 *                       price:
 *                         type: number
 *                         example: 1199.99
 *                       category:
 *                         type: string
 *                         example: 64c8e8f1d3a2f1a2b3c4d5e6
 *                       stock:
 *                         type: integer
 *                         example: 50
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: https://example.com/images/iphone15.png
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal server error
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
 *                   example: Internal server error
 */

router.get("/all", productControllers.getAllProducts);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 product:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64c8e8f1d3a2f1a2b3c4d5e6
 *                     name:
 *                       type: string
 *                       example: iPhone 15
 *                     description:
 *                       type: string
 *                       example: Latest Apple smartphone with A17 chip
 *                     price:
 *                       type: number
 *                       example: 1199.99
 *                     category:
 *                       type: string
 *                       example: 64c8e8f1d3a2f1a2b3c4d5e6
 *                     stock:
 *                       type: integer
 *                       example: 50
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: https://example.com/images/iphone15.png
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
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
 *         description: Internal server error
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
 *                   example: Internal server error
 */

router.get("/:id", productControllers.getProductById);

export default router;
