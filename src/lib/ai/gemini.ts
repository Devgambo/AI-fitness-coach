import { UserDetails, FitnessPlan } from "@/types"; // Assuming these types are defined elsewhere
import { generatePrompt } from "./prompt"; // Assuming this function is defined elsewhere
import {
  GoogleGenAI
} from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`
// as shown in your example.
const ai = new GoogleGenAI({});

/**
 * Generates a fitness plan using the Gemini AI model.
 * @param userDetails The user's details to create the plan from.
 * @returns A promise that resolves to a FitnessPlan object.
 */
export async function generateWithGemini(
  userDetails: UserDetails
): Promise<FitnessPlan> {
  // 1. Generate the specific prompt text
  const userPrompt = generatePrompt(userDetails);
  const fullPrompt = `${userPrompt}\n\nProvide the response as a valid JSON object only, without any markdown formatting.`;

  try {
    // 3. Call the model using the one-shot method
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ parts: [{ text: fullPrompt }] }],
      config: {
        systemInstruction:"You are an expert fitness coach. Respond with valid JSON only.",
        temperature: 0.7,
        maxOutputTokens: 16384 // Increased to prevent truncation for detailed fitness plans
      }
    });

    // 4. Process the response
    console.log("result:::::", result);
    
    // Check if response was truncated
    if (result.candidates?.[0]?.finishReason === 'MAX_TOKENS') {
      throw new Error("Response was truncated due to token limit. Please try again.");
    }
    
    const content = result.text;

    if (!content) {
      throw new Error("Received an empty response from the model.");
    }

    // 5. Clean up the response (same logic as your original file)
    let cleanContent = content.trim();
    if (cleanContent.startsWith("```json")) {
      cleanContent = cleanContent.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    }
    
    // Remove any trailing markdown or incomplete JSON
    if (cleanContent.endsWith("```")) {
      cleanContent = cleanContent.slice(0, -3).trim();
    }

    const plan = JSON.parse(cleanContent);

    return plan;
  } catch (error) {
    console.error("Failed to generate plan with Gemini:", error);
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to generate plan with Gemini");
    }
    throw new Error("An unknown error occurred while generating the fitness plan.");
  }
}


