import { UserDetails } from "@/types";

export function generatePrompt(userDetails: UserDetails): string {
  const {
    name,
    age,
    gender,
    height,
    weight,
    fitnessGoal,
    fitnessLevel,
    workoutLocation,
    dietaryPreference,
    medicalHistory,
    stressLevel,
    sleepHours,
    waterIntake,
  } = userDetails;

  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

  const goalDescriptions: Record<string, string> = {
    weight_loss: "lose weight and burn fat",
    muscle_gain: "build muscle and increase strength",
    maintenance: "maintain current fitness level",
    endurance: "improve cardiovascular endurance",
    flexibility: "improve flexibility and mobility",
  };

  const levelDescriptions: Record<string, string> = {
    beginner: "beginner with little to no experience",
    intermediate: "intermediate with some fitness experience",
    advanced: "advanced with extensive fitness experience",
  };

  const locationDescriptions: Record<string, string> = {
    home: "home with minimal equipment",
    gym: "gym with full equipment access",
    outdoor: "outdoor settings",
  };

  const dietDescriptions: Record<string, string> = {
    vegetarian: "vegetarian (no meat)",
    non_vegetarian: "non-vegetarian (includes all foods)",
    vegan: "vegan (no animal products)",
    keto: "ketogenic (low carb, high fat)",
    paleo: "paleo (whole foods, no processed)",
  };

  return `
Create a comprehensive, personalized fitness plan for ${name}.

**User Profile:**
- Age: ${age} years old
- Gender: ${gender}
- Height: ${height} cm
- Weight: ${weight} kg
- BMI: ${bmi}
- Fitness Goal: ${goalDescriptions[fitnessGoal]}
- Fitness Level: ${levelDescriptions[fitnessLevel]}
- Workout Location: ${locationDescriptions[workoutLocation]}
- Dietary Preference: ${dietDescriptions[dietaryPreference]}
${medicalHistory ? `- Medical History: ${medicalHistory}` : ""}
${stressLevel ? `- Stress Level: ${stressLevel}` : ""}
${sleepHours ? `- Sleep: ${sleepHours} hours per night` : ""}
${waterIntake ? `- Current Water Intake: ${waterIntake} liters per day` : ""}

**Requirements:**
Generate a JSON object with the following exact structure. Use descriptive, clear names and proper formatting:

{
  "workoutPlan": {
    "weeklyPlan": [
      {
        "day": "Day 1: [Day Name]",
        "focus": "[Primary Focus] ([Level]-specific description)",
        "exercises": [
          {
            "name": "[Exercise Name] (variations if applicable)",
            "sets": 3,
            "reps": "[number] or [time format like '30 seconds']",
            "restTime": "[X] seconds rest",
            "notes": "Brief form/technique tip"
          }
        ]
      }
    ],
    "tips": ["Actionable workout tip 1", "Actionable workout tip 2", "Actionable workout tip 3"]
  },
  "dietPlan": {
    "weeklyPlan": [
      {
        "day": "Day 1",
        "breakfast": {
          "name": "Descriptive Meal Name",
          "description": "Brief 1-sentence description with key ingredients",
          "calories": 400,
          "protein": "25g",
          "carbs": "50g",
          "fats": "15g"
        },
        "lunch": {
          "name": "Descriptive Meal Name",
          "description": "Brief 1-sentence description",
          "calories": 550,
          "protein": "35g",
          "carbs": "60g",
          "fats": "18g"
        },
        "dinner": {
          "name": "Descriptive Meal Name",
          "description": "Brief 1-sentence description",
          "calories": 500,
          "protein": "30g",
          "carbs": "45g",
          "fats": "20g"
        },
        "snacks": [
          {
            "name": "Snack Name",
            "description": "Brief description"
          }
        ]
      }
    ],
    "tips": ["Practical diet tip 1", "Practical diet tip 2", "Practical diet tip 3"],
    "waterIntake": "[X] liters per day",
    "supplements": ["Supplement 1 (if beneficial)", "Supplement 2 (optional)"]
  },
  "motivation": "One powerful, inspiring motivational quote",
  "lifestyleTips": ["Lifestyle tip 1", "Lifestyle tip 2", "Lifestyle tip 3", "Lifestyle tip 4"]
}

**Important Guidelines:**
1. **Workout Plan (7 days):**
   - Day format: "Day 1: Full Body Strength A" or "Day 2: Upper Body Push"
   - Focus format: "[Primary Target] ([Level]-friendly, [equipment] based)"
   - Include 4-6 exercises per active day
   - Add 1-2 rest/recovery days (focus: "Active Recovery" or "Rest Day")
   - Exercise names: Be specific (e.g., "Squats (Bodyweight or Dumbbells if available)")
   - Reps: Use formats like "12", "10 per arm", "30 seconds", "8-10"
   - Rest times: "60 seconds rest", "45 seconds rest", etc.
   - Notes: One practical tip per exercise about form or breathing

2. **Diet Plan (7 days):**
   - Match ${dietDescriptions[dietaryPreference]} preference strictly
   - Meal names: Descriptive and appetizing (e.g., "Protein-Packed Veggie Omelette")
   - Descriptions: One sentence with main ingredients/preparation
   - Calories: Align with ${goalDescriptions[fitnessGoal]} (deficit for loss, surplus for gain)
   - Include 1-2 healthy snacks per day
   - Total daily calories: ${fitnessGoal === 'weight_loss' ? '1600-1800' : fitnessGoal === 'muscle_gain' ? '2200-2500' : '1800-2000'}

3. **Quality Standards:**
   - All exercises must be appropriate for ${levelDescriptions[fitnessLevel]} and ${locationDescriptions[workoutLocation]}
   - Progressive difficulty throughout the week
   - Include warm-up exercises for Day 1
   - Tips should be actionable and specific
${medicalHistory ? `   - IMPORTANT: Account for medical history: ${medicalHistory}` : ""}
   - Motivation quote: Inspirational, fitness-related, 10-20 words

**Critical:** Return ONLY valid JSON. No markdown, no explanations, no code blocks. Start with { and end with }.
`;
}
