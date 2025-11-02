# 💪 AI Fitness Coach App

An AI-powered fitness assistant built with **Next.js** that generates **personalized workout and diet plans** using LLMs. It includes voice and image generation features for an immersive experience.

![AI Fitness Coach](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

---

## 🚀 Features

### 📝 Personalized Input Form
Users can provide detailed information:
- **Basic Info**: Name, Age, Gender
- **Physical Stats**: Height & Weight
- **Fitness Goals**: Weight Loss, Muscle Gain, Maintenance, Endurance, Flexibility
- **Fitness Level**: Beginner, Intermediate, Advanced
- **Preferences**: Workout Location (Home/Gym/Outdoor), Dietary Preferences (Veg/Non-Veg/Vegan/Keto/Paleo)
- **Optional Fields**: Medical history, stress level, sleep hours, water intake

### 🧠 AI-Powered Plan Generation
- Uses **OpenAI**, **Gemini**, **Claude**, or **xAI** APIs
- Generates personalized **7-day workout plans** with:
  - Daily exercise routines
  - Sets, reps, and rest times
  - Form tips and notes
- Creates **7-day diet plans** with:
  - Breakfast, lunch, dinner, and snacks
  - Calorie and macro breakdowns
  - Meal descriptions

### 🔊 Voice Features (ElevenLabs)
- **Text-to-Speech**: Listen to your workout or diet plan
- Natural voice narration of plan details

### 🖼️ AI Image Generation
- Click any exercise or meal to generate AI images
- Powered by **OpenAI DALL-E** or **Replicate**
- Visual representations of workouts and foods

### 📄 Export to PDF
- Download your complete fitness plan as a PDF
- Professionally formatted with all details

### ✨ Additional Features
- 🌗 **Dark/Light Mode** with persistent preference
- 💬 **Daily Motivation Quotes** powered by AI
- 🔄 **Regenerate Plan** option
- 📱 **Fully Responsive** design
- 🎨 **Smooth Animations** with Framer Motion
- 💾 **Local Storage** support

---

## 🛠️ Tech Stack

| Category | Tools |
|----------|-------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **AI APIs** | OpenAI / Gemini / Claude / xAI |
| **Voice** | ElevenLabs |
| **Images** | OpenAI DALL-E / Replicate |
| **PDF Export** | jsPDF |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |

---

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- API keys for at least one AI provider (see below)

### Steps

1. **Clone the repository**
```bash
cd ai-fitness-coach
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:
```env
# Choose your AI provider (openai, gemini, claude, xai)
AI_PROVIDER=openai

# OpenAI API Key (if using OpenAI)
OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini API Key (if using Gemini)
GEMINI_API_KEY=your_gemini_api_key_here

# Anthropic Claude API Key (if using Claude)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# xAI API Key (if using xAI)
XAI_API_KEY=your_xai_api_key_here

# ElevenLabs API Key for Text-to-Speech
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Replicate API Key (optional for image generation)
REPLICATE_API_KEY=your_replicate_api_key_here
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔑 Getting API Keys

### OpenAI
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up and navigate to API Keys
3. Create a new API key

### Google Gemini
1. Go to [ai.google.dev](https://ai.google.dev)
2. Sign in and get API key from Google AI Studio

### Anthropic Claude
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up and create an API key

### xAI
1. Go to [x.ai](https://x.ai)
2. Sign up for API access

### ElevenLabs
1. Go to [elevenlabs.io](https://elevenlabs.io)
2. Sign up and get API key from profile settings

### Replicate (Optional)
1. Go to [replicate.com](https://replicate.com)
2. Sign up and get API token

---

## 🎯 Usage

1. **Fill out the form** with your personal details and fitness goals
2. **Click "Generate My Fitness Plan"** to create your personalized plan
3. **View your plan** with tabs for Workout and Diet
4. **Click the speaker icon** to listen to your plan
5. **Click image icons** on exercises/meals to generate visuals
6. **Export to PDF** to save your plan
7. **Regenerate** if you want a new plan with the same details
8. **Start Over** to enter new information

---

## 📁 Project Structure

```
ai-fitness-coach/
├── app/
│   ├── api/
│   │   ├── generate-plan/route.ts    # AI plan generation endpoint
│   │   ├── text-to-speech/route.ts   # ElevenLabs TTS endpoint
│   │   └── generate-image/route.ts   # Image generation endpoint
│   ├── globals.css                    # Global styles
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Home page
├── components/
│   ├── Header.tsx                     # App header with theme toggle
│   ├── ThemeProvider.tsx              # Dark mode context
│   ├── UserForm.tsx                   # Input form component
│   ├── PlanDisplay.tsx                # Main plan display
│   ├── WorkoutPlanView.tsx            # Workout plan display
│   ├── DietPlanView.tsx               # Diet plan display
│   └── ImageModal.tsx                 # Image generation modal
├── lib/
│   ├── ai/
│   │   ├── openai.ts                  # OpenAI integration
│   │   ├── gemini.ts                  # Gemini integration
│   │   ├── claude.ts                  # Claude integration
│   │   ├── xai.ts                     # xAI integration
│   │   └── prompt.ts                  # Prompt engineering
│   └── exportPDF.ts                   # PDF generation utility
├── types/
│   └── index.ts                       # TypeScript types
├── .env.example                       # Environment variables template
├── tailwind.config.ts                 # Tailwind configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Dependencies
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Add environment variables
5. Deploy!

---

## 🎨 Customization

### Change AI Provider
Update `AI_PROVIDER` in your `.env.local`:
```env
AI_PROVIDER=gemini  # or openai, claude, xai
```

### Customize Colors
Edit `tailwind.config.ts` to change the color scheme.

### Add More Features
- Modify prompt in `lib/ai/prompt.ts` for different plan structures
- Extend `types/index.ts` for additional fields
- Add more API routes in `app/api/`

---

## 🐛 Troubleshooting

**Issue**: API key errors
- **Solution**: Double-check your `.env.local` file and ensure API keys are valid

**Issue**: Build errors
- **Solution**: Run `npm install` again and ensure Node.js version is 18+

**Issue**: PDF export not working
- **Solution**: Clear browser cache and try again

**Issue**: Images not generating
- **Solution**: Check if image generation API is configured correctly

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- OpenAI for GPT models
- Google for Gemini
- Anthropic for Claude
- ElevenLabs for TTS
- Next.js team for the amazing framework

---

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ using AI and Next.js**
