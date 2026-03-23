"use client";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import clsx from "clsx";
import { useState } from "react";
import { useAppActionState } from "@/hooks/useActionState";
import { $placesSearch } from "@/action/PlacesSearch";

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
  const [locationName, setLocationName] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    travelDates: "",
    budget: "",
    tripDuration: "",
  });

  const { isLocating, getLocation } = useCurrentLocation();

  const isPending = isLocating;

// 
// Removed handleInputChange unused error clearing part as useAppActionState does not sync to it easily, we rely on the state action
  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { action, submitting, state } = useAppActionState($placesSearch, {
    moreFields: {
      destination: locationName,
      interests: interests.length > 0 ? interests.join(",") : "",
      travelDates: formData.travelDates,
      budget: formData.budget,
      tripDuration: formData.tripDuration,
    }
  });

  return (
    <form
      action={action}
      className="max-w-[700px] mx-auto flex flex-col gap-4 justify-center mt-10 p-6 rounded-lg bg-white/10 dark:bg-slate-950/60 backdrop-blur-md border border-white/20 shadow"
    >
      {state.error && <p className="text-red-500 text-sm text-center">{state.error}</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <AppInput
          name="destination"
          placeholder="e.g. Tokyo, Japan"
          icon={<LuMapPin />}
          value={locationName}
          onChange={(val) => {
            setLocationName(val);
          }}
          endIcon={isPending ? <LuLoader className="animate-spin" /> : <LuLocate />}
          onEndIconClick={() => getLocation(setLocationName)}
        />
        {formFields.map((field) => (
          <AppInput
            key={field.name}
            {...field}
            value={formData[field.name as keyof typeof formData]}
            onChange={(val) => handleInputChange(field.name, val)}
          />
        ))}
        <div className="flex flex-col gap-1">
          <MultiSelect
            onValuesChange={(vals) => {
              setInterests(vals);
            }}
            values={interests}
          >
            <MultiSelectTrigger
              className={clsx(
                "bg-neutral-100 dark:bg-slate-950 w-full border outline-slate-900 dark:outline-slate-200 text-gray-800 dark:text-slate-100 py-2.5 pe-3 rounded-md read-only:opacity-70 border-gray-300 dark:border-slate-800"
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
        </div>

        <FormButton type="submit" className="btn btn-primary rounded-md" disabled={submitting}>
          {submitting ? "Searching..." : "Explore Options"}
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
