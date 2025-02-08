import express from "express";
import * as authController from "../controllers/auth-controller.js";

const router = express.Router();

// Route for user registration
router.route("/register").post(authController.registerUser);

export default router;
