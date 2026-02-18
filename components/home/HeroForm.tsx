"use client";
import { getUserLocation } from "@/action/geolocation";
import { useRouter } from "next/navigation";
import { useState, useTransition, FormEvent } from "react";
import { HeroFormSchema, HeroFormValues } from "@/lib/schemas";
import clsx from "clsx";

import {
  LuCalendar,
  LuLoader,
  LuLocate,
  LuMapPin,
  LuTimer,
  LuWallet,
} from "react-icons/lu";
import AppInput, { AppInputProps } from "../form/AppInput";
import FormButton from "../form/FormButton";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "../ui/multi-select";

export default function HeroForm() {
  const router = useRouter();
  const [locationName, setLocationName] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    travelDates: "",
    budget: "",
    tripDuration: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof HeroFormValues, string[]>>
  >({});
  const [isPending, startTransition] = useTransition();

  const handleCurrentLocation = () => {
    startTransition(async () => {
      try {
        const address = await getUserLocation();
        setLocationName(address);
      } catch (error) {
        console.error(error);
      }
    });
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof HeroFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    const values: HeroFormValues = {
      destination: locationName,
      travelDates: formData.travelDates,
      budget: formData.budget,
      tripDuration: formData.tripDuration,
      interests,
    };

    const validation = HeroFormSchema.safeParse(values);

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    if (values.destination) params.set("destination", values.destination);
    if (values.travelDates) params.set("travelDates", values.travelDates);
    if (values.budget) params.set("budget", values.budget);
    if (values.tripDuration) params.set("tripDuration", values.tripDuration);
    if (values.interests.length > 0)
      params.set("interests", values.interests.join(","));

    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[700px] mx-auto flex flex-col gap-4 justify-center mt-10 p-6 rounded-lg bg-white/10 dark:bg-slate-950/60 backdrop-blur-md border border-white/20 shadow"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <AppInput
          name="destination"
          placeholder="e.g. Tokyo, Japan"
          icon={<LuMapPin />}
          value={locationName}
          onChange={(val) => {
            setLocationName(val);
            if (errors.destination)
              setErrors((prev) => ({ ...prev, destination: undefined }));
          }}
          endIcon={
            isPending ? <LuLoader className="animate-spin" /> : <LuLocate />
          }
          onEndIconClick={handleCurrentLocation}
          error={errors.destination}
        />
        {formFields.map((field) => (
          <AppInput
            key={field.name}
            {...field}
            value={formData[field.name as keyof typeof formData]}
            onChange={(val) => handleInputChange(field.name, val)}
            error={errors[field.name as keyof HeroFormValues]}
          />
        ))}
        <div className="flex flex-col gap-1">
          <MultiSelect
            onValuesChange={(vals) => {
              setInterests(vals);
              if (errors.interests)
                setErrors((prev) => ({ ...prev, interests: undefined }));
            }}
            values={interests}
          >
            <MultiSelectTrigger
              className={clsx(
                "bg-neutral-100 dark:bg-slate-950 w-full border outline-slate-900 dark:outline-slate-200 text-gray-800 dark:text-slate-100 py-2.5 pe-3 rounded-md read-only:opacity-70",
                errors.interests
                  ? "border-red-500"
                  : "border-gray-300 dark:border-slate-800",
              )}
            >
              <MultiSelectValue
                overflowBehavior={"cutoff"}
                placeholder="Select interests"
              />
            </MultiSelectTrigger>
            <MultiSelectContent className="bg-gray-100 dark:bg-slate-900 border-transparent outline-transparent">
              <MultiSelectGroup className="text-gray-800 dark:text-slate-100 border-transparent">
                {interestList.map((interest) => (
                  <MultiSelectItem key={interest} value={interest}>
                    {interest}
                  </MultiSelectItem>
                ))}
              </MultiSelectGroup>
            </MultiSelectContent>
          </MultiSelect>
          {errors.interests && (
            <p className="text-red-500 text-xs">{errors.interests[0]}</p>
          )}
        </div>

        <FormButton type="submit" className="btn btn-primary rounded-md">
          Explore Options
        </FormButton>
      </div>
    </form>
  );
}

const formFields: AppInputProps[] = [
  {
    // title: "When?",
    name: "travelDates",
    placeholder: "Add dates",
    type: "date",
    icon: <LuCalendar />,
  },
  {
    // title: "Budget",
    name: "budget",
    placeholder: "$2,500",
    type: "number",
    icon: <LuWallet />,
  },
  {
    // title: "How Long?",
    name: "tripDuration",
    placeholder: "e.g. 7 days",
    type: "number",
    icon: <LuTimer />,
  },
];

const interestList = [
  "Nature",
  "History",
  "Culture",
  "Food",
  "Adventure",
  "Beach",
  "City",
];
