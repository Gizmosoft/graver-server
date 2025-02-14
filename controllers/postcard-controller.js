import {
  setResponse,
  setErrorResponse,
  setFieldMissingResponse,
  setImageUploadErrorResponse,
} from "./response-handler.js";
import {
  createPostcardLogic,
  deleteOnePostcard,
  fetchOnePostcard,
  fetchPostcards,
} from "../api/card.js";
import { cloudinaryUpload } from "../api/upload.js";

export const createPostcard = async (req, res) => {
  const { text, creator } = req.body;

  if (!req.file || !text || !creator) {
    setFieldMissingResponse(res);
    return;
  }

  // Upload image to Cloudinary
  const cloudinaryResponse = await cloudinaryUpload(req.file);

  if (cloudinaryResponse === "error") {
    setImageUploadErrorResponse(res);
    return;
  }

  try {
    // // Normalize the file path to use forward slashes
    // let imagePath;
    // // Check if `req.body.image` exists and normalize it
    // if (req.body.image) {
    //   imagePath = req.body.image.replace(/\\/g, "/");
    // } else if (req.file && req.file.path) {
    //   console.log(req.file.path);
    //   // Otherwise, check if `req.file.path` exists and normalize it
    //   imagePath = req.file.path.replace(/\\/g, "/");
    // } else {
    //   throw new Error("Image path is missing."); // Handle the case where no image is provided
    // }

    // Call the core logic to create the postcard in MongoDB
    const postcard = await createPostcardLogic({
      image: cloudinaryResponse,
      text,
      creator,
    });

    // Send a success response
    setResponse(postcard, res);
  } catch (error) {
    console.error("Error creating postcard:", error);
    setErrorResponse(error, res);
  }
};

// Controller to fetch postcards by the creator ID
export const getPostcardsByCreator = async (req, res) => {
  const { creatorId } = req.params;

  try {
    const postcards = await fetchPostcards({ creatorId });
    setResponse(postcards, res);
  } catch (error) {
    console.error("Error fetching postcards:", error);
    setErrorResponse(error, res);
  }
};

// Controller to fetch one postcard by its ID
export const getPostcardByCardId = async (req, res) => {
  const { postcardId } = req.params;

  try {
    const postcard = await fetchOnePostcard({ postcardId });
    setResponse(postcard, res);
  } catch (error) {
    console.error("Error fetching postcard:", error);
    setErrorResponse(error, res);
  }
};

// Controller to delete a postcard by ID
export const deletePostcardById = async (req, res) => {
  const { postcardId } = req.params;

  try {
    const removedPostcard = await deleteOnePostcard({ postcardId });
    setResponse(removedPostcard, res);
  } catch (error) {
    console.error("Error deleting postcard:", error);
    setErrorResponse(error, res);
  }
};
