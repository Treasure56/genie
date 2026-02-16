import Navbar from "@/components/navbar/Nav";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Lenis } from "lenis/react";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${bricolageGrotesque.className} antialiased scroll-smooth bg-white dark:bg-slate-950`}
      >
        <NuqsAdapter>
          <Lenis root>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}

              <SpeedInsights />
            </ThemeProvider>
          </Lenis>
        </NuqsAdapter>
      </body>
    </html>
  );
}
