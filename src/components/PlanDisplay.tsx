"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FitnessPlan, UserDetails } from "@/types";
import { Download, RefreshCw, ArrowLeft, Volume2, Image as ImageIcon } from "lucide-react";
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
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your AI-Generated Plan
          </h1>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleReadPlan}
              disabled={isSpeaking}
              className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
            >
              <Volume2 className="w-4 h-4" />
              <span className="font-medium">Read Plan</span>
            </button>

            <button
              onClick={onRegenerate}
              className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all hover:scale-105 shadow-lg"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="font-medium">Regenerate</span>
            </button>

            <button
              onClick={onStartOver}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all hover:scale-105 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Clear</span>
            </button>
          </div>
        </div>
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
        >
          <Download className="w-4 h-4" />
          <span className="font-medium">Export PDF</span>
        </button>
      </div>

      {/* Motivation Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl mb-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-2">💪 Your Daily Motivation</h2>
        <p className="text-lg italic">&quot;{plan.motivation}&quot;</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg">
        <button
          onClick={() => setActiveTab("workout")}
          className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all flex-1 justify-center ${
            activeTab === "workout"
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md scale-105"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <span className="text-xl">🏋️</span>
          <span>Workout</span>
        </button>
        <button
          onClick={() => setActiveTab("diet")}
          className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all flex-1 justify-center ${
            activeTab === "diet"
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md scale-105"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <span className="text-xl">🥗</span>
          <span>Diet</span>
        </button>

      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === "workout" ? (
          <WorkoutPlanView workoutPlan={plan.workoutPlan} />
        ) : (
          <DietPlanView dietPlan={plan.dietPlan} />
        )}
      </div>

      {/* Lifestyle Tips */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
      >
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          🌟 Lifestyle Tips
        </h3>
        <ul className="space-y-2">
          {plan.lifestyleTips.map((tip, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
            >
              <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
