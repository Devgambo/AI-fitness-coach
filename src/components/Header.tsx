"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Dumbbell, LogIn, LogOut, UserPlus } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import Link from "next/link";
import { useAuth } from "./AuthProvider";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="border-b border-gray-300/50 dark:border-[#2C2C2C] bg-white/80 dark:bg-pink-700 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/25">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              AI Fitness Coach
            </h1>
          </div>
          <div className="w-9 h-9"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-gray-300/50 dark:border-[#2C2C2C] bg-white/80 dark:bg-pink-950/30 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/25">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            AI Fitness Coach
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-2xl bg-white/50 dark:bg-[#1E1E1E] border border-gray-300/50 dark:border-[#333333] hover:bg-gray-100 dark:hover:bg-[#222222] transition-all duration-200 shadow-lg shadow-black/5"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-pink-600" />
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{user.email}</span>
              </div>
              <button
                onClick={() => {
                  logout().catch(() => null);
                }}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-semibold shadow-lg shadow-pink-500/25 hover:opacity-90 transition"
              >
                <LogOut className="w-4 h-4" />
                <span>{loading ? "Signing out..." : "Sign out"}</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-pink-500/40 text-pink-600 dark:text-pink-300 text-sm font-semibold hover:bg-pink-50/80 dark:hover:bg-pink-900/20 transition"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign in</span>
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-semibold shadow-lg shadow-pink-500/25 hover:opacity-90 transition"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign up</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}