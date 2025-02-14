import { response } from "express";

export const setResponse = (data, response) => {
    console.log("Response Data:", data);
    response.status(200).json({
        success: true, // Indicates success
        data: data || null, // Data payload
        message: "Request processed successfully.", // Optional success message
    });
};

export const setErrorResponse = (error, response) => {
    console.error("Error:", error);
    response.status(500).json({
        success: false, // Indicates failure
        data: null, // No data for errors
        message: error.message || "An error occurred while processing your request.", // Error message
        code: "ServiceError", // Optional error code
    });
};

export const setTokenMissingResponse = (response) => {
    response.status(400).json({
        success: false, // Indicates failure
        data: null, // No data for token missing errors
        message: "Token is missing.", // Clear error message
        code: "BadRequest", // Error code for token missing
    });
};

export const setImageUploadErrorResponse = (response) => {
    response.status(400).json({
        success: false, // Indicates failure
        data: null, // No data for token missing errors
        message: "Error uploading image", // Clear error message
        code: "BadRequest", // Error code for token missing
    });
};

export const setFieldMissingResponse = (response) => {
    response.status(400).json({
      success: false, // Indicates failure
      data: null, // No data for token missing errors
      message: "All fields are required.", // Clear error message
      code: "BadRequest", // Error code for token missing
    });
}
