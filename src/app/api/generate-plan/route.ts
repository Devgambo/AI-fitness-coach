import { NextRequest, NextResponse } from "next/server";
import { GeneratePlanRequest, FitnessPlan } from "@/types";
import { generateWithGemini } from "@/lib/ai/gemini";


export async function POST(request: NextRequest) {

  try {
    const { userDetails }: GeneratePlanRequest = await request.json();
    if (!userDetails || !userDetails.name) {
      return NextResponse.json(
        { success: false, error: "Invalid user details" },
        { status: 400 }
      );
    }

    console.log("User De----->>",userDetails);
    const plan: FitnessPlan = await generateWithGemini(userDetails);
    return NextResponse.json({ success: true, data: plan });

  } catch (error: any) {
    console.error("Error generating plan:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate plan" },
      { status: 500 }
    );
  }
}
