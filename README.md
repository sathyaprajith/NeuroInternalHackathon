# NeuroAssess

A clinical report generation tool for neuropsychological assessments. Built for psychologists and clinicians to quickly generate standardized IQ assessment reports with automated scoring, norm-table lookups, and downloadable PDF/DOCX outputs.

## Features

- **Patient intake form** — name, gender, DOB, school, informant, complaints, referral info
- **Verbal & Performance IQ scoring** — enter raw scores, auto-lookup TQ scores from local norm tables
- **Automatic IQ classification** — Very Superior, Superior, High Average, Average, Low Average, Borderline, Extremely Low
- **Auto-generated clinical summary** — one-click narrative paragraph using patient data and computed scores
- **PDF & DOCX report download** — professional report from HTML template with all patient data filled in
- **Norm table reference** — view age-specific norm tables in a modal
- **Date picker** — calendar-based date selection in YYYY-MM-DD format

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, Vite, Tailwind CSS, react-hook-form, react-datepicker |
| Backend | Node.js, Express |
| Report Gen | Puppeteer (PDF), html-to-docx (DOCX) |
| Data | Local JSON norm tables (~24K entries) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Backend

```bash
cd reports-backend/reports-backend
npm install
node index.js
```

Server starts on `http://localhost:8000`.

### Frontend

```bash
cd report-frontend/report-frontend
npm install
npm run dev
```

App runs on `http://localhost:5173`.

## Project Structure

```
├── report-frontend/report-frontend/   # React + Vite frontend
│   └── src/components/
│       ├── AddPatientForm.jsx         # Main form wrapper + stepper
│       ├── PersonalDetailsTab.jsx     # Patient info (Tab 1)
│       ├── TestInformationTab.jsx     # Test metadata (Tab 2)
│       ├── VerbalTestsTab.jsx         # Verbal subtests (Tab 3)
│       ├── PerformanceTestsTab.jsx    # Performance subtests (Tab 4)
│       └── RecommendationsTab.jsx     # Summary + download (Tab 5)
│
├── reports-backend/reports-backend/   # Express API server
│   ├── index.js                       # Server, PDF/DOCX routes
│   ├── routes/tqRoutes.js            # TQ score lookup API
│   └── template/complete_report.html  # Report HTML template
│
└── Reports.iqnorms/                   # IQ norm data (JSON)
```

## License

MIT
