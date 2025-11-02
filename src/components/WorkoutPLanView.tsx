// WorkoutPlanView.tsx (updated emojis)
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WorkoutPlan } from "@/types";
import { ChevronDown, ChevronUp, Image as ImageIcon, Dumbbell, Zap, Lightbulb } from "lucide-react";
import ImageModal from "./ImageModal";

interface WorkoutPlanViewProps {
  workoutPlan: WorkoutPlan;
}

export default function WorkoutPlanView({ workoutPlan }: WorkoutPlanViewProps) {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([0]));
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  const toggleDay = (index: number) => {
    setExpandedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-6">
      {/* Weekly Plan */}
      {workoutPlan.weeklyPlan.map((day, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/70 dark:bg-[#1E1E1E] backdrop-blur-sm rounded-3xl shadow-lg border border-gray-300/50 dark:border-[#333333] overflow-hidden"
        >
          <button
            onClick={() => toggleDay(index)}
            className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-[#222222] transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-400/25">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {day.day}
                </h3>
                <p className="text-sm text-blue-500 dark:text-blue-400 font-medium">
                  {day.focus}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {expandedDays.has(index) ? (
                <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </div>
          </button>

          {expandedDays.has(index) && (
            <div className="px-6 pb-6 space-y-4">
              {day.exercises.map((exercise, exIndex) => (
                <motion.div
                  key={exIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: exIndex * 0.05 }}
                  className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750 p-5 rounded-2xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-base">
                          {exercise.name}
                        </h4>
                        <div className="flex flex-wrap gap-3 text-sm mb-2">
                          <div className="flex items-center gap-1">
                            <span className="text-gray-600 dark:text-gray-400">
                              {exercise.sets} sets ×
                            </span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {exercise.reps}
                            </span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <div className="text-gray-600 dark:text-gray-400">
                            {exercise.restTime}
                          </div>
                        </div>
                        {exercise.notes && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                            <Lightbulb className="w-3 h-3 inline mr-1" /> {exercise.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedExercise(exercise.name)}
                      className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg shadow-blue-500/25 border border-blue-500/20 flex-shrink-0 self-start"
                      title="View exercise image"
                    >
                      <ImageIcon className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      ))}

      {/* Image Modal */}
      {selectedExercise && (
        <ImageModal
          title={selectedExercise}
          type="exercise"
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
}