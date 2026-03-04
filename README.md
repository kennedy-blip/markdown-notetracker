# 📝 Modern Markdown Note-Taker

A high-performance, real-time Markdown editor built with **React**, **TypeScript**, and **Tailwind CSS**. Designed for speed, accessibility, and focus.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## ✨ Features

- **⚡ Real-time Preview:** See your Markdown rendered as HTML instantly as you type.
- **📁 File Management:** Create, rename, and delete multiple notes with local persistence.
- **💾 Auto-Save:** Never lose work; notes are automatically saved to `localStorage`.
- **📥 Export:** Download your notes as standard `.md` files.
- **🌓 Dark Mode:** Toggle between light and dark themes for the preview pane.
- **🔍 Focus Mode:** Collapse the sidebar and preview for a distraction-free writing experience.
- **📊 Live Stats:** Real-time word count, character count, and reading time estimator.
- **♿ Accessible:** Fully compliant with ARIA labels and keyboard navigation.

## 🚀 Tech Stack

- **Framework:** React 18+ (Vite)
- **Styling:** Tailwind CSS (Typography Plugin)
- **Icons:** Lucide React
- **Parsing:** React-Markdown & Remark-GFM
- **Syntax Highlighting:** Prism (via React-Syntax-Highlighter)

## 🛠️ Installation & Setup

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/markdown-notes.git](https://github.com/YOUR_USERNAME/markdown-notes.git)
   cd markdown-notes
   npm install
   npm run dev
   npm run build