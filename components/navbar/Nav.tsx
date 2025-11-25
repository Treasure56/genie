import { paths } from "@/utils/paths";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent py-6">
      <div className="app-container flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          Genie✨
        </Link>

        <Link href={paths.search} className="bg-brand-primary text-white hover:bg-brand-primary/80 px-6 py-2.5 rounded-full font-medium text-sm transition-all">
          Get Started
        </Link>
      </div>
    </nav>
  );
}