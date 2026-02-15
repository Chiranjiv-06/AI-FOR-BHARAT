# VaniSchema - Voice-First Government Scheme Navigator

<p align="center">
  <img src="https://via.placeholder.com/150/2563EB/FFFFFF?text=VaniSchema" alt="VaniSchema Logo" width="150" />
</p>

## 🚀 The Problem
Over **$50 Billion** in welfare funds go unused because rural citizens cannot navigate complex, text-heavy government portals. The digital divide is a language and literacy divide.

## 💡 The Solution
**VaniSchema** is an AI-powered, voice-first assistant that acts as a digital social worker. 
- **Speak in your language**: No typing required.
- **Find Schemes**: AI matches your need to the right government policy.
- **Auto-Fill Forms**: Just dictate your details, and the AI fills the application for you.

## 🛠️ Tech Stack (Hackathon MVP)
- **Frontend**: React (Vite) + TailwindCSS
- **Voice AI**: Web Speech API (Simulating AWS Transcribe/Polly)
- **Logic**: Client-side RAG Simulation (for offline/fast demo)
- **UI/UX**: High-contrast, accessibility-focused design with Framer Motion animations.

## 🏃‍♂️ How to Run
1. Navigate to the project folder:
   ```bash
   cd VaniSchema
   ```
2. Install dependencies (if not done):
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:5173` (or the URL shown in terminal).
5. **Grant Microphone Permissions**.

## 🎤 Demo Script for Judges
1. **Intro**: "Judges, meet VaniData. The first barrier to welfare is the keyboard. We removed it."
2. **Search**: Tap the mic. Say: **"I am a farmer and lost my crops in the rain."**
   - *Vani finds 'Pradhan Mantri Fasal Bima Yojana'.*
3. **The X-Factor**: Click **Apply Now**.
   - Say: **"My name is Ramesh Kumar, I am 45 years old, and I live in Nagpur."**
   - *Watch the form auto-fill instantly.*
4. **Closing**: "We are bridging the gap between Policy and People."
