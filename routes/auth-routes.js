import express from "express";
import * as authController from '../controllers/auth-controller.js';

const router = express.Router();

// google auth routes
router.route("/google-login")
    .post(authController.googleAuth);

export default router;