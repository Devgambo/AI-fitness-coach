import { NextRequest, NextResponse } from "next/server";

// Helper function to poll task status
async function pollTaskStatus(apiKey: string, taskId: string, maxAttempts: number = 30): Promise<string | null> {
  const statusUrl = `https://api.freepik.com/v1/ai/text-to-image/imagen3/${taskId}`;
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await fetch(statusUrl, {
        method: "GET",
        headers: {
          "x-freepik-api-key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.statusText}`);
      }

      const result = await response.json();
      const status = result.data?.status;
      const generated = result.data?.generated;

      if (status === "COMPLETED" && generated && generated.length > 0) {
        return generated[0]; // Return first image URL
      }

      if (status === "FAILED" || status === "ERROR") {
        throw new Error("Image generation failed");
      }

      // Wait 2 seconds before next poll
      if (attempt < maxAttempts - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error: any) {
      if (error.message.includes("failed") || error.message.includes("ERROR")) {
        throw error;
      }
      // Continue polling on other errors
      if (attempt < maxAttempts - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }

  throw new Error("Image generation timed out");
}

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

    const apiKey = process.env.FREEPIK_API_KEY;

    if (!apiKey) {
      throw new Error("FREEPIK_API_KEY not found in environment variables");
    }

    // Create a detailed prompt based on type
    const enhancedPrompt =
      type === "exercise"
        ? `A photorealistic close-up photograph of a person performing ${prompt} exercise in a gym, professional fitness photography, proper form demonstration, well-lit with natural lighting, captured with a professional camera, emphasizing muscle engagement and correct posture. High resolution, 16:9 aspect ratio.`
        : `A high-resolution, studio-lit product photograph of ${prompt}, professional food styling, appetizing presentation, well-plated on elegant dishware, restaurant quality, sharp focus on textures and colors, natural lighting to enhance appeal. Ultra-realistic, 16:9 aspect ratio.`;

    // Call Freepik Imagen 3 API
    const apiUrl = "https://api.freepik.com/v1/ai/text-to-image/imagen3";
    
    // Map aspect ratio: 16:9 is closest to widescreen_16_9
    const aspectRatio = type === "exercise" ? "widescreen_16_9" : "widescreen_16_9";
    
    // Build payload with required fields
    // Note: styling object may cause validation errors if values are invalid
    // Keeping it minimal first - can add styling back once we confirm valid values
    const payload = {
      prompt: enhancedPrompt,
      num_images: 1,
      aspect_ratio: aspectRatio,
      person_generation: type === "exercise" ? "allow_all" : "dont_allow",
      safety_settings: "block_low_and_above"
    };
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-freepik-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: response.statusText }));
      console.error("Freepik API Error Response:", JSON.stringify(errorData, null, 2));
      // Extract error message from various possible response structures
      const errorMessage = errorData.error?.message || 
                          errorData.error?.detail || 
                          errorData.error || 
                          errorData.message ||
                          JSON.stringify(errorData) ||
                          response.statusText;
      throw new Error(errorMessage);
    }

    const result = await response.json();
    const taskId = result.data?.task_id;
    const status = result.data?.status;
    const generated = result.data?.generated;

    // Check if images are already available
    if (status === "COMPLETED" && generated && generated.length > 0) {
      return NextResponse.json({ success: true, imageUrl: generated[0] });
    }

    // If task is in progress, poll for completion
    if (taskId && (status === "IN_PROGRESS" || status === "CREATED")) {
      const imageUrl = await pollTaskStatus(apiKey, taskId);
      if (imageUrl) {
        return NextResponse.json({ success: true, imageUrl });
      }
    }

    throw new Error("Invalid Freepik API response structure");

  } catch (error: any) {
    console.error("Error generating image with Freepik:", error);

    // Check if it's a quota/rate limit/credit/billing error
    const errorMsg = error.message || "";
    const isQuotaError = 
      errorMsg.includes("quota") || 
      errorMsg.includes("rate limit") ||
      errorMsg.includes("throttled") ||
      errorMsg.includes("insufficient credit") ||
      errorMsg.includes("billing") ||
      errorMsg.includes("unauthorized") ||
      errorMsg.includes("authentication") ||
      errorMsg.includes("403") ||
      errorMsg.includes("401");

    // Return placeholder on error with appropriate message
    const placeholderText = isQuotaError
      ? "API+Limit+Reached"
      : "Image+Unavailable";

    const placeholderUrl = `https://via.placeholder.com/1344x768/${type === "exercise" ? "3498db" : "e67e22"}/ffffff?text=${placeholderText}`;

    return NextResponse.json({
      success: true,
      imageUrl: placeholderUrl,
      warning: isQuotaError 
        ? "Image generation requires a valid Freepik API key. Please check your API credentials." 
        : "Image generation failed. Using placeholder image.",
    });
  }
}
