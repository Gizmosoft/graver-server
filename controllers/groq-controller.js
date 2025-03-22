import { getChatResponse } from "../api/groq-textgen.js";
import { setResponse, setErrorResponse } from "./response-handler.js";

export const generatePostcardMessage = async (req, res) => {
  const prompt = req.body;

  if (!prompt) {
    return setErrorResponse("Invalid input: prompt must be a string.", res);
  }

  try {
    const response = await getChatResponse(prompt);
    setResponse(response, res);
  } catch (error) {
    console.error("Error generating AI response:", error);
    setErrorResponse(error, res);
  }
};
