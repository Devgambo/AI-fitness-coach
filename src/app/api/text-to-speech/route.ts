import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { success: false, error: "No text provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "ElevenLabs API key not configured" },
        { status: 500 }
      );
    }

    // Use ElevenLabs API - voice ID for a default voice
    const voiceId = "21m00Tcm4TlvDq8ikWAM"; // Rachel voice

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text: text.substring(0, 500), // Limit text length
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      }
    );

    if (!response.ok) {
      // Try to extract detailed error message from ElevenLabs API
      let errorMessage = "Failed to generate speech";
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail?.message || 
                      errorData.detail || 
                      errorData.error?.message ||
                      errorData.message ||
                      `ElevenLabs API error: ${response.status} ${response.statusText}`;
      } catch {
        errorMessage = `ElevenLabs API error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error: any) {
    console.error("Error generating speech:", error);
    
    const errorMsg = error.message || "";
    
    // Detect free tier/quota errors and provide cleaner messages
    const isQuotaError = 
      errorMsg.includes("Free Tier") ||
      errorMsg.includes("free tier") ||
      errorMsg.includes("quota") ||
      errorMsg.includes("rate limit") ||
      errorMsg.includes("subscription") ||
      errorMsg.includes("abuse");
    
    const userFriendlyMessage = isQuotaError
      ? "Text-to-speech requires an ElevenLabs paid subscription. Free tier access is currently unavailable."
      : errorMsg || "Failed to generate speech";
    
    return NextResponse.json(
      { success: false, error: userFriendlyMessage },
      { status: 500 }
    );
  }
}
