import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type FeaturesTileProps = {
    title: string;
    description: string;
    icon: ReactNode;
    isActive?: boolean;
}

export default function FeaturesTile({ title, description, icon, isActive = false }: FeaturesTileProps) {
    return (
        <div className={cn(" flex gap-3 rounded-md p-2", {
            "bg-purple-950/5": isActive
        })}>
            <div className={cn("rounded-lg bg-purple-50  p-2 w-fit h-fit",)}>
                {icon}
            </div>
            <div className="flex flex-col">
                <p className="font-semibold text-xl text-slate-800">{title}</p>
                <p className="text-slate-600 text-sm">{description}</p>
            </div>

        </div >
    );
}