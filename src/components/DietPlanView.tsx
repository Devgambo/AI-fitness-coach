// DietPlanView.tsx (updated emojis)
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DietPlan } from "@/types";
import { ChevronDown, ChevronUp, Image as ImageIcon, Utensils, Sunrise, Sun, Moon, Apple } from "lucide-react";
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
          className="bg-white/70 dark:bg-[#6b255d] backdrop-blur-sm rounded-3xl shadow-lg border border-gray-300/50 dark:border-[#333333] overflow-hidden"
        >
          <button
            onClick={() => toggleDay(index)}
            className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-[#222222] transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-400/25">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {day.day}
                </h3>
                <p className="text-sm text-green-500 dark:text-green-400 font-medium">
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
                title="Breakfast"
                icon={<Sunrise className="w-5 h-5" />}
                meal={day.breakfast}
                onViewImage={() => setSelectedMeal(day.breakfast.name)}
              />

              {/* Lunch */}
              <MealCard
                title="Lunch"
                icon={<Sun className="w-5 h-5" />}
                meal={day.lunch}
                onViewImage={() => setSelectedMeal(day.lunch.name)}
              />

              {/* Dinner */}
              <MealCard
                title="Dinner"
                icon={<Moon className="w-5 h-5" />}
                meal={day.dinner}
                onViewImage={() => setSelectedMeal(day.dinner.name)}
              />

              {/* Snacks */}
              {day.snacks && day.snacks.length > 0 && (
                <div className="bg-gray-50/80 dark:bg-[#222222] p-5 rounded-2xl border border-gray-200/50 dark:border-[#333333]">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                      <Apple className="w-4 h-4 text-white" />
                    </div>
                    Snacks
                  </h4>
                  <div className="space-y-3">
                    {day.snacks.map((snack, snackIndex) => (
                      <div key={snackIndex} className="flex items-start justify-between bg-white/50 dark:bg-[#2A2A2A] p-4 rounded-xl">
                        <div className="flex-1">
                          <p className="text-gray-700 dark:text-gray-300 font-medium">
                            {snack.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {snack.description}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedMeal(snack.name)}
                          className="ml-4 p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/25 border border-green-500/20"
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
  icon: React.ReactNode;
  meal: any;
  onViewImage: () => void;
}

function MealCard({ title, icon, meal, onViewImage }: MealCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-50/80 dark:bg-[#222222] p-5 rounded-2xl border border-gray-200/50 dark:border-[#333333]"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
              {icon}
            </div>
            {title}
          </h4>
          <p className="text-lg text-gray-800 dark:text-white font-medium">{meal.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{meal.description}</p>
          
          {(meal.calories || meal.protein || meal.carbs || meal.fats) && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">
              {meal.calories && (
                <div className="bg-white/50 dark:bg-[#2A2A2A] p-3 rounded-lg text-center">
                  <span className="text-gray-500 dark:text-gray-400 block text-xs">Calories</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {meal.calories}
                  </span>
                </div>
              )}
              {meal.protein && (
                <div className="bg-white/50 dark:bg-[#2A2A2A] p-3 rounded-lg text-center">
                  <span className="text-gray-500 dark:text-gray-400 block text-xs">Protein</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {meal.protein}g
                  </span>
                </div>
              )}
              {meal.carbs && (
                <div className="bg-white/50 dark:bg-[#2A2A2A] p-3 rounded-lg text-center">
                  <span className="text-gray-500 dark:text-gray-400 block text-xs">Carbs</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {meal.carbs}g
                  </span>
                </div>
              )}
              {meal.fats && (
                <div className="bg-white/50 dark:bg-[#2A2A2A] p-3 rounded-lg text-center">
                  <span className="text-gray-500 dark:text-gray-400 block text-xs">Fats</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {meal.fats}g
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        <button
          onClick={onViewImage}
          className="ml-4 p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/25 border border-green-500/20 self-start"
          title="View meal image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}