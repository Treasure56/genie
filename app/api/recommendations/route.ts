import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { recommendationSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  try {
    const { destination, budget, tripDuration, interests } = await req.json();

    const result = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: recommendationSchema,
      prompt: `You are a travel expert. Generate a list of highly recommended, real places to visit for a trip to ${destination}.

Trip Duration: ${tripDuration} days.
Total Budget: $${budget} (approximate).
User's Interests: ${interests.join(", ")}.

IMPORTANT RULES:
- Return 6 to 10 distinct, real, well-known places that actually exist in or near ${destination}.
- Include actual famous landmarks, restaurants, parks, markets, and attractions specific to ${destination}.
- Each place MUST have accurate, precise latitude (lat) and longitude (lng) coordinates.
- Use a variety of place types based on the user's interests.
- estimatedCost should reflect local pricing.
- Do NOT return placeholder or fictional places.
- Make sure rating is realistic (between 3.5 and 5.0).
      `,
    });

    return NextResponse.json({ places: result.object.places });
  } catch (error) {
    console.error("AI Generation Error", error);
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 });
  }
}
