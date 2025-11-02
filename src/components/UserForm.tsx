"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { UserDetails } from "@/types";
import { Loader2, Dumbbell, Utensils, Heart, Moon, Sun } from "lucide-react";

interface UserFormProps {
  onSubmit: (details: UserDetails) => void;
  loading: boolean;
}

export default function UserForm({ onSubmit, loading }: UserFormProps) {
  const [formData, setFormData] = useState<UserDetails>({
    name: "",
    age: 25,
    gender: "male",
    height: 170,
    weight: 70,
    fitnessGoal: "weight_loss",
    fitnessLevel: "beginner",
    workoutLocation: "gym",
    dietaryPreference: "non_vegetarian",
    medicalHistory: "",
    stressLevel: "moderate",
    sleepHours: 7,
    waterIntake: 2,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["age", "height", "weight", "sleepHours", "waterIntake"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  return (
    <div className="h-full flex">
      {/* Left Side - Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col bg-white/70 dark:bg-pink-950/30 backdrop-blur-xl border-r border-pink-200/50 dark:border-pink-800/50 shadow-2xl shadow-pink-500/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Form Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Tell Us About Yourself
            </h2>
            <p className="text-pink-600/70 dark:text-pink-400/70 mb-8">
              Fill in your details to get a personalized fitness and diet plan
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Name */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/80 dark:black backdrop-blur-sm border border-pink-300/50 dark:border-pink-700/50 rounded-2xl focus:ring-2 focus:ring-pink-500/50 focus:border-transparent dark:text-white placeholder-pink-400/50 transition-all duration-200"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="15"
                  max="100"
                  className="w-full px-4 py-3 bg-white/80 dark:black backdrop-blur-sm border border-pink-300/50 dark:border-pink-700/50 rounded-2xl focus:ring-2 focus:ring-pink-500/50 dark:text-white transition-all duration-200"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/80 dark:black backdrop-blur-sm border border-pink-300/50 dark:border-pink-700/50 rounded-2xl focus:ring-2 focus:ring-pink-500/50 dark:text-white transition-all duration-200"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  Height (cm) *
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  min="100"
                  max="250"
                  className="w-full px-4 py-3 bg-white/80 dark:black backdrop-blur-sm border border-pink-300/50 dark:border-pink-700/50 rounded-2xl focus:ring-2 focus:ring-pink-500/50 dark:text-white transition-all duration-200"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  Weight (kg) *
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  min="30"
                  max="300"
                  className="w-full px-4 py-3 bg-white/80 dark:black backdrop-blur-sm border border-pink-300/50 dark:border-pink-700/50 rounded-2xl focus:ring-2 focus:ring-pink-500/50 dark:text-white transition-all duration-200"
                />
              </div>

              {/* Fitness Goal */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  Fitness Goal *
                </label>
                <select
                  name="fitnessGoal"
                  value={formData.fitnessGoal}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/80 dark:black backdrop-blur-sm border border-pink-300/50 dark:border-pink-700/50 rounded-2xl focus:ring-2 focus:ring-pink-500/50 dark:text-white transition-all duration-200"
                >
                  <option value="weight_loss">Weight Loss</option>
                  <option value="muscle_gain">Muscle Gain</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="endurance">Endurance</option>
                  <option value="flexibility">Flexibility</option>
                </select>
              </div>

              {/* Fitness Level */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  Fitness Level *
                </label>
                <select
                  name="fitnessLevel"
                  value={formData.fitnessLevel}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/80 dark:black backdrop-blur-sm border border-pink-300/50 dark:border-pink-700/50 rounded-2xl focus:ring-2 focus:ring-pink-500/50 dark:text-white transition-all duration-200"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Workout Location */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  Workout Location *
                </label>
                <select
                  name="workoutLocation"
                  value={formData.workoutLocation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/80 dark:black backdrop-blur-sm border border-pink-300/50 dark:border-pink-700/50 rounded-2xl focus:ring-2 focus:ring-pink-500/50 dark:text-white transition-all duration-200"
                >
                  <option value="home">Home</option>
                  <option value="gym">Gym</option>
                  <option value="outdoor">Outdoor</option>
                </select>
              </div>

              {/* Dietary Preference */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  Dietary Preference *
                </label>
                <select
                  name="dietaryPreference"
                  value={formData.dietaryPreference}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/80 dark:black backdrop-blur-sm border border-pink-300/50 dark:border-pink-700/50 rounded-2xl focus:ring-2 focus:ring-pink-500/50 dark:text-white transition-all duration-200"
                >
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non_vegetarian">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="keto">Keto</option>
                  <option value="paleo">Paleo</option>
                </select>
              </div>

              {/* Stress Level */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  Stress Level
                </label>
                <select
                  name="stressLevel"
                  value={formData.stressLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/80 dark:black backdrop-blur-sm border border-pink-300/50 dark:border-pink-700/50 rounded-2xl focus:ring-2 focus:ring-pink-500/50 dark:text-white transition-all duration-200"
                >
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Sleep Hours */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  Sleep Hours
                </label>
                <input
                  type="number"
                  name="sleepHours"
                  value={formData.sleepHours}
                  onChange={handleChange}
                  min="3"
                  max="12"
                  step="0.5"
                  className="w-full px-4 py-3 bg-white/80 dark:black backdrop-blur-sm border border-pink-300/50 dark:border-pink-700/50 rounded-2xl focus:ring-2 focus:ring-pink-500/50 dark:text-white transition-all duration-200"
                />
              </div>

              {/* Water Intake */}
              <div>
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  Water (L/day)
                </label>
                <input
                  type="number"
                  name="waterIntake"
                  value={formData.waterIntake}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  step="0.5"
                  className="w-full px-4 py-3 bg-white/80 dark:black backdrop-blur-sm border border-pink-300/50 dark:border-pink-700/50 rounded-2xl focus:ring-2 focus:ring-pink-500/50 dark:text-white transition-all duration-200"
                />
              </div>

              {/* Medical History */}
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                  Medical History (Optional)
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/80 dark:black backdrop-blur-sm border border-pink-300/50 dark:border-pink-700/50 rounded-2xl focus:ring-2 focus:ring-pink-500/50 dark:text-white transition-all duration-200 resize-none"
                  placeholder="Any injuries, conditions, or medications..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="p-8 border-t border-pink-200/50 dark:border-pink-800/50 flex-shrink-0">
          <button
            type="submit"
            disabled={loading}
            className="w-full max-w-4xl mx-auto bg-gradient-to-r from-pink-600 to-rose-600 backdrop-blur-sm text-white py-4 rounded-2xl font-semibold hover:from-pink-700 hover:to-rose-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-pink-500/20 shadow-2xl shadow-pink-500/25 hover:shadow-pink-500/40 text-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Generating Your Plan...
              </>
            ) : (
              <>
                <Heart className="w-6 h-6" />
                Generate My Fitness Plan
              </>
            )}
          </button>
        </div>
      </motion.form>

      {/* Right Side - Image/Visual */}
      <motion.div 
        className="flex-1 bg-gradient-to-br from-pink-400/20 via-rose-400/10 to-pink-500/20 dark:black backdrop-blur-sm relative overflow-hidden"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-pink-500 blur-3xl"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 rounded-full bg-rose-500 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-pink-400 blur-3xl"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center p-12">
          <div className="text-center max-w-md">
            <div className="relative w-full h-80 mb-6">
              <Image
                src="/hero.png"
                alt="Fitness Journey"
                fill
                className="object-contain "
                priority
              />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Your Personalized Fitness Journey
            </h3>
            <p className="text-pink-600/80 dark:text-pink-400/80 text-sm leading-relaxed">
              Get a custom workout and nutrition plan tailored specifically to your goals, lifestyle, and preferences.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}