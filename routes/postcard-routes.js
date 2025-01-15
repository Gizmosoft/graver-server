import express from "express";
import * as postcardController from "../controllers/postcard-controller.js";
import { upload } from "../api/upload.js";

const router = express.Router();

// Route to create a postcard
router.route("/create")
    .post(upload.single("image"), postcardController.createPostcard);

// Get all postcards created by the logged-in user
router.route("/all/:creatorId")
    .get(postcardController.getPostcardsByCreator);

// Get one postcard by postcard ID
router.route("/:postcardId")
    .get(postcardController.getPostcardByCardId);

// Remove one postcard by ID
router.route("/delete/:postcardId")
    .delete(postcardController.deletePostcardById);

export default router;
