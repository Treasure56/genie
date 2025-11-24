import Link from "next/link";
import { LuFacebook, LuInstagram, LuLinkedin, LuTwitter } from "react-icons/lu";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-800">
            <div className="app-container">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                    <div className="flex flex-col gap-4 max-w-sm">
                        <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
                            Genie<span className="text-xl">✨</span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed">
                            Your AI-powered companion for crafting personalized travel experiences. Discover the world, your way.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <SocialLink icon={<LuTwitter size={20} />} href="#" />
                        <SocialLink icon={<LuInstagram size={20} />} href="#" />
                        <SocialLink icon={<LuLinkedin size={20} />} href="#" />
                        <SocialLink icon={<LuFacebook size={20} />} href="#" />
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} TripGenie. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
    return (
        <Link
            href={href}
            className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white transition-all duration-300"
        >
            {icon}
        </Link>
    );
}