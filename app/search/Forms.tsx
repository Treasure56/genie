import { LuCalendar, LuMapPin, LuSearch, LuTimer, LuWallet } from "react-icons/lu";
import FormButton from "@/components/form/FormButton";
import AppInput, { AppInputProps } from "@/components/form/AppInput";
import { MultiSelect, MultiSelectTrigger, MultiSelectValue, MultiSelectContent, MultiSelectGroup, MultiSelectItem } from "@/components/ui/multi-select";

export default function Forms() {
    return (
        <div className="app-container flex justify-center">
            <form className="bg-white rounded-xl  border border-gray-100 p-2 flex flex-col md:flex-row items-center gap-2 w-full max-w-6xl">

                <div className="w-full md:w-[28%] relative group">
                    <AppInput
                        {...formFields[0]}
                        inputProps={{
                            className: "!bg-transparent !border-none !shadow-none !outline-none focus:!ring-0 px-4 py-3 h-14 text-base font-medium placeholder:text-slate-400"
                        }}
                    />
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gray-200" />
                </div>

                <div className="w-full md:w-[18%] relative group">
                    <AppInput
                        {...formFields[1]}
                        inputProps={{
                            className: "!bg-transparent !border-none !shadow-none !outline-none focus:!ring-0 px-4 py-3 h-14 text-base font-medium placeholder:text-slate-400"
                        }}
                    />
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gray-200" />
                </div>

                <div className="w-full md:w-[15%] relative group">
                    <AppInput
                        {...formFields[2]}
                        inputProps={{
                            className: "!bg-transparent !border-none !shadow-none !outline-none focus:!ring-0 px-4 py-3 h-14 text-base font-medium placeholder:text-slate-400"
                        }}
                    />
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gray-200" />
                </div>

                <div className="w-full md:w-[15%] relative group">
                    <AppInput
                        {...formFields[3]}
                        inputProps={{
                            className: "!bg-transparent !border-none !shadow-none !outline-none focus:!ring-0 px-4 py-3 h-14 text-base font-medium placeholder:text-slate-400"
                        }}
                    />
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-gray-200" />
                </div>

                <div className="w-full md:w-[20%]">
                    <MultiSelect>
                        <MultiSelectTrigger className="bg-transparent! border-none! shadow-none! outline-none! focus:ring-0! px-4 py-3 h-14 text-base font-medium text-slate-700 w-full justify-start">
                            <MultiSelectValue overflowBehavior={"cutoff"} placeholder="Interests" />
                        </MultiSelectTrigger>
                        <MultiSelectContent className="bg-white border border-gray-100 shadow-lg rounded-xl p-1">
                            <MultiSelectGroup className="text-gray-800">
                                {interests.map((interest) => (
                                    <MultiSelectItem key={interest} value={interest} className="rounded-lg hover:bg-purple-50 cursor-pointer">
                                        {interest}
                                    </MultiSelectItem>
                                ))}
                            </MultiSelectGroup>
                        </MultiSelectContent>
                    </MultiSelect>
                </div>

                <div className="w-full md:w-auto p-1">
                    <FormButton className="bg-brand-primary hover:bg-purple-900 text-white rounded-2xl w-full md:w-14 h-14 flex items-center justify-center shadow-md transition-all duration-300">
                        <LuSearch className="text-xl" />
                    </FormButton>
                </div>

            </form>
        </div>
    );
}

const formFields: AppInputProps[] = [
    {
        name: "destination",
        placeholder: "Where to?",
        icon: <LuMapPin className="text-brand-primary text-lg" />,
    },
    {
        name: "travelDates",
        placeholder: "Dates",
        type: "date",
        icon: <LuCalendar className="text-brand-primary text-lg" />,
    },
    {
        name: "budget",
        placeholder: "Budget",
        type: "number",
        icon: <LuWallet className="text-brand-primary text-lg" />,
    },
    {
        name: "tripDuration",
        placeholder: "Days",
        type: "number",
        icon: <LuTimer className="text-brand-primary text-lg" />,
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
