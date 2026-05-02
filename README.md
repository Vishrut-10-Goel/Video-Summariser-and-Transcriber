# 🧠 AlgoLearn — AI-Powered Algorithm Learning Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38BDF8?style=for-the-badge&logo=tailwindcss)
![Google Gemini](https://img.shields.io/badge/Gemini%20AI-2.0%20Flash-8E75B2?style=for-the-badge&logo=google)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)

**Paste a YouTube algorithm video → Get instant flashcards, quizzes, summaries & animations.**

[🚀 Live Demo](https://video-summariser-and-transcriber-2h.vercel.app/) · [📖 Documentation](#setup) · [🐛 Report Bug](https://github.com/Vishrut-10-Goel/Video-Summariser-and-Transcriber/issues)

</div>

---

## ✨ Features

- 🎥 **Video Analysis** — Paste any YouTube algorithm tutorial URL and let Gemini AI extract structured knowledge
- 📝 **Smart Summaries** — Deep technical overviews with key insights and complexity analysis
- 🃏 **Flashcards** — Flip-card active recall system for efficient memorisation
- 🎬 **Visual Animations** — Step-by-step animated demonstrations of how each algorithm works
- 🧪 **Quizzes** — 10 high-difficulty MCQ questions with detailed explanations
- 💡 **Real-World Applications** — Industry use cases for every algorithm
- 🌙 **Dark Mode** — Sleek dark theme with glassmorphism design

---

## 🖥️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.7 |
| UI | React 19 + shadcn/ui + Radix UI |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| AI Engine | Google Gemini 2.0 Flash |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 📁 Project Structure

```
├── app/
│   ├── api/generate/       # Gemini AI endpoint (POST /api/generate)
│   ├── content/
│   │   ├── [algorithm]/    # Dynamic algorithm content pages
│   │   └── custom/         # Custom video analysis page
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx            # Landing page
├── components/
│   ├── landing-page.tsx    # Hero / home screen
│   ├── ai-layout.tsx       # Content dashboard layout
│   ├── ai-loading-screen.tsx
│   └── ui/                 # shadcn/ui component library
├── lib/
│   ├── algorithm-content.ts  # Static content for supported algorithms
│   ├── url-detector.ts       # YouTube URL → algorithm ID mapper
│   ├── types.ts
│   └── utils.ts
└── public/                 # Static assets
```

---

## 🚀 Setup

### Prerequisites
- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/Vishrut-10-Goel/Video-Summariser-and-Transcriber.git
cd Video-Summariser-and-Transcriber
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
GOOGLE_API_KEY=your_gemini_api_key_here
```

> Get your free API key at [Google AI Studio](https://aistudio.google.com/app/apikey)

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Live Deployment

> **🚀 Live URL:** [https://video-summariser-and-transcriber-2h.vercel.app/](https://video-summariser-and-transcriber-2h.vercel.app/)

## 🌐 Deploying Your Own Instance

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import this repository
4. Add the environment variable:
   - **Key:** `GOOGLE_API_KEY`
   - **Value:** your Gemini API key
5. Click **Deploy** — Vercel auto-detects Next.js ✅

---

## 🎯 Supported Algorithms

| Algorithm | Category | Time Complexity |
|-----------|----------|-----------------|
| A* Pathfinding | Graph Search | O(b^d) |
| Breadth-First Search (BFS) | Graph Traversal | O(V + E) |
| Depth-First Search (DFS) | Graph Traversal | O(V + E) |
| Alpha-Beta Pruning | AI Game Trees | O(b^(d/2)) |
| N-Queens Problem | Backtracking | O(N!) |
| Prim's Algorithm | Minimum Spanning Tree | O(E log V) |
| Kruskal's Algorithm | Minimum Spanning Tree | O(E log E) |
| 0/1 Knapsack | Dynamic Programming | O(nW) |
| Fractional Knapsack | Greedy | O(n log n) |
| Longest Common Subsequence | Dynamic Programming | O(mn) |
| Huffman Coding | Greedy | O(n log n) |
| Hamiltonian Cycle | Backtracking | O(N!) |
| OBST | Dynamic Programming | O(n³) |

> The platform also supports **any custom algorithm video** via the AI analysis engine.

---

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_API_KEY` | Google Gemini API key for AI content generation | ✅ Yes |

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Google Gemini](https://deepmind.google/technologies/gemini/) for the AI backbone
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Vercel](https://vercel.com/) for seamless deployment

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/Vishrut-10-Goel">Vishrut Goel</a>
</div>
