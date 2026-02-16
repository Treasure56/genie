import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type FeaturesTileProps = {
  title: string;
  description: string;
  icon: ReactNode;
  isActive?: boolean;
};

export default function FeaturesTile({
  title,
  description,
  icon,
  isActive = false,
}: FeaturesTileProps) {
  return (
    <div
      className={cn(
        " flex gap-3 rounded-md p-2 transition-colors duration-300",
        {
          "bg-purple-950/5 dark:bg-purple-900/20": isActive,
        },
      )}
    >
      <div
        className={cn(
          "rounded-lg bg-purple-50 dark:bg-purple-900/50 p-2 w-fit h-fit text-brand-primary dark:text-purple-300",
        )}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <p className="font-semibold text-xl text-slate-800 dark:text-slate-100 text-pretty">
          {title}
        </p>
        <p className="text-slate-600 dark:text-slate-400 text-sm text-pretty">
          {description}
        </p>
      </div>
    </div>
  );
}
