"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <LuSun className="w-5 h-5 text-yellow-300 group-hover:rotate-90 transition-transform duration-500" />
      ) : (
        <LuMoon className="w-5 h-5 text-slate-700 group-hover:-rotate-12 transition-transform duration-500" />
      )}
    </button>
  );
}
