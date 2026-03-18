import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

const placeSchema = z.object({
  name: z.string().describe("Name of the place carefully selected from Google Maps (must be a real searchable place name)"),
  description: z.string().describe("A short description of why this place matches the traveler's interests"),
  estimatedCost: z.string().describe("The estimated cost associated with visiting (e.g., $15, Free)"),
  vicinity: z.string().describe("The general area or short address of the place (e.g., 'Shibuya, Tokyo')"),
  rating: z.number().describe("The estimated rating for the place out of 5.0 (e.g., 4.5)"),
  price_level: z.number().describe("The price level from 0 (Free) to 4 (Very Expensive)"),
});

export async function POST(req: NextRequest) {
  try {
    const { destination, budget, tripDuration, interests } = await req.json();

    const result = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: z.object({
        places: z.array(placeSchema).describe("List of recommended places to visit"),
      }),
      prompt: `Generate an itinerary and list of places for a trip to ${destination}.
        Trip Duration: ${tripDuration} days.
        Total Budget: $${budget}.
        User's Interests: ${interests.join(", ")}.

        Ensure that the recommendations are realistic, actually exist on Google Maps, and fit reasonably within the budget. Try to provide around 6 to 10 distinct places that could form an interesting route.
      `,
    });

    return NextResponse.json({ places: result.object.places });
  } catch (error) {
    console.error("AI Generation Error", error);
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 });
  }
}
