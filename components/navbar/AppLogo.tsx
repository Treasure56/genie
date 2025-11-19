import { paths } from "@/utils/paths";
import Link from "next/link";
import { LuPlane } from "react-icons/lu";


export function AppLogo() {
  return (
    <Link href={paths.home}>
    <div className="flex items-centers">
        <LuPlane className="size-6" />
      <span className="ml-2 font-bold text-xl">Trip Genie</span>
    </div>
    </Link>
  );
}