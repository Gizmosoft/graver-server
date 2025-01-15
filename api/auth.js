import express from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuthApi = async ({token}) => {
  try {
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Specify the Client ID
    });

    // Get user profile information from the verified token
    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    // Check if the user already exists in the database
    let user = await User.findOne({ id: sub });
    if (!user) {
      // If the user doesn't exist, create a new document
      user = await User.create({ id: sub, email, name, picture });
      console.log("New user created:", user);
    } else {
      console.log("User already exists:", user);
    }
    return user;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Invalid token or authentication failed");
  }
};
