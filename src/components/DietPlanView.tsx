"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DietPlan } from "@/types";
import { ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";
import ImageModal from "./ImageModal";

interface DietPlanViewProps {
  dietPlan: DietPlan;
}

export default function DietPlanView({ dietPlan }: DietPlanViewProps) {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([0]));
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

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
      {dietPlan.weeklyPlan.map((day, index) => (
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
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-white">
                  🥗
                </span>
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {day.day}
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Meal Plan
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
              {/* Breakfast */}
              <MealCard
                title="🌅 Breakfast"
                meal={day.breakfast}
                onViewImage={() => setSelectedMeal(day.breakfast.name)}
              />

              {/* Lunch */}
              <MealCard
                title="🌞 Lunch"
                meal={day.lunch}
                onViewImage={() => setSelectedMeal(day.lunch.name)}
              />

              {/* Dinner */}
              <MealCard
                title="🌙 Dinner"
                meal={day.dinner}
                onViewImage={() => setSelectedMeal(day.dinner.name)}
              />

              {/* Snacks */}
              {day.snacks && day.snacks.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                    🍎 Snacks
                  </h4>
                  <div className="space-y-2">
                    {day.snacks.map((snack, snackIndex) => (
                      <div key={snackIndex} className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-gray-700 dark:text-gray-300 font-medium">
                            {snack.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {snack.description}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedMeal(snack.name)}
                          className="ml-4 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          title="View meal image"
                        >
                          <ImageIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      ))}

      {/* Tips and Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl"
        >
          <h3 className="text-xl font-bold mb-4 text-green-800 dark:text-green-300">
            💡 Diet Tips
          </h3>
          <ul className="space-y-2">
            {dietPlan.tips.map((tip, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
              >
                <span className="text-green-600 dark:text-green-400 font-bold">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl"
        >
          <h3 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-300">
            💧 Hydration & Supplements
          </h3>
          <div className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Water Intake:</span> {dietPlan.waterIntake}
            </p>
            {dietPlan.supplements && dietPlan.supplements.length > 0 && (
              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-2">
                  Recommended Supplements:
                </p>
                <ul className="space-y-1">
                  {dietPlan.supplements.map((supplement, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">
                      • {supplement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedMeal && (
        <ImageModal
          title={selectedMeal}
          type="meal"
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </div>
  );
}

interface MealCardProps {
  title: string;
  meal: any;
  onViewImage: () => void;
}

function MealCard({ title, meal, onViewImage }: MealCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{title}</h4>
          <p className="text-lg text-gray-800 dark:text-white font-medium">{meal.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{meal.description}</p>
          
          {(meal.calories || meal.protein || meal.carbs || meal.fats) && (
            <div className="grid grid-cols-4 gap-2 mt-3 text-sm">
              {meal.calories && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Calories:</span>
                  <span className="ml-1 font-medium text-gray-800 dark:text-white">
                    {meal.calories}
                  </span>
                </div>
              )}
              {meal.protein && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Protein:</span>
                  <span className="ml-1 font-medium text-gray-800 dark:text-white">
                    {meal.protein}
                  </span>
                </div>
              )}
              {meal.carbs && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Carbs:</span>
                  <span className="ml-1 font-medium text-gray-800 dark:text-white">
                    {meal.carbs}
                  </span>
                </div>
              )}
              {meal.fats && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Fats:</span>
                  <span className="ml-1 font-medium text-gray-800 dark:text-white">
                    {meal.fats}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        <button
          onClick={onViewImage}
          className="ml-4 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          title="View meal image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
