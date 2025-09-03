import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import * as feedbackControllers from "../controllers/feedBackControllers.js";

export const router = express.Router();

/**
 * @openapi
 * /api/feedback/create:
 *   post:
 *     summary: Create product feedback
 *     description: Allows an authenticated user to leave feedback on a product.
 *     tags:
 *       - Feedback
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
 *               - rating
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product being reviewed
 *                 example: "64a2f8d1b23e5a7c8f9a1234"
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Rating score between 1 and 5
 *                 example: 4
 *               comment:
 *                 type: string
 *                 description: Optional feedback comment
 *                 example: "Great product, really satisfied with the quality!"
 *     responses:
 *       201:
 *         description: Feedback created successfully
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
 *                   example: Feedback created successfully
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       500:
 *         description: Error creating feedback
 */

router.post(
  "/create",
  protect,
  authorize("user", "admin"),
  feedbackControllers.createFeedback
);

/**
 * @openapi
 * /api/feedback/update:
 *   put:
 *     summary: Update product feedback
 *     description: Allows an authenticated user to update their feedback on a product.
 *     tags:
 *       - Feedback
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
 *               - rating
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product being reviewed
 *                 example: "64a2f8d1b23e5a7c8f9a1234"
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Updated rating score between 1 and 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 description: Updated feedback comment (optional)
 *                 example: "After using for 2 weeks, I can confirm it's excellent!"
 *     responses:
 *       200:
 *         description: Feedback updated successfully
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
 *                   example: Feedback updated successfully
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       404:
 *         description: Feedback not found
 *       500:
 *         description: Error updating feedback
 */

router.put(
  "/update",
  protect,
  authorize("user", "admin"),
  feedbackControllers.updateFeedback
);

/**
 * @openapi
 * /api/feedback/user-product-feedback:
 *   post:
 *     summary: Get user feedback for a specific product
 *     description: Retrieves the authenticated user's feedback for a given product.
 *     tags:
 *       - Feedback
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
 *                 description: ID of the product to fetch feedback for
 *                 example: "64a2f8d1b23e5a7c8f9a1234"
 *     responses:
 *       200:
 *         description: User's feedback retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 feedback:
 *                   $ref: '#/components/schemas/Feedback'
 *       401:
 *         description: Unauthorized, missing or invalid token
 *       404:
 *         description: Feedback not found
 *       500:
 *         description: Error fetching feedback
 */

router.get(
  "/user-product-feedback",
  protect,
  authorize("user", "admin"),
  feedbackControllers.getUserFeedbackForProduct
);

/**
 * @openapi
 * /api/feedback/product-feedback-stats:
 *   post:
 *     summary: Get detailed feedback statistics for a product
 *     description: Returns the average rating, total reviews, and count of each star rating (1–5) for a given product.
 *     tags:
 *       - Feedback
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
 *                 description: ID of the product
 *                 example: "64a2f8d1b23e5a7c8f9a1234"
 *     responses:
 *       200:
 *         description: Feedback stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 stats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Product ID
 *                         example: "64a2f8d1b23e5a7c8f9a1234"
 *                       averageRating:
 *                         type: number
 *                         example: 4.2
 *                       totalReviews:
 *                         type: integer
 *                         example: 120
 *                       oneStar:
 *                         type: integer
 *                         example: 5
 *                       twoStar:
 *                         type: integer
 *                         example: 8
 *                       threeStar:
 *                         type: integer
 *                         example: 20
 *                       fourStar:
 *                         type: integer
 *                         example: 40
 *                       fiveStar:
 *                         type: integer
 *                         example: 47
 *       500:
 *         description: Error fetching feedback stats
 */

router.get(
  "/product-feedback-stats",
  protect,
  authorize("user", "admin"),
  feedbackControllers.feedbackStatsForProduct
);
export default router;
