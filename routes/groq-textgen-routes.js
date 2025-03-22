import express from "express";
import * as groqController from '../controllers/groq-controller.js';

const router = express.Router();

router.route('/generate').post(groqController.generatePostcardMessage);

export default router;