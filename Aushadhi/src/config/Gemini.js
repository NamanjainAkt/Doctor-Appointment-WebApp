import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
console.log("API Key available:", !!apiKey); // Log if API key is available (without showing the key)

if (!apiKey) {
  console.error("API key is missing! Make sure VITE_GEMINI_API_KEY is set in your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function run(prompt) {
  console.log("Sending prompt to Gemini API:", prompt);
  
  if (!apiKey) {
    return "Error: API key is missing. Please add your Gemini API key to the .env file.";
  }
  
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    console.log("Chat session created, sending message...");
    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();
    console.log("Response received:", responseText.substring(0, 100) + "...");
    return responseText;
  } catch (error) {
    console.error("Error in Gemini API:", error);
    console.error("Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return "Error: " + error.message;
  }
}

export default {
  run,
  model,
  generationConfig
};
