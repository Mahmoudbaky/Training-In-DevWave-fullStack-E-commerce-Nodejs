import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import * as categoryControllers from "../controllers/categoryControllers.js";

export const router = express.Router();

/**
 * @openapi
 * /api/categories/create:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 example: All electronic devices and gadgets
 *     responses:
 *       201:
 *         description: Category created successfully
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
 *                   example: Category created successfully
 *                 category:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64c8e8f1d3a2f1a2b3c4d5e6
 *                     name:
 *                       type: string
 *                       example: Electronics
 *                     description:
 *                       type: string
 *                       example: All electronic devices and gadgets
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid category data
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
 *                   example: Invalid category data
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

router.post(
  "/create",
  protect,
  authorize("admin"),
  categoryControllers.createCategory
);

/**
 * @openapi
 * /api/categories/update/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Electronics
 *               description:
 *                 type: string
 *                 example: Updated description for electronics category
 *     responses:
 *       200:
 *         description: Category updated successfully
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
 *                   example: Category updated successfully
 *                 category:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64c8e8f1d3a2f1a2b3c4d5e6
 *                     name:
 *                       type: string
 *                       example: Updated Electronics
 *                     description:
 *                       type: string
 *                       example: Updated description for electronics category
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid category data
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
 *                   example: Invalid category data
 *                 errors:
 *                   type: object
 *                   description: Validation error details
 *       404:
 *         description: Category not found
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
 *                   example: Category not found
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

router.put(
  "/update/:id",
  protect,
  authorize("admin"),
  categoryControllers.updateCategory
);

/**
 * @openapi
 * /api/categories/all-categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 64c8e8f1d3a2f1a2b3c4d5e6
 *                       name:
 *                         type: string
 *                         example: Electronics
 *                       description:
 *                         type: string
 *                         example: All electronic devices and gadgets
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

router.get(
  "/all-categories",
  protect,
  authorize("user", "admin"),
  categoryControllers.getAllCategories
);

export default router;
