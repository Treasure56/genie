import { LuMapPin, LuCalendar, LuWallet } from "react-icons/lu";
import AppInput, { AppInputProps } from "../form/AppInput";

export default function HeroForm() {
  return (
   <div className="max-w-[700px] mx-auto flex justify-center mt-10 p-6 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        {formFields.map((field) => (
          <AppInput key={field.name} {...field} />
        ))}
      </div>
    </div>
  );
}

const formFields: AppInputProps[] = [
  {
    title: "Where to?",
    name: "destination",
    placeholder: "e.g. Tokyo, Japan",
    icon: <LuMapPin />,
  },
  {
    title: "When?",
    name: "travelDates",
    placeholder: "Add dates",
    type: "date",
    icon: <LuCalendar/>,
  },
  {
    title: "Budget",
    name: "budget",
    placeholder: "$2,500",
    type: "number",
    icon: <LuWallet />,
  },
];
