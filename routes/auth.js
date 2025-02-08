import express from "express";
import * as authController from "../controllers/auth-controller.js";

const router = express.Router();

router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.loginUser);

export default router;