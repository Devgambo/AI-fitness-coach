"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import UserForm from "@/components/UserForm";
import PlanDisplay from "@/components/PlanDisplay";
import { FitnessPlan, UserDetails } from "@/types";
import { toast } from "sonner";

const STORAGE_KEYS = {
  PLAN: "fitness_plan",
  USER_DETAILS: "user_details",
};

export default function Home() {
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem(STORAGE_KEYS.PLAN);
      const savedUserDetails = localStorage.getItem(STORAGE_KEYS.USER_DETAILS);

      if (savedPlan) {
        const parsedPlan = JSON.parse(savedPlan);
        setPlan(parsedPlan);
      }

      if (savedUserDetails) {
        const parsedUserDetails = JSON.parse(savedUserDetails);
        setUserDetails(parsedUserDetails);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage whenever plan or userDetails change
  useEffect(() => {
    if (!isHydrated) return;

    try {
      if (plan) {
        localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(plan));
      } else {
        localStorage.removeItem(STORAGE_KEYS.PLAN);
      }
    } catch (error) {
      console.error("Error saving plan to localStorage:", error);
    }
  }, [plan, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      if (userDetails) {
        localStorage.setItem(STORAGE_KEYS.USER_DETAILS, JSON.stringify(userDetails));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER_DETAILS);
      }
    } catch (error) {
      console.error("Error saving user details to localStorage:", error);
    }
  }, [userDetails, isHydrated]);

  const handleGeneratePlan = async (details: UserDetails) => {
    setLoading(true);
    setUserDetails(details);
    
    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userDetails: details }),
      });

      const data = await response.json();
     
      console.log('Data----------->')
      console.log(data);
      if (data.success) {
        setPlan(data.data);
        toast.success("Your personalized fitness plan is ready!");
      } else {
        toast.error(data.error || "Failed to generate plan");
      }
    } catch (error) {
      console.error("Error generating plan:", error);
      toast.error("An error occurred while generating your plan");
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = () => {
    setPlan(null);
    if (userDetails) {
      handleGeneratePlan(userDetails);
    }
  };

  const handleStartOver = () => {
    setPlan(null);
    setUserDetails(null);
    // Clear localStorage
    try {
      localStorage.removeItem(STORAGE_KEYS.PLAN);
      localStorage.removeItem(STORAGE_KEYS.USER_DETAILS);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  // Show loading state during hydration to prevent flash
  if (!isHydrated) {
    return (
      <div className="h-[90vh] bg-gradient-to-br from-pink-50/80 via-white/60 to-rose-50/80 dark:from-[#121212] dark:via-[#1A1A1A] dark:to-[#121212] backdrop-blur-sm">
        <main className="h-full w-full fixed inset-0 flex items-center justify-center">
          <div className="text-gray-600 dark:text-gray-400">Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-[90vh] bg-gradient-to-br from-pink-50/80 via-white/60 to-rose-50/80 dark:from-[#121212] dark:via-[#1A1A1A] dark:to-[#121212] backdrop-blur-sm">
      <main className="h-full w-full fixed inset-0">
        {!plan ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          >
            <UserForm onSubmit={handleGeneratePlan} loading={loading} />
          </motion.div>
        ) : (
          <div className="h-full w-full overflow-auto bg-white dark:bg-[#1A1A1A]">
            <PlanDisplay 
              plan={plan} 
              userDetails={userDetails!}
              onRegenerate={handleRegenerate}
              onStartOver={handleStartOver}
            />
          </div>
        )}
      </main>
    </div>
  );
}