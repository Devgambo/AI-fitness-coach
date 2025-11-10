"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function LandingHero() {
  return (
    <div className="h-full flex">
      <motion.div
        className="flex-1 bg-gradient-to-br from-pink-400/20 via-rose-400/10 to-pink-500/20 dark:from-pink-950/40 dark:via-rose-950/30 dark:to-pink-950/40 backdrop-blur-sm relative overflow-hidden"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-pink-500 blur-3xl"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 rounded-full bg-rose-500 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-pink-400 blur-3xl"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center p-12">
          <div className="text-center max-w-md">
            <div className="relative w-full h-80 mb-6">
              <Image
                src="/hero.png"
                alt="Fitness Journey"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Your Personalized Fitness Journey
            </h3>
            <p className="text-pink-600/80 dark:text-pink-400/80 text-sm leading-relaxed">
              Unlock bespoke workout and nutrition plans powered by AI. Start your transformation
              today.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 flex items-center justify-center bg-white/70 dark:bg-pink-950/30 backdrop-blur-xl border-l border-pink-200/50 dark:border-pink-800/50"
      >
        <div className="max-w-md w-full px-6 py-10 text-right">
          <div className="inline-flex flex-col gap-3 items-end">
            <p className="text-sm uppercase tracking-[0.3em] text-pink-500/70 dark:text-pink-400/70">
              Welcome to AI Fitness Coach
            </p>
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white text-right">
              Your Smart Fitness Companion
            </h2>
            <p className="text-gray-600/80 dark:text-gray-200/80 text-right leading-relaxed">
              Sign in to continue your personalized plans or create a new account to get started in
              minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/signin"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-pink-500/40 text-pink-600 dark:text-pink-300 text-sm font-semibold hover:bg-pink-50/80 dark:hover:bg-pink-900/20 transition min-w-[140px]"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-semibold shadow-lg shadow-pink-500/25 hover:opacity-90 transition min-w-[140px]"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

