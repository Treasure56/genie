import type { Metadata } from "next";
import { Roboto, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Nav";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const bricolageGrotesque = Bricolage_Grotesque({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

// const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Genie ✨",
  description: "AI Powered Trip Planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={` ${bricolageGrotesque.className} antialiased scroll-smooth`}
      >
        <Navbar />
        <NuqsAdapter>{children}</NuqsAdapter>

        <SpeedInsights />
      </body>
    </html>
  );
}
