"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import UserForm from "@/components/UserForm";
import PlanDisplay from "@/components/PlanDisplay";
import { FitnessPlan, UserDetails } from "@/types";
import { toast } from "sonner";

export default function Home() {
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {!plan ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                💪 AI Fitness Coach
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Get your personalized workout and diet plan powered by AI
              </p>
            </div>
            
            <UserForm onSubmit={handleGeneratePlan} loading={loading} />
          </motion.div>
        ) : (
          <PlanDisplay 
            plan={plan} 
            userDetails={userDetails!}
            onRegenerate={handleRegenerate}
            onStartOver={handleStartOver}
          />
        )}
      </main>

      <footer className="text-center py-6 text-gray-600 dark:text-gray-400">
        <p>© 2025 AI Fitness Coach. Powered by AI for your wellness journey.</p>
      </footer>
    </div>
  );
}
