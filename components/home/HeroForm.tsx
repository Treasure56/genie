"use client";
import {
  LuCalendar,
  LuLoader,
  LuLocate,
  LuMapPin,
  LuTimer,
  LuWallet,
} from "react-icons/lu";
import AppInput, { AppInputProps } from "../form/AppInput";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "../ui/multi-select";
import FormButton from "../form/FormButton";
import { $PlacesSearch } from "@/action/PlacesSearch";
import { useAppActionState } from "@/hooks/useActionState";
import { FormMessage } from "../form/FormMessage";
import { useState, useTransition } from "react";
import { $getCurrentLocation } from "@/action/getCurrentLocation";

export default function HeroForm() {
  const { action, state } = useAppActionState($PlacesSearch);
  const [locationName, setLocationName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleCurrentLocation = () => {
    startTransition(async () => {
      if (navigator.geolocation) {
        const permissionStatus = await navigator.permissions.query({
          name: "geolocation",
        });

        if (
          permissionStatus.state === "granted" ||
          permissionStatus.state === "prompt"
        ) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { address, error } = await $getCurrentLocation(
                position.coords.latitude,
                position.coords.longitude
              );
              if (address) {
                setLocationName(address);
              } else if (error) {
                console.error(error);
              }
            },
            (error) => {
              console.error("Geolocation failed", error);
            }
          );
        } else if (permissionStatus.state === "denied") {
          console.error("Geolocation permission denied.");
        }
      } else {
        console.error("Browser doesn't support Geolocation");
      }
    });
  };

  return (
    <form
      action={action}
      className="max-w-[700px] mx-auto flex flex-col justify-center mt-10 p-6 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow"
    >
      <FormMessage res={state} />
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
