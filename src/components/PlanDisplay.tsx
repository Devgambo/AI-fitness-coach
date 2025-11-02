// PlanDisplay.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FitnessPlan, UserDetails } from "@/types";
import { 
  Download, 
  RefreshCw, 
  ArrowLeft, 
  Volume2, 
  Heart, 
  Dumbbell, 
  Utensils,
  Lightbulb,
  Droplets,
  Sparkles
} from "lucide-react";
import WorkoutPlanView from "./WorkoutPLanView";
import DietPlanView from "./DietPlanView";
import { exportToPDF } from "@/lib/exportPDF";
import { toast } from "sonner";

interface PlanDisplayProps {
  plan: FitnessPlan;
  userDetails: UserDetails;
  onRegenerate: () => void;
  onStartOver: () => void;
}

export default function PlanDisplay({
  plan,
  userDetails,
  onRegenerate,
  onStartOver,
}: PlanDisplayProps) {
  const [activeTab, setActiveTab] = useState<"workout" | "diet">("workout");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleExportPDF = async () => {
    try {
      await exportToPDF(plan, userDetails);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export PDF");
    }
  };

  const handleReadPlan = async () => {
    if (isSpeaking) {
      toast.info("Already reading the plan");
      return;
    }

    setIsSpeaking(true);
    toast.info(`Reading your ${activeTab} plan...`);

    try {
      const content = activeTab === "workout" 
        ? generateWorkoutText(plan.workoutPlan)
        : generateDietText(plan.dietPlan);

      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
          setIsSpeaking(false);
          toast.success("Finished reading!");
        };
        
        audio.onerror = () => {
          setIsSpeaking(false);
          toast.error("Error playing audio");
        };
        
        audio.play();
      } else {
        throw new Error("Failed to generate speech");
      }
    } catch (error) {
      console.error("Error with text-to-speech:", error);
      toast.error("Text-to-speech feature unavailable");
      setIsSpeaking(false);
    }
  };

  const generateWorkoutText = (workoutPlan: any) => {
    let text = "Here is your workout plan. ";
    workoutPlan.weeklyPlan.slice(0, 3).forEach((day: any) => {
      text += `${day.day}: ${day.focus}. `;
      day.exercises.slice(0, 2).forEach((ex: any) => {
        text += `${ex.name}, ${ex.sets} sets of ${ex.reps}. `;
      });
    });
    return text;
  };

  const generateDietText = (dietPlan: any) => {
    let text = "Here is your diet plan. ";
    dietPlan.weeklyPlan.slice(0, 2).forEach((day: any) => {
      text += `${day.day}: Breakfast - ${day.breakfast.name}. Lunch - ${day.lunch.name}. Dinner - ${day.dinner.name}. `;
    });
    return text;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-full bg-gray-50/30 dark:bg-pink-950/30"
    >
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-400/25">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                  Your AI-Generated Plan
                </h1>
                <p className="text-pink-500/70 dark:text-pink-400/70 mt-1">
                  Personalized for {userDetails.name}
                </p>
              </div>
            </div>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-all hover:scale-105 shadow-lg shadow-blue-500/25 border border-blue-500/20"
            >
              <Download className="w-4 h-4" />
              <span className="font-medium">Export PDF</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Section - Workout/Diet Content */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex gap-3 bg-white/70 dark:bg-[#1E1E1E] p-2 rounded-2xl shadow-lg border border-gray-300/50 dark:border-[#333333]">
              <button
                onClick={() => setActiveTab("workout")}
                className={`flex items-center gap-3 px-6 py-4 font-semibold rounded-xl transition-all flex-1 justify-center ${
                  activeTab === "workout"
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-105 border border-pink-500/20"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#222222]"
                }`}
              >
                <Dumbbell className="w-5 h-5" />
                <span>Workout</span>
              </button>
              <button
                onClick={() => setActiveTab("diet")}
                className={`flex items-center gap-3 px-6 py-4 font-semibold rounded-xl transition-all flex-1 justify-center ${
                  activeTab === "diet"
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-105 border border-pink-500/20"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#222222]"
                }`}
              >
                <Utensils className="w-5 h-5" />
                <span>Diet</span>
              </button>
            </div>

            {/* Content */}
            <div className="min-h-[600px]">
              {activeTab === "workout" ? (
                <WorkoutPlanView workoutPlan={plan.workoutPlan} />
              ) : (
                <DietPlanView dietPlan={plan.dietPlan} />
              )}
            </div>
          </div>

          {/* Right Section - Motivation & Tips */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleReadPlan}
                disabled={isSpeaking}
                className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl hover:from-green-600 hover:to-emerald-600 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-green-500/25 border border-green-500/20"
                title="Read Plan"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              <button
                onClick={onRegenerate}
                className="flex items-center gap-2 p-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl hover:from-pink-600 hover:to-rose-600 transition-all hover:scale-105 shadow-lg shadow-pink-500/25 border border-pink-500/20"
                title="Regenerate"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={onStartOver}
                className="flex items-center gap-2 p-3 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-2xl hover:from-rose-600 hover:to-red-600 transition-all hover:scale-105 shadow-lg shadow-rose-500/25 border border-rose-500/20"
                title="Clear"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Motivation Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6 rounded-3xl shadow-2xl shadow-pink-500/25 border border-pink-500/20"
            >
              <h2 className="text-xl font-bold mb-3 flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                Your Daily Motivation
              </h2>
              <p className="text-base italic">&quot;{plan.motivation}&quot;</p>
            </motion.div>

            {/* Tips Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/70 dark:bg-[#1E1E1E] p-6 rounded-3xl shadow-lg border border-gray-300/50 dark:border-[#333333] backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                {activeTab === "workout" ? "Workout Tips" : "Diet Tips"}
              </h3>
              <ul className="space-y-3">
                {(activeTab === "workout" ? plan.workoutPlan.tips : plan.dietPlan.tips).map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300 p-3 rounded-xl bg-gray-50/50 dark:bg-[#222222]"
                  >
                    <span className="text-pink-500 dark:text-pink-400 font-bold mt-1">•</span>
                    <span className="flex-1 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Additional Info */}
            {activeTab === "diet" && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-3xl border border-blue-200/50 dark:border-blue-800/50"
              >
                <h3 className="text-lg font-bold mb-4 text-blue-800 dark:text-blue-300 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                    <Droplets className="w-4 h-4 text-white" />
                  </div>
                  Hydration & Supplements
                </h3>
                <div className="space-y-4">
                  <div className="bg-white/50 dark:bg-[#222222] p-4 rounded-xl">
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      <span className="font-semibold">Water Intake:</span> {plan.dietPlan.waterIntake}
                    </p>
                  </div>
                  {plan.dietPlan.supplements && plan.dietPlan.supplements.length > 0 && (
                    <div className="bg-white/50 dark:bg-[#222222] p-4 rounded-xl">
                      <p className="font-semibold text-gray-800 dark:text-white mb-3 text-sm">
                        Recommended Supplements:
                      </p>
                      <ul className="space-y-2">
                        {plan.dietPlan.supplements.map((supplement, index) => (
                          <li key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 text-sm">
                            <span className="text-blue-500 dark:text-blue-400 font-bold">•</span>
                            <span>{supplement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Lifestyle Tips */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/70 dark:bg-[#1E1E1E] p-6 rounded-3xl shadow-lg border border-gray-300/50 dark:border-[#333333] backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                Lifestyle Tips
              </h3>
              <ul className="space-y-3">
                {plan.lifestyleTips.map((tip, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300 p-3 rounded-xl bg-gray-50/50 dark:bg-[#222222]"
                  >
                    <span className="text-pink-500 dark:text-pink-400 font-bold mt-1">•</span>
                    <span className="flex-1 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}