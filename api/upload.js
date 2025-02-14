import multer from "multer";
import cloudinary from "../configs/cloudinary.js";

// Multer configuration to temporarily store file in memory before uploading to Cloudinary
const storage = multer.memoryStorage();
export const upload = multer({ storage }); // ✅ Export Multer instance

// Service to upload received image to cloudinary and return a URL
export const cloudinaryUpload = async (image) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "postcards" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error); // ❌ Correctly reject the Promise if an error occurs
        } else {
          resolve(result.secure_url); // ✅ Correctly resolve the Promise with Cloudinary URL
        }
      }
    );

    uploadStream.end(image.buffer); // Send image data to Cloudinary
  });
};
