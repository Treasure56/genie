import { z } from "zod";

export const HeroFormSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  travelDates: z.string().min(1, "Travel dates are required"),
  budget: z.string().min(1, "Budget is required"),
  tripDuration: z.string().min(1, "Trip duration is required"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
});

export type HeroFormValues = z.infer<typeof HeroFormSchema>;
