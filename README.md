# Tense Playground 🎮

An interactive web application for mastering English tenses through games, quizzes, and exercises. Built with Next.js, TypeScript, and Tailwind CSS.

![Tense Playground Home](https://raw.githubusercontent.com/dharam-gfx/tense-playground/refs/heads/master/public/tense-playground-home.png)

## ✨ Features

### 🤖 AI-Powered Features
- **Tensey Chat** - AI-powered grammar assistant chatbot for instant help with English tenses and grammar questions
- **Sentence Analyzer** - AI-powered tense detection with detailed breakdown (subject, verb, object, auxiliary verbs)
- **Smart Translation** - AI-enhanced translation with grammar notes and tense identification
- **Grammar Insights** - Get explanations, alternative tense suggestions, and confidence scores

### 📚 Learning Tools
- **Playground** - Explore all 12 English tenses with examples and explanations
- **Sentence Builder** - Build sentences by arranging words in the correct order
- **Word Rainfall** - Catch falling words in the correct order to form sentences
- **Quiz System** - Test your knowledge with multiple difficulty levels
- **Translation Tool** - Practice translating between languages with AI assistance
- **Tips & Tricks** - Helpful grammar tips and memory aids

### 🏆 Gamification System

#### Daily Challenges
- Complete 3 quiz questions correctly
- Build 5 sentences in Sentence Builder
- Score 100+ points in Word Rainfall

#### Weekly Challenges
- Maintain a 7-day streak
- Master all 12 tenses
- Achieve a perfect score (100% accuracy)

#### Badges & Achievements
| Badge | Description |
|-------|-------------|
| 🌟 First Steps | Complete your first lesson |
| ⚡ Quick Learner | Complete 10 lessons |
| 🏅 Grammar Guru | Complete all easy levels |
| 🔥 Streak Master | Maintain a 30-day streak |
| ✅ Perfect Score | Get 100% in any quiz |
| ⏰ Time Traveler | Master all 12 tenses |

#### XP Rewards
- Daily challenges: 50-100 XP each
- Weekly challenges: 300-750 XP each
- Badges: 25-200 XP each

### 🔥 Streak System
- Track consecutive days of practice
- View current streak, longest streak, and total days
- Streaks reset if you miss a day

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tense-playground

# Install dependencies
npm install
# or
pnpm install

# Run the development server
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **AI**: Google Gemini AI (gemini-3.5-flash-lite)
- **State Management**: React Context + Hooks
- **Storage**: localStorage for progress persistence
- **Analytics**: Vercel Analytics

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/ai/            # AI API routes
│   │   ├── analyze/       # Sentence analysis endpoint
│   │   ├── assistant/     # Chat assistant endpoint
│   │   └── translate/     # AI translation endpoint
│   ├── builder/           # Sentence Builder page
│   ├── challenges/        # Challenges & Streaks page
│   ├── game/rainfall/     # Word Rainfall game
│   ├── playground/        # Tense exploration
│   ├── quiz/              # Quiz system
│   ├── tips/              # Grammar tips
│   └── translate/         # Translation tool
├── components/
│   ├── challenges/        # Challenge tracking components
│   ├── chat/              # Tensey AI chatbot component
│   ├── common/            # Shared UI components
│   ├── game/              # Game components
│   ├── layout/            # Header, Footer
│   ├── providers/         # Context providers
│   ├── quiz/              # Quiz components
│   └── ui/                # shadcn/ui components
├── data/
│   ├── sentence/          # Sentence data (easy, medium, hard)
│   ├── tenses/            # Tense definitions
│   └── tips.json          # Grammar tips
├── hooks/                 # Custom React hooks
│   ├── use-challenges.ts  # Challenge progress tracking
│   ├── use-local-storage.ts
│   ├── use-progress.ts
│   └── use-streak.ts
├── services/
│   └── ai-service.ts      # AI service functions
└── lib/                   # Utility functions
```

## 🎯 Key Hooks

### `useStreakContext`
Tracks user's daily practice streak across the app.

```tsx
const { currentStreak, longestStreak, totalDays, recordActivity } = useStreakContext()
```

### `useChallenges`
Manages daily/weekly challenge progress and badge achievements.

```tsx
const { 
  getDailyChallenges,
  getWeeklyChallenges,
  getBadges,
  recordQuizQuestion,
  recordSentenceBuilt,
  recordRainfallScore
} = useChallenges()
```

### AI Service Functions
Powered by Google Gemini AI for intelligent grammar assistance.

```tsx
import { analyzeSentence, translateText, askAiAssistant } from '@/services/ai-service'

// Analyze sentence for tense detection
const analysis = await analyzeSentence("She has been working all day")
// Returns: detectedTense, formula, breakdown, alternativeTenses, etc.

// AI-powered translation with grammar notes
const translation = await translateText("Hello world", "hi", "en")
// Returns: translatedText, tenseUsed, formula, grammarNotes

// Chat with Tensey AI assistant
const response = await askAiAssistant("Explain present perfect tense")
// Returns: reply, suggestions, relatedTopics
```

## 🔑 Environment Variables

```bash
# Required for AI features
GEMINI_API_KEY=your_google_gemini_api_key
```

## 🌐 Multi-language Support

The app supports multiple languages for sentence translations:
- English (en)
- Hindi (hi)
- Telugu (te)
- Tamil (ta)
- Kannada (kn)
- Malayalam (ml)
- Marathi (mr)

## 📱 Responsive Design

Fully responsive design that works on:
- Desktop
- Tablet
- Mobile devices

## 🎨 Theme Support

- Light mode
- Dark mode
- System preference detection

## 📄 License

MIT License - feel free to use this project for learning and personal use.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ for language learners everywhere
