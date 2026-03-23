import { z } from "zod";

export const placeSchema = z.object({
  name: z.string().describe("Name of the place carefully selected from Google Maps (must be a real searchable place name)"),
  description: z.string().describe("A short description of why this place matches the traveler's interests"),
  estimatedCost: z.string().describe("The estimated cost associated with visiting (e.g., $15, Free)"),
  vicinity: z.string().describe("The general area or short address of the place (e.g., 'Shibuya, Tokyo')"),
  rating: z.number().describe("The estimated rating for the place out of 5.0 (e.g., 4.5)"),
  price_level: z.number().describe("The price level from 0 (Free) to 4 (Very Expensive)"),
});

export const recommendationSchema = z.object({
  places: z.array(placeSchema).describe("List of recommended places to visit"),
});
