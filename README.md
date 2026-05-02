# Algorithm Learning Platform

A modern, interactive platform for learning algorithms through video analysis.

## User Flow

1. **Home Page** (`/`) - Minimal landing page with "Analyse Video" button
2. **Analyze Page** (`/analyze`) - URL input form where users paste YouTube links
3. **Content Dashboard** (`/content/[algorithm]`) - 5-section dashboard with:
   - Summary - Overview and key characteristics
   - Flashcards - Interactive learning cards (flip to reveal answers)
   - Animations - Visual demonstrations of the algorithm
   - Quiz - Multiple choice questions
   - Important Content - Key takeaways and insights

## Supported Algorithms

The platform supports analysis of 5 core algorithms:

- **A\* Pathfinding** (iTG7NjQu0Qs)
- **BFS** (pcKY4hjDrxk)
- **DFS** (xFv_Hl4B83A)
- **Alpha-Beta Pruning** (l-hh51ncgDI)
- **N-Queens Problem** (nqueens)

## Design

- **Dark Theme** - Modern dark background (#0a0e27) with purple/indigo/violet accents
- **Minimalist Home** - Single CTA button, animated background
- **Glassmorphism** - Semi-transparent cards with backdrop blur
- **Smooth Animations** - Framer Motion for all transitions and interactions

## Technology Stack

- Next.js 16+ with App Router
- React 19+
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui components
- Lucide React icons

## Setup

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
