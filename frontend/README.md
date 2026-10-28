# SentiTrend Frontend Dashboard

A modern, responsive real-time sentiment analytics dashboard for the SentiTrend big data streaming pipeline.

Developed with **React**, **Vite**, **Tailwind CSS**, and **Recharts**.

---

## 🌟 Key Features

1. **KPI Summary Cards**
   - Total processed comments
   - Positive, Negative, and Neutral sentiment counts with live percentages
   - Average compound polarity score (VADER scale: $-1.0$ to $+1.0$)
2. **Sentiment Distribution Chart**
   - Donut chart displaying the proportional polarity breakdown across all comments
   - Center total counter, interactive tooltips, and legends
3. **Sentiment Trends Over Time**
   - Responsive multi-area chart visualizing daily sentiment volume evolution
   - Smooth gradients, custom tooltip formatters, and legends
4. **Topic Sentiment Breakdown**
   - Categorical bar chart showing distribution of sentiment across discussion topics (`#ai`, `#gaming`, `#technology`, `#cloud`, `#general`)
5. **Recent Processed Posts Stream**
   - Paginated and filterable table displaying post text, sentiment badges, compound scores, topic pills, platform badges, and timestamps
   - Accordion-style text expansion for long social comments
6. **Dynamic Filters**
   - Filter by Sentiment (`All`, `Positive`, `Negative`, `Neutral`)
   - Filter by Topic (dynamically derived from stream data)
   - Real-time keyword search across post content and topics
   - Reset filters button
7. **Robust Pagination**
   - 10 posts per page with previous/next controls, page numbers, and item range counters
   - Seamlessly recalculates when filters are applied
8. **Resilient Loading & Error UI**
   - Animated skeleton loaders for summary cards, charts, and table
   - Clean error alert with retry button
   - Interactive header button to simulate error states for demonstration during project evaluation!
9. **Dual-Mode Data Layer**
   - **Mock Mode (Default):** Runs independently using realistic SentiTrend social comments without requiring Kafka, Spark, or HBase.
   - **Live API Mode:** Connects seamlessly to the backend server (`api_server.py`) at `http://localhost:8000`.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** v18+ (tested on Node.js v26)
- **npm** v9+

### 2. Install Dependencies
From the `frontend` directory:
```bash
cd frontend
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🔌 Backend Integration

To switch from Mock Data to the live backend:

1. Start the backend API server in a separate terminal:
   ```bash
   python api_server.py
   ```
   *(Runs on `http://localhost:8000`)*

2. Toggle mode in the dashboard header:
   - Click the **"Mode: Mock / Live"** button in the top navigation bar.
   - Or set `VITE_USE_MOCK=false` in `frontend/.env`.

---

## 📁 Project Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── mockData.js          # Realistic SentiTrend stream records
    ├── services/
    │   └── api.js               # Service layer abstraction (Mock + Live API)
    └── components/
        ├── Header.jsx           # Brand, health indicator, mode toggles, refresh
        ├── SummaryCards.jsx     # 5 KPI summary cards
        ├── SentimentDistributionChart.jsx  # Donut chart
        ├── SentimentTrendChart.jsx         # Area trends chart
        ├── TopicAnalyticsChart.jsx         # Topic bar chart
        ├── FilterBar.jsx        # Search, sentiment, and topic filters
        ├── RecentPostsTable.jsx # Posts feed table with expandable text
        ├── Pagination.jsx       # Dynamic pagination controls
        ├── LoadingState.jsx     # Skeleton loading components
        └── ErrorState.jsx       # Error alerts and retry handler
```
