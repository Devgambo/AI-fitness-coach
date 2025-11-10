export interface UserDetails {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // in cm
  weight: number; // in kg
  fitnessGoal: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'endurance' | 'flexibility';
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  workoutLocation: 'home' | 'gym' | 'outdoor';
  dietaryPreference: 'vegetarian' | 'non_vegetarian' | 'vegan' | 'keto' | 'paleo';
  medicalHistory?: string;
  stressLevel?: 'low' | 'moderate' | 'high';
  sleepHours?: number;
  waterIntake?: number; // liters per day
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  restTime: string;
  notes?: string;
}

export interface DayWorkout {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface Meal {
  name: string;
  description: string;
  calories?: number;
  protein?: string;
  carbs?: string;
  fats?: string;
}

export interface DayMeal {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
}

export interface WorkoutPlan {
  weeklyPlan: DayWorkout[];
  tips: string[];
}

export interface DietPlan {
  weeklyPlan: DayMeal[];
  tips: string[];
  waterIntake: string;
  supplements?: string[];
}

export interface FitnessPlan {
  workoutPlan: WorkoutPlan;
  dietPlan: DietPlan;
  motivation: string;
  lifestyleTips: string[];
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface GeneratePlanRequest {
  userDetails: UserDetails;
}

export interface GeneratePlanResponse {
  success: boolean;
  data?: FitnessPlan;
  error?: string;
}
