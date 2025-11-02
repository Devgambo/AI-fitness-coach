"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WorkoutPlan } from "@/types";
import { ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";
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
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <button
            onClick={() => toggleDay(index)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-white">
                  🏋️
                </span>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {day.day}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
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
                  className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750 p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-lg">⚡</span>
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
                            💡 {exercise.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedExercise(exercise.name)}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0 self-start"
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

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl"
      >
        <h3 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-300">
          💡 Workout Tips
        </h3>
        <ul className="space-y-2">
          {workoutPlan.tips.map((tip, index) => (
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
