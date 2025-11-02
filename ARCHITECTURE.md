# 🏗️ Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    Next.js App                        │  │
│  │                                                        │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │  │
│  │  │   UserForm   │  │ PlanDisplay  │  │   Header   │ │  │
│  │  │              │  │              │  │  (Theme)   │ │  │
│  │  │ - Input      │  │ - Workout    │  │            │ │  │
│  │  │ - Validation │  │ - Diet       │  └────────────┘ │  │
│  │  │              │  │ - Export PDF │                 │  │
│  │  └──────────────┘  │ - Voice      │                 │  │
│  │                    │ - Images     │                 │  │
│  │                    └──────────────┘                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                      API ROUTES (Next.js)                    │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ /api/        │  │ /api/        │  │ /api/        │      │
│  │ generate-    │  │ text-to-     │  │ generate-    │      │
│  │ plan         │  │ speech       │  │ image        │      │
│  │              │  │              │  │              │      │
│  │ - Validate   │  │ - ElevenLabs │  │ - DALL-E     │      │
│  │ - Route to   │  │   Integration│  │ - Replicate  │      │
│  │   AI Provider│  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                      AI PROVIDERS                             │
│                                                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────┐  │
│  │  OpenAI    │  │   Gemini   │  │   Claude   │  │ xAI  │  │
│  │            │  │            │  │            │  │      │  │
│  │  GPT-4     │  │  Gemini    │  │  Claude 3  │  │ Grok │  │
│  │  Turbo     │  │  Pro       │  │  Sonnet    │  │      │  │
│  └────────────┘  └────────────┘  └────────────┘  └──────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

```
1. USER INPUT
   │
   ├─> UserForm Component
   │   ├─> Validates input
   │   ├─> Calculates BMI
   │   └─> Submits to API
   │
   ▼
2. API REQUEST
   │
   ├─> /api/generate-plan
   │   ├─> Checks AI_PROVIDER env
   │   ├─> Generates prompt
   │   ├─> Calls selected AI provider
   │   └─> Returns structured JSON
   │
   ▼
3. AI PROCESSING
   │
   ├─> Prompt Engineering
   │   ├─> User profile
   │   ├─> Fitness goals
   │   ├─> Dietary preferences
   │   └─> Medical considerations
   │
   ├─> LLM Generation
   │   ├─> 7-day workout plan
   │   ├─> 7-day diet plan
   │   ├─> Motivation quote
   │   └─> Lifestyle tips
   │
   ▼
4. RESPONSE
   │
   ├─> PlanDisplay Component
   │   ├─> Workout tab
   │   ├─> Diet tab
   │   └─> Action buttons
   │
   ├─> Optional Features
   │   ├─> Voice narration
   │   ├─> Image generation
   │   └─> PDF export
   │
   ▼
5. USER ACTIONS
   │
   ├─> Listen to plan
   ├─> View exercise images
   ├─> View meal images
   ├─> Export to PDF
   ├─> Regenerate plan
   └─> Start over
```

---

## Component Hierarchy

```
App (page.tsx)
│
├── Header
│   └── ThemeProvider
│       └── Theme Toggle Button
│
├── Main Content
│   │
│   ├── [Before Plan Generation]
│   │   └── UserForm
│   │       ├── Basic Info Fields
│   │       ├── Physical Stats
│   │       ├── Goals & Preferences
│   │       └── Optional Fields
│   │
│   └── [After Plan Generation]
│       └── PlanDisplay
│           ├── Action Buttons
│           │   ├── Start Over
│           │   ├── Read Plan (Voice)
│           │   ├── Export PDF
│           │   └── Regenerate
│           │
│           ├── Motivation Section
│           │
│           ├── Tab Navigation
│           │   ├── Workout Tab
│           │   └── Diet Tab
│           │
│           ├── [Workout Tab Content]
│           │   └── WorkoutPlanView
│           │       ├── Day Cards (7 days)
│           │       │   └── Exercise List
│           │       │       └── Image Button → ImageModal
│           │       └── Workout Tips
│           │
│           ├── [Diet Tab Content]
│           │   └── DietPlanView
│           │       ├── Day Cards (7 days)
│           │       │   ├── Breakfast → Image Button
│           │       │   ├── Lunch → Image Button
│           │       │   ├── Dinner → Image Button
│           │       │   └── Snacks → Image Buttons
│           │       ├── Diet Tips
│           │       └── Hydration Info
│           │
│           └── Lifestyle Tips
│
└── Footer
```

---

## API Integration Flow

### 1. Plan Generation API

