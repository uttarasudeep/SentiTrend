# SentiTrend — Vibrant Social Pulse Dashboard

A high-energy, modern social-media sentiment intelligence dashboard for real-time stream processing.

Redesigned with the **Vibrant Social Pulse** identity:
- **Canvas:** Vibrant soft lavender/periwinkle background (`#F1EEFF`) with subtle ambient depth shapes
- **Sidebar:** Deep violet / plum (`#5B3CC4`) with electric turquoise active highlights and live status indicators
- **Surfaces:** Crisp white cards (`#FFFFFF`) with soft periwinkle borders (`#E3DCFC`) and gentle hover lifts
- **4-Color System:** Deep Violet (`#5B3CC4`), Electric Turquoise (`#12B8B0`), Coral (`#FF5C69`), and Warm Yellow (`#FFC857`)
- **Typography:** Plus Jakarta Sans applied globally across headings, metrics, tables, and tooltips
- **Asymmetric Composition:** Dominant **SENTIMENT PULSE** temporal trajectory chart, **SENTIMENT SHARE** proportional bars, **TRENDING TOPICS** channel virality rankings, and **RECENT SOCIAL ACTIVITY** live wire cards

Built with **React**, **Vite**, **Tailwind CSS**, and **Recharts**.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** v18+ (tested on Node.js v26)
- **npm** v9+

### 2. Install & Run
From the `frontend` folder:
```bash
npm install
npm run dev
```

Open **[http://localhost:5173](http://localhost:5173)** in your web browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🔌 Connecting to the Live Backend

When you want to connect to the live streaming backend:
1. Start the backend API server in a separate terminal:
   ```bash
   python api_server.py
   ```
2. In the dashboard top bar, click the **"Source: Mock"** button to toggle to **"Source: Live:8000"** (or configure `VITE_USE_MOCK=false` in `.env`).
