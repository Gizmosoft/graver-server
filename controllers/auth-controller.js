import {
  setResponse,
  setErrorResponse,
  setTokenMissingResponse,
} from "./response-handler.js";
import { response } from "express";
import { googleAuthApi } from '../api/auth.js';

// Controller for Google Auth
export const googleAuth = async (request, response) => {
  const { token } = request.body;

  console.log('Token: ', {token});
  if (!token) {
    setTokenMissingResponse(response);
    return;
  }

  try {
    const user = await googleAuthApi({ token });
    if (user) {
        // Send a success response with user data
        setResponse(user, response);
      } else {
        // Handle cases where user could not be authenticated
        setErrorResponse({ message: "Invalid token or authentication failed" }, response);
      }
  } catch (error) {
    setErrorResponse(error, response);
  }
};
