# 🤝 Contributing to AlgoLearn

Thank you for your interest in contributing! Here's how to get started:

## Getting Started

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Video-Summariser-and-Transcriber.git
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. Make your changes and commit:
   ```bash
   git commit -m "feat: add your feature"
   ```
5. Push and open a **Pull Request**

## Guidelines

- Follow the existing code style (TypeScript + Tailwind)
- Add new algorithms to `lib/algorithm-content.ts`
- Keep components focused and reusable
- Test your changes locally with `npm run dev` before submitting

## Adding a New Algorithm

1. Add its content entry in `lib/algorithm-content.ts`
2. Map its YouTube video ID in `lib/url-detector.ts`
3. That's it — the dashboard renders it automatically!

## Reporting Bugs

Open an [issue](https://github.com/Vishrut-10-Goel/Video-Summariser-and-Transcriber/issues) with:
- Steps to reproduce
- Expected vs actual behaviour
- Screenshots if applicable
