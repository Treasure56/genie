import Link from "next/link";
import { LuFacebook, LuInstagram, LuLinkedin, LuTwitter } from "react-icons/lu";

export default function Footer() {
    return (
        <footer className="bg-[#05020a] text-slate-300 py-8 ">
            <div className="app-container flex flex-col md:flex-row justify-between items-center gap-6">
                <Link href="/" className="text-2xl font-bold text-white tracking-tight">
                    Genie
                </Link>

                <p className="text-sm text-slate-500 order-3 md:order-2">
                    © {new Date().getFullYear()} Genie. All rights reserved.
                </p>

                <div className="flex gap-4 order-2 md:order-3">
                    <SocialLink icon={<LuTwitter size={18} />} href="#" />
                    <SocialLink icon={<LuInstagram size={18} />} href="#" />
                    <SocialLink icon={<LuLinkedin size={18} />} href="#" />
                    <SocialLink icon={<LuFacebook size={18} />} href="#" />
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
    return (
        <Link
            href={href}
            className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-white hover:text-black transition-all duration-300"
        >
            {icon}
        </Link>
    );
}