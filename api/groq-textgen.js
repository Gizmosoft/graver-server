import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const getChatResponse = async (prompt) => {
    const promptPrefix = "Generate a postcard message for the following prompt and keep it strictly under 200 characters: ";
  const userPrompt =
    typeof prompt === "string" ? prompt : JSON.stringify(prompt);
    const finalPrompt = promptPrefix + userPrompt;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: finalPrompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    });

    let responseText = "";

    for await (const chunk of chatCompletion) {
      responseText += chunk.choices?.[0]?.delta?.content || "";
    }

    return responseText.replace(/[^a-zA-Z0-9\s.,!:'";]/g, '').trim();
  } catch (error) {
    console.error("Error fetching chat response:", error);
    return "Error: Unable to get response from Groq API.";
  }
};
