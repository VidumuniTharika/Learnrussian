#  РусскийМир (RussoLearn Global LMS)

> A modern, interactive Learning Management System (LMS) designed for students worldwide to master the Russian language from **A1 Starter** to **C1 Advanced**.

---

## 🌟 Key Features & Modules Built

1. **🏠 Institute Home & Portal**: Hero banner with Cyrillic quote ticker (`От нуля до свободного владения`), Cyrillic soundboard teaser, CEFR level roadmap, and global student map.
2. **🔤 Interactive Cyrillic Master (Азбука)**: Complete 33-letter soundboard with native audio voice playback (`ru-RU`), IPA guides, Russian cursive writing toggle, sample vocabulary, and Cyrillic sound mini-game.
3. **📚 Course Explorer & Skill Tree**: CEFR curriculum framework (A1, A2, B1, B2) with visual skill-tree nodes and lesson preview drawers.
4. **✍️ Interactive Lesson Player & Exercise Studio**: Multi-stage lesson engine featuring vocabulary flashcards, grammar rules, drag-and-drop sentence assembly, listening quizzes, and confetti celebration rewards.
5. **⚙️ Grammar & Case Trainer Studio**: Interactive reference for all 6 Russian cases (Nominative, Genitive, Dative, Accusative, Instrumental, Prepositional) with live noun declension converter.
6. **💬 Real-World Dialogue Simulator**: Interactive chat scenarios (Ordering coffee in Moscow, buying Trans-Siberian train tickets) with audio playback and translation toggles.
7. **🏆 Gamified Student Dashboard**: Track XP, daily practice streaks, unlocked achievements, SRS saved flashcards, and global weekly leaderboard.

---

## 🚀 How to Run Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Launch Dev Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

---

## 📤 Step-by-Step GitHub Upload Guide

Follow these commands to upload this milestone to your GitHub repository step-by-step:

### Step 1: Initialize Git Repository
```bash
git init
git add .
git commit -m "feat: initialize Russian LMS architecture, 7 modules, and visual design system"
```

### Step 2: Link to Your GitHub Repository
*(Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub repo URL)*
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

## 🎨 Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Icons**: Lucide React
- **Animations & Sound**: Canvas-Confetti, Web Speech Synthesis API (`ru-RU`), Web Audio API
- **Design Tokens**: Custom CSS Glassmorphism, Google Fonts (`Playfair Display`, `Plus Jakarta Sans`, `Caveat`)
