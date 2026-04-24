"use client";

import {
  LuCalendar,
  LuMapPin,
  LuSearch,
  LuTimer,
  LuWallet,
  LuLoader,
} from "react-icons/lu";
import FormButton from "@/components/form/FormButton";
import AppInput from "@/components/form/AppInput";
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
} from "@/components/ui/multi-select";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { TripValues } from "@/lib/schemas";

interface FormsProps {
  defaultValues?: Partial<TripValues>;
}

export default function Forms({ defaultValues = {} }: FormsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    destination: defaultValues.destination ?? "",
    travelDates: defaultValues.travelDates ?? "",
    budget: defaultValues.budget ?? "",
    tripDuration: defaultValues.tripDuration ?? "",
  });
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    defaultValues.interests ?? []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (formData.destination) params.set("destination", formData.destination);
    if (formData.travelDates) params.set("travelDates", formData.travelDates);
    if (formData.budget) params.set("budget", formData.budget);
    if (formData.tripDuration) params.set("tripDuration", formData.tripDuration);
    if (selectedInterests.length > 0) params.set("interests", selectedInterests.join(","));

    startTransition(() => {
      router.push(`/search?${params.toString()}`);
    });
  };

  return (
    <div className="app-container flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-950 rounded-xl border border-gray-100 dark:border-slate-800 p-2 flex flex-col md:flex-row items-center gap-2 w-full max-w-6xl transition-colors shadow-sm"
      >
        <div className="w-full md:w-[28%] relative group">
          <AppInput
            name="destination"
            placeholder="Where to?"
            icon={<LuMapPin className="text-violet-500 text-lg" />}
            value={formData.destination}
            onChange={(val) => setFormData((p) => ({ ...p, destination: val }))}
            inputProps={{
              className:
                "bg-transparent border-none shadow-none outline-none focus:ring-0 px-4 py-3 h-14 text-base font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-slate-100",
            }}
          />
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gray-200 dark:bg-slate-800" />
        </div>

        <div className="w-full md:w-[18%] relative group">
          <AppInput
            name="travelDates"
            placeholder="Dates"
            type="date"
            icon={<LuCalendar className="text-violet-500 text-lg" />}
            value={formData.travelDates}
            onChange={(val) => setFormData((p) => ({ ...p, travelDates: val }))}
            inputProps={{
              className:
                "bg-transparent border-none shadow-none outline-none focus:ring-0 px-4 py-3 h-14 text-base font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-slate-100",
            }}
          />
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gray-200 dark:bg-slate-800" />
        </div>

        <div className="w-full md:w-[15%] relative group">
          <AppInput
            name="budget"
            placeholder="Budget ($)"
            type="number"
            icon={<LuWallet className="text-violet-500 text-lg" />}
            value={formData.budget}
            onChange={(val) => setFormData((p) => ({ ...p, budget: val }))}
            inputProps={{
              className:
                "bg-transparent border-none shadow-none outline-none focus:ring-0 px-4 py-3 h-14 text-base font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-slate-100",
            }}
          />
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gray-200 dark:bg-slate-800" />
        </div>

        <div className="w-full md:w-[15%] relative group">
          <AppInput
            name="tripDuration"
            placeholder="Days"
            type="number"
            icon={<LuTimer className="text-violet-500 text-lg" />}
            value={formData.tripDuration}
            onChange={(val) => setFormData((p) => ({ ...p, tripDuration: val }))}
            inputProps={{
              className:
                "bg-transparent border-none shadow-none outline-none focus:ring-0 px-4 py-3 h-14 text-base font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 dark:text-slate-100",
            }}
          />
          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gray-200 dark:bg-slate-800" />
        </div>

        <div className="w-full md:w-[20%]">
          <MultiSelect values={selectedInterests} onValuesChange={setSelectedInterests}>
            <MultiSelectTrigger className="bg-transparent border-none shadow-none outline-none focus:ring-0 px-4 py-3 h-14 text-base font-medium text-slate-700 dark:text-slate-200 w-full justify-start">
              <MultiSelectValue overflowBehavior="cutoff" placeholder="Interests" />
            </MultiSelectTrigger>
            <MultiSelectContent className="bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 shadow-lg rounded-xl p-1">
              <MultiSelectGroup className="text-gray-800 dark:text-slate-100">
                {interestList.map((interest) => (
                  <MultiSelectItem
                    key={interest}
                    value={interest}
                    className="rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/30 cursor-pointer"
                  >
                    {interest}
                  </MultiSelectItem>
                ))}
              </MultiSelectGroup>
            </MultiSelectContent>
          </MultiSelect>
        </div>

        <div className="w-full md:w-auto p-1">
          <FormButton
            type="submit"
            disabled={isPending}
            className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl w-full md:w-14 h-14 flex items-center justify-center shadow-md transition-all duration-300 disabled:opacity-70"
          >
            {isPending ? (
              <LuLoader className="animate-spin text-xl" />
            ) : (
              <LuSearch className="text-xl" />
            )}
          </FormButton>
        </div>
      </form>
    </div>
  );
}

const interestList = [
  "Nature ",
  "History",
  "Culture",
  "Food",
  "Adventure",
  "Beach",
  "City",
];
