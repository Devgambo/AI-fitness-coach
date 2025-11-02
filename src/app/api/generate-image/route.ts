import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let type = "exercise"; // Default type for placeholder

  try {
    const body = await request.json();
    const { prompt } = body;
    type = body.type || "exercise";

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "No prompt provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not found in environment variables");
    }

    // Create a detailed prompt based on type
    const enhancedPrompt =
      type === "exercise"
        ? `A photorealistic close-up photograph of a person performing ${prompt} exercise in a gym, professional fitness photography, proper form demonstration, well-lit with natural lighting, captured with a professional camera, emphasizing muscle engagement and correct posture. High resolution, 16:9 aspect ratio.`
        : `A high-resolution, studio-lit product photograph of ${prompt}, professional food styling, appetizing presentation, well-plated on elegant dishware, restaurant quality, sharp focus on textures and colors, natural lighting to enhance appeal. Ultra-realistic, 16:9 aspect ratio.`;

    // Call Google Imagen 3.0 API
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
    
    const payload = {
      instances: [{ prompt: enhancedPrompt }],
      parameters: { sampleCount: 1 }
    };
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      // Extract error message from various possible response structures
      const errorMessage = errorData.error?.message || 
                          errorData.error?.detail || 
                          errorData.error || 
                          errorData.message ||
                          response.statusText;
      throw new Error(errorMessage);
    }

    const result = await response.json();

    // Extract image data from Imagen API response
    if (result.predictions && result.predictions[0]?.bytesBase64Encoded) {
      const imageUrl = `data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`;
      return NextResponse.json({ success: true, imageUrl });
    }

    throw new Error("Invalid Imagen response structure");

  } catch (error: any) {
    console.error("Error generating image with Imagen:", error);

    // Check if it's a quota/rate limit/credit/billing error
    const errorMsg = error.message || "";
    const isQuotaError = 
      errorMsg.includes("quota") || 
      errorMsg.includes("rate limit") ||
      errorMsg.includes("throttled") ||
      errorMsg.includes("insufficient credit") ||
      errorMsg.includes("billing") ||
      errorMsg.includes("billed users") ||
      errorMsg.includes("RESOURCE_EXHAUSTED") ||
      errorMsg.includes("PERMISSION_DENIED") ||
      errorMsg.includes("only accessible");

    // Return placeholder on error with appropriate message
    const placeholderText = isQuotaError
      ? "API+Limit+Reached"
      : "Image+Unavailable";

    const placeholderUrl = `https://via.placeholder.com/1344x768/${type === "exercise" ? "3498db" : "e67e22"}/ffffff?text=${placeholderText}`;

    return NextResponse.json({
      success: true,
      imageUrl: placeholderUrl,
      warning: isQuotaError 
        ? "Image generation requires a paid Google Cloud account with billing enabled. Please set up billing to use this feature." 
        : "Image generation failed. Using placeholder image.",
    });
  }
}
