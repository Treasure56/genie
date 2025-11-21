import { ReactNode } from "react";
import { LuBot } from "react-icons/lu";

type FeaturesTileProps = {
    title: string;
    description: string;
    icon: ReactNode;
}

export default function FeaturesTile({ title, description, icon }: FeaturesTileProps) {
    return (
        <div className=" flex gap-3 bg-slate-50 rounded-md p-2">
            <div className="rounded-lg bg-slate-100 p-2 w-fit h-fit">
                {icon}
            </div>
            <div className="flex flex-col gap-2">
                <p className="font-semibold text-2xl text-slate-800">{title}</p>
                <p className="text-slate-700">{description}</p>
            </div>

        </div>
    );
}