import express from "express";
import * as authController from "../controllers/authControllers.js";
export const router = express.Router();
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
export default router;
//# sourceMappingURL=authRoutes.js.map