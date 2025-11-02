# 💪 AI Fitness Coach

An intelligent, AI-powered fitness and diet planning application that generates personalized workout routines and meal plans based on individual user profiles. Built with Next.js, TypeScript, and powered by Google Gemini AI.

![AI Fitness Coach](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)

## ✨ Features

### 🎯 Core Features

- **Personalized Fitness Plans**: AI-generated 7-day workout routines tailored to your fitness level, goals, and available equipment
- **Customized Diet Plans**: Weekly meal plans that align with your dietary preferences (Vegetarian, Vegan, Keto, Paleo, etc.)
- **Comprehensive User Profiling**: Collects detailed information including:
  - Basic demographics (age, gender, height, weight)
  - Fitness goals (weight loss, muscle gain, endurance, flexibility, maintenance)
  - Fitness level (beginner, intermediate, advanced)
  - Workout location preference (home, gym, outdoor)
  - Dietary preferences and restrictions
  - Medical history and lifestyle factors (stress level, sleep hours, water intake)

### 🚀 Advanced Features

- **Text-to-Speech**: Listen to your workout or diet plan using ElevenLabs API for hands-free convenience
- **PDF Export**: Download your complete fitness and diet plan as a beautifully formatted PDF document
- **AI Image Generation**: Generate visual representations of exercises and meals using Google Imagen 3.0
- **Dark Mode Support**: Beautiful dark/light theme toggle with smooth transitions
- **Local Storage Persistence**: Your plans are automatically saved and persist across page refreshes
- **Regenerate Plans**: Generate new plans with a single click while keeping your preferences
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Polished UI with Framer Motion animations for enhanced user experience

### 📊 Plan Components

Each generated plan includes:

- **Workout Plan**:
  - 7-day weekly schedule
  - Day-by-day exercise breakdown with sets, reps, and rest times
  - Exercise notes for proper form and technique
  - Workout tips for optimal results

- **Diet Plan**:
  - 7-day meal schedule (breakfast, lunch, dinner, snacks)
  - Detailed nutritional information (calories, protein, carbs, fats)
  - Meal descriptions with ingredients
  - Dietary tips and recommendations
  - Water intake guidelines
  - Supplement recommendations (when applicable)

- **Motivation & Lifestyle**:
  - Personalized motivational quotes
  - Lifestyle tips for overall wellness
  - Holistic approach to fitness and health

## 🛠️ Tech Stack

### Frontend

- **Next.js 16.0.1** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **Framer Motion 12.23.24** - Animation library for smooth transitions
- **Lucide React 0.552.0** - Icon library
- **Sonner 2.0.7** - Toast notifications

### Backend & APIs

- **Next.js API Routes** - Server-side API endpoints
- **Google Gemini AI** (`@google/genai`, `@google/generative-ai`) - AI-powered plan generation
- **Google Imagen 3.0** - AI image generation for exercises and meals
- **ElevenLabs API** - Text-to-speech functionality

### Utilities

- **jsPDF 3.0.3** - PDF generation and export
- **html2canvas 1.4.1** - Canvas rendering for PDF export
- **Zustand 5.0.8** - State management (configured but currently using React hooks)

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## 📁 Project Structure

```
ai-fitness-guide/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate-plan/       # AI plan generation endpoint
│   │   │   ├── generate-image/      # AI image generation endpoint
│   │   │   └── text-to-speech/      # TTS endpoint
│   │   ├── layout.tsx               # Root layout with theme provider
│   │   ├── page.tsx                 # Main application page
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── UserForm.tsx             # User input form
│   │   ├── PlanDisplay.tsx          # Main plan display component
│   │   ├── WorkoutPLanView.tsx      # Workout plan visualization
│   │   ├── DietPlanView.tsx         # Diet plan visualization
│   │   ├── ImageModal.tsx           # Image generation modal
│   │   ├── Header.tsx               # Navigation header
│   │   └── ThemeProvider.tsx        # Dark/light theme provider
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── gemini.ts            # Gemini AI integration
│   │   │   └── prompt.ts            # AI prompt generation
│   │   └── exportPDF.ts             # PDF export functionality
│   └── types/
│       └── index.ts                 # TypeScript type definitions
├── public/                          # Static assets
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies and scripts
└── tsconfig.json                    # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Google Gemini API Key** - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **ElevenLabs API Key** (optional) - Get from [ElevenLabs](https://elevenlabs.io/) for text-to-speech feature

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-fitness-guide
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
npm run build
npm start
```

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | ✅ Yes | Google Gemini API key for generating fitness plans |
| `ELEVENLABS_API_KEY` | ⚠️ Optional | ElevenLabs API key for text-to-speech feature (required only if using TTS) |

## 📡 API Endpoints

### `POST /api/generate-plan`

Generates a personalized fitness and diet plan based on user details.

**Request Body:**
```json
{
  "userDetails": {
    "name": "John Doe",
    "age": 30,
    "gender": "male",
    "height": 175,
    "weight": 75,
    "fitnessGoal": "muscle_gain",
    "fitnessLevel": "intermediate",
    "workoutLocation": "gym",
    "dietaryPreference": "non_vegetarian",
    "medicalHistory": "None",
    "stressLevel": "moderate",
    "sleepHours": 7,
    "waterIntake": 2.5
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "workoutPlan": { ... },
    "dietPlan": { ... },
    "motivation": "...",
    "lifestyleTips": [ ... ]
  }
}
```

### `POST /api/generate-image`

Generates an AI image for exercises or meals.

**Request Body:**
```json
{
  "prompt": "squats exercise",
  "type": "exercise"
}
```

**Response:** Image blob

### `POST /api/text-to-speech`

Converts plan text to speech audio.

**Request Body:**
```json
{
  "text": "Your workout plan content..."
}
```

**Response:** Audio blob (MP3)

## 🎨 Key Features Explained

### Local Storage Persistence

The application automatically saves generated plans to browser local storage. This means:
- Plans persist across page refreshes
- No need to regenerate if you accidentally close the tab
- User details are also saved for easy regeneration

### AI-Powered Generation

The app uses Google Gemini AI with carefully crafted prompts to generate:
- Scientifically sound workout routines
- Nutritionally balanced meal plans
- Personalized recommendations based on user profile

### PDF Export

Export your complete plan as a PDF including:
- User profile information
- Complete workout schedule
- Full diet plan with nutritional details
- Tips and motivation quotes
- Professional formatting suitable for printing

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint for code quality
- Consistent component structure
- Type-safe API responses

## 📝 Usage Guide

1. **Fill in Your Details**: 
   - Enter your personal information
   - Select your fitness goals and level
   - Choose your dietary preferences
   - Provide any medical history or lifestyle factors

2. **Generate Your Plan**: 
   - Click "Generate Plan" and wait for AI processing
   - Your personalized plan will appear in seconds

3. **Explore Your Plan**:
   - Switch between Workout and Diet tabs
   - View detailed daily schedules
   - Read tips and recommendations
   - Listen to your plan with text-to-speech
   - Generate images for exercises/meals

4. **Export or Share**:
   - Download your plan as PDF
   - Regenerate if you want a different plan
   - Start over to create a new profile

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent plan generation
- **ElevenLabs** for high-quality text-to-speech
- **Next.js Team** for the amazing framework
- **Framer Motion** for beautiful animations

## 📧 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Built with ❤️ using Next.js, TypeScript, and AI**

