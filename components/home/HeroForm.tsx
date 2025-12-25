"use client";
import { getUserLocation } from "@/action/geolocation";
import { useState, useTransition } from "react";
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

import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useAppActionState } from "@/hooks/useActionState";
import { $placesSearch } from "@/action/PlacesSearch";
export default function HeroForm() {
  const [locationName, setLocationName] = useState("");
  const [isPending, startTransition] = useTransition();
  const { action, state } = useAppActionState($placesSearch);

  const [destination, setDestination] = useQueryState(
    "destination",
    parseAsString.withDefault("") // reuseable address
  );

  const [lat, setLat] = useQueryState("lat", {
    defaultValue: undefined as number | undefined,
    parse: (v) => (v == null || v === "" ? undefined : Number(v)),
    serialize: (v) => (v == null ? "" : String(v)),
  });

  const [lng, setLng] = useQueryState("lng", {
    defaultValue: undefined as number | undefined,
    parse: (v) => (v == null || v === "" ? undefined : Number(v)),
    serialize: (v) => (v == null ? "" : String(v)),
  });

  const [travelDates, setTravelDates] = useQueryState(
    "travelDates",
    parseAsString.withDefault("")
  );
  const [budget, setBudget] = useQueryState(
    "budget",
    parseAsString.withDefault("")
  );
  const [tripDuration, setTripDuration] = useQueryState(
    "tripDuration",
    parseAsInteger.withDefault(1)
  );

  // interests as comma list in URL
  const [interestsCsv, setInterestsCsv] = useQueryState(
    "interests",
    parseAsString.withDefault("")
  );

  // helper to read/write array
  const interestsArray = (interestsCsv || "").split(",").filter(Boolean);

  // handle "Use Current Location" button
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

  return (
    <form className="max-w-[700px] mx-auto flex flex-col gap-4 justify-center mt-10 p-6 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <AppInput
          name="destination"
          placeholder="e.g. Tokyo, Japan"
          icon={<LuMapPin />}
          value={locationName}
          onChange={setLocationName}
          endIcon={
            isPending ? <LuLoader className="animate-spin" /> : <LuLocate />
          }
          onEndIconClick={handleCurrentLocation}
        />
        {formFields.map((field) => (
          <AppInput key={field.name} {...field} />
        ))}
        <MultiSelect>
          <MultiSelectTrigger className="bg-neutral-100! w-full border border-gray-300! outline-slate-900! text-gray-800! py-2.5 pe-3 rounded-md read-only:opacity-70">
            <MultiSelectValue
              overflowBehavior={"cutoff"}
              placeholder="Select interests"
            />
          </MultiSelectTrigger>
          <MultiSelectContent className="bg-gray-100 border-transparent! outline-transparent">
            <MultiSelectGroup className="text-gray-800 border-transparent!">
              {interests.map((interest) => (
                <MultiSelectItem key={interest} value={interest}>
                  {interest}
                </MultiSelectItem>
              ))}
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>
        <input type="hidden" name="interests" value={interests.join(",")} />
        <FormButton className="btn btn-primary rounded-md">
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

const interests = [
  "Nature",
  "History",
  "Culture",
  "Food",
  "Adventure",
  "Beach",
  "City",
];
