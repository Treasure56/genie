import { LuCalendar, LuMapPin, LuTimer, LuWallet } from "react-icons/lu";
import AppInput, { AppInputProps } from "../form/AppInput";
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "../ui/multi-select";
import FormButton from "../form/FormButton";

export default function HeroForm() {
  return (
    <div className="max-w-[700px] mx-auto flex justify-center mt-10 p-6 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow">
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {formFields.map((field) => (
          <AppInput key={field.name} {...field} />
        ))}
        <MultiSelect>
          <MultiSelectTrigger className="bg-neutral-100! w-full border border-gray-300! outline-slate-900! text-gray-800! py-2.5 pe-3 rounded-md read-only:opacity-70">
            <MultiSelectValue overflowBehavior={"cutoff"} placeholder="Select interests" />
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
        <FormButton className="btn btn-primary rounded-md" >Explore Options</FormButton>

      </form>
    </div>
  );
}

const formFields: AppInputProps[] = [
  {
    // title: "Where to?",
    name: "destination",
    placeholder: "e.g. Tokyo, Japan",
    icon: <LuMapPin />,
  },
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