```
POST /api/generate-plan
│
├── Input: UserDetails
│   ├── name, age, gender
│   ├── height, weight
│   ├── fitnessGoal
│   ├── fitnessLevel
│   ├── workoutLocation
│   ├── dietaryPreference
│   └── optional fields
│
├── Processing:
│   ├── Select AI provider (env)
│   ├── Generate prompt
│   ├── Call AI API
│   └── Parse response
│
└── Output: FitnessPlan
    ├── workoutPlan
    │   ├── weeklyPlan (7 days)
    │   └── tips
    ├── dietPlan
    │   ├── weeklyPlan (7 days)
    │   ├── tips
    │   ├── waterIntake
    │   └── supplements
    ├── motivation
    └── lifestyleTips
```

### 2. Text-to-Speech API

```
POST /api/text-to-speech
│
├── Input: { text: string }
│
├── Processing:
│   ├── ElevenLabs API call
│   ├── Voice ID selection
│   └── Generate audio
│
└── Output: Audio file (mp3)
```

### 3. Image Generation API

```
POST /api/generate-image
│
├── Input: { prompt: string, type: 'exercise' | 'meal' }
│
├── Processing:
│   ├── Enhance prompt
│   ├── Select provider (OpenAI/Replicate)
│   └── Generate image
│
└── Output: { imageUrl: string }
```

---

## State Management

```
App State (React useState)
│
├── plan: FitnessPlan | null
│   └── Holds generated plan data
│
├── userDetails: UserDetails | null
│   └── Stores user input
│
├── loading: boolean
│   └── API request state
│
└── activeTab: 'workout' | 'diet'
    └── Current view

Theme State (ThemeProvider Context)
│
├── theme: 'light' | 'dark'
└── toggleTheme: () => void

Component State (per component)
│
├── WorkoutPlanView
│   └── expandedDays: Set<number>
│
├── DietPlanView
│   └── expandedDays: Set<number>
│
├── ImageModal
│   ├── imageUrl: string | null
│   ├── loading: boolean
│   └── error: boolean
│
└── UserForm
    └── formData: UserDetails
```

---

## File Structure Logic

```
Root
│
├── app/                    # Next.js 14 App Router
│   ├── api/               # Server-side API routes
│   │   ├── generate-plan/ # Plan generation logic
│   │   ├── text-to-speech/# Voice synthesis
│   │   └── generate-image/# Image generation
│   │
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main page (home)
│   └── globals.css        # Global styles
│
├── components/            # React components
│   ├── Header.tsx         # Navigation & theme
│   ├── ThemeProvider.tsx  # Dark mode context
│   ├── UserForm.tsx       # Input form
│   ├── PlanDisplay.tsx    # Plan orchestrator
│   ├── WorkoutPlanView.tsx# Workout UI
│   ├── DietPlanView.tsx   # Diet UI
│   └── ImageModal.tsx     # Image popup
│
├── lib/                   # Utility functions
│   ├── ai/               # AI provider integrations
│   │   ├── openai.ts     # OpenAI logic
│   │   ├── gemini.ts     # Gemini logic
│   │   ├── claude.ts     # Claude logic
│   │   ├── xai.ts        # xAI logic
│   │   └── prompt.ts     # Prompt engineering
│   │
│   └── exportPDF.ts      # PDF generation
│
└── types/                # TypeScript definitions
    └── index.ts          # All type definitions
```

---

## Environment Configuration

```
.env.local
│
├── AI_PROVIDER           # Which AI to use
│   ├── "openai"         # Default
│   ├── "gemini"
│   ├── "claude"
│   └── "xai"
│
├── AI API Keys
│   ├── OPENAI_API_KEY
│   ├── GEMINI_API_KEY
│   ├── ANTHROPIC_API_KEY
│   └── XAI_API_KEY
│
└── Feature API Keys
    ├── ELEVENLABS_API_KEY  # Voice
    └── REPLICATE_API_KEY   # Images
```

---

## Key Technologies

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animations
- **Lucide React**: Icons
- **Sonner**: Toast notifications

### Backend (API Routes)
- **Next.js API Routes**: Serverless functions
- **AI SDKs**: Direct API calls
- **jsPDF**: PDF generation
- **ElevenLabs**: TTS

### AI Providers
- **OpenAI**: GPT-4 Turbo, DALL-E 3
- **Google**: Gemini Pro
- **Anthropic**: Claude 3
- **xAI**: Grok

---

## Security Considerations

✅ API keys stored in environment variables
✅ Server-side API calls (keys never exposed to client)
✅ Input validation on both client and server
✅ Error handling with user-friendly messages
✅ Rate limiting considerations (provider-level)
✅ No sensitive data storage (currently stateless)

---

## Performance Optimizations

✅ Server-side rendering (SSR)
✅ Code splitting (automatic with Next.js)
✅ Image optimization (Next.js Image component)
✅ Lazy loading for modals
✅ Efficient state updates
✅ Memoization where needed
✅ Tailwind CSS purging

---

This architecture provides:
- 🎯 Clean separation of concerns
- 🔧 Easy to maintain and extend
- 🚀 Scalable design
- 🎨 Modular components
- 🔒 Secure API handling
- ⚡ Fast performance
