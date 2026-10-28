# SentiTrend — Modern Editorial Social Intelligence Dashboard

A modern, information-dense, newsroom-style sentiment analytics platform for real-time social streams.

Redesigned with a **Modern Editorial Social Intelligence** design language: clean off-white background, crisp charcoal typography, left sidebar navigation, horizontal sentiment share distribution bars, financial-grade sentiment frequency line charts, ranked topic activity list, and live intelligence wire feed.

Built with **React**, **Vite**, **Tailwind CSS**, and **Recharts**.

---

## 🎨 New Design Architecture

* **Layout:** Persistent left sidebar navigation (`Overview`, `Live Posts`, `Sentiment`, `Topics`) + responsive collapsible drawer for mobile.
* **Header / Top Bar:** Editorial breadcrumb (`SentiTrend / Overview`), live sync clock, mode switch (`Mock` / `Live:8000`), evaluation error simulator, and refresh control.
* **Summary Metrics:** Editorial KPI band with thin accent borders (`Total Posts`, `Positive Sentiment`, `Negative Sentiment`, `Neutral Sentiment`, `Avg Polarity Score`).
* **Sentiment Frequency Over Time:** Financial-grade line chart featuring positive (emerald), negative (red), and neutral (slate) trajectories with a `24H | 7D | 30D` range selector.
* **Sentiment Distribution (Option A):** Horizontal sentiment ratio bars with exact percentages, counts, and a composite 100% proportional benchmark bar.
* **Topic Activity Ranking:** Newsroom-style trending topics list ranked by post volume with relative activity bars and dominant sentiment indicators. Clicking any topic instantly filters the live feed!
* **Live Intelligence Wire:** Editorial feed/list displaying sentiment status dots, post excerpts (expandable for full text), topic tags, timestamps, and VADER scores.
* **Toolbar & Pagination:** Compact toolbar filters (`All Sentiments`, `All Topics`, keyword search) and clean, numbered pagination controls.
* **Dual-Mode Data Layer:** Seamlessly toggles between local mock data and the live streaming backend (`api_server.py`) at `http://localhost:8000`.

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
