"use server";

import { ActionResponse } from "@/types";
import { endpoints } from "@/utils/endpoints";
import { z } from "zod";

const schema = z.object({
  destination: z.string().min(1, "Destination is required"),
  travelDates: z.string().min(1, "Travel dates are required"),
  budget: z.string().min(1, "Budget is required"),
  tripDuration: z.string().min(1, "Trip duration is required"),
  interests: z.array(z.string()).min(1, "Interests are required"),
});

export async function $placesSearch(
  _: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  // Convert FormData → normal object for validation
  const validator = schema.safeParse({
    destination: formData.get("destination") || "",
    travelDates: formData.get("travelDates") || "",
    budget: formData.get("budget") || "",
    tripDuration: formData.get("tripDuration") || "",
    interests: formData.getAll("interests") || [],
  });

  if (!validator.success) {
    return { error: "Invalid form data" };
  }

  try {
    const res = await fetch(endpoints.placesSearch, {
      method: "POST",
      body: JSON.stringify(validator.data),
    });

    if (!res.ok) {
      return { error: "Google API request failed" };
    }

    const data = await res.json();
    console.log({ response: data });

    return {
      success: "Places search successful",
      data,
    };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while contacting Google API" };
  }
}
