# SUST CSE Academic Result & Ranking Portal

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.4-2D3748?logo=prisma)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?logo=sqlite)](https://www.sqlite.org/)

An authoritative, responsive web application for the **Department of Computer Science & Engineering, Shahjalal University of Science & Technology (SUST)**, providing comprehensive cumulative CGPA rankings, semester-by-semester tabulation breakdowns, and course-wise performance analytics for the undergraduate cohort.

---

## 🏛 Institutional Dataset & Verification

The portal is strictly derived from official university records with **zero synthetic mock data** and **zero hallucination**:

1. **Cumulative CGPA Ranking (`Cumulative_CGPA_Ranking_List.docx`)**:
   - Official merit ranking for exactly **99 students** (Rank 1 through Rank 99).
   - Authoritative source for overall rank, session, and final cumulative CGPA.
2. **1st Semester Tabulation Sheet (`FinalTabulationSheet.pdf`)**:
   - Examination: B.Sc. (Engg.) 1st Semester Examination – 2025 (January–June).
   - Examination Held: November 2025 | Result Published On: 03-March-2026.
   - 8 courses (19.50 standard credits).
   - Signed by Chairman Dr. Husne Ara Chowdhury, Tabulators, and Controller of Examinations Md. Mahbub Hossain.
3. **2nd Semester Tabulation Sheet (`FinalTabulationSheet-1.pdf`)**:
   - Examination: B.Sc. (Engg.) 2nd Semester Examination – 2025 (July–December).
   - Examination Held: April 2026 | Tabulation Printed On: 30-July-2026.
   - 9 courses (19.50 standard credits).
   - Verified by the Department Examination Committee.
4. **Official SUST Crest (`sust-logo.png`)**:
   - Rendered with institutional proportions and accessible alt attributes.

---

## 📊 Cohort Summary Highlights

| Metric | Official Department Record |
| :--- | :--- |
| **Total Enrolled Students** | **99** (96 from Session 2024-2025, 3 from Session 2023-2024) |
| **Official Gender Ratio** | **90 Male / 9 Female** (9.1% Female Representation) |
| **Top Cumulative CGPA** | **3.99** (Mamnuna Hasan, Reg: `2024331080` – Rank 1) |
| **Rank 2 Performer** | **3.93** (Hossain Mohammad Nahdi, Reg: `2024331013`) |
| **Rank 3 Performer** | **3.93** (Koushik Sadhak Jeet, Reg: `2024331010`) |
| **Cohort Mean CGPA** | **3.47** |
| **High Distinction (CGPA ≥ 3.75)** | **16 Students** (16.2%) |
| **Dean's Honors (CGPA ≥ 3.50)** | **50 Students** (50.5%) |
| **First Class (CGPA ≥ 3.00)** | **89 Students** (89.9%) |
| **Irregular Credits Handled** | Student `2023331005` (34.50 cumulative credits), failed courses (0.00 / F) |

---

## 🚀 Key Features & Pages

- **🏠 Home Page (`/`)**:
  - Hero banner with SUST crest, quick search modal/input, primary CTAs.
  - 6 Metric Cards displaying verified cohort statistics.
  - Top 3 Academic Performers Showcase podium.
  - Cohort CGPA Distribution frequency chart.
  - Examination audit announcements.
- **🏆 Cumulative Ranking Page (`/ranking`)**:
  - Complete authoritative roster of all 99 students.
  - Interactive search by name or registration number.
  - CGPA filter chips (All, ≥3.75, ≥3.50, ≥3.00) and session selector.
  - Column sorting for Rank, Reg No, Name, Sem 1 SGPA, Sem 2 SGPA, CGPA, Completed Credits.
  - Responsive layout (rich table on desktop, card fallback on mobile).
- **🎓 Individual Student Profile (`/student/[regNo]`)**:
  - Detailed student header with rank badge, session, credits, and CGPA.
  - Semester 1 vs Semester 2 SGPA comparative bar chart (Recharts).
  - Detailed semester tables with course code, identifier, title, credit, letter grade, and grade point.
  - Credit completion tracker and alert indicators for failed/incomplete credits.
- **📚 Course Performance Explorer (`/courses`)**:
  - Semester switcher (Semester 1: 8 courses, Semester 2: 9 courses).
  - Interactive Grade Distribution Bar Chart (A+, A, A-, B+, B, B-, C+, C, C-, F).
  - Class enrollment metrics (Average GP, peak grade frequency).
  - Searchable and filterable student roster for the selected course.
- **ℹ️ About & Source Metadata Page (`/about`)**:
  - Complete examination provenance and audit documentation.
  - Tabulation committee members, chairman, and examination controller signatures.
  - SUST Academic Grading Scale table (Scale 4.00).

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), Custom Design Tokens (SUST Forest Green `#0A5C36`, Accent Gold `#D97706`)
- **Data Visualizations**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & ORM**: [SQLite](https://www.sqlite.org/) with [Prisma ORM](https://www.prisma.io/)
- **Data Ingestion Pipeline**: Python (`pypdf`, `python-docx`) parsing source tabulation documents into `/data/processed/` JSON and seeding Prisma SQLite database.

---

## 💻 Getting Started

### Prerequisites
- Node.js >= 18.x
- Python 3.10+ (for data ingestion script if re-extracting)

### Installation

```bash
# Clone the repository
git clone https://github.com/mdperves06/sustcse24result.git
cd sustcse24result

# Install dependencies
npm install

# Initialize Prisma SQLite DB & Seed data
npx prisma generate
npx prisma db push
node scripts/seed.mjs

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## 🌐 Deployment on Render

This repository is pre-configured for zero-friction deployment on **Render**:

1. Create a new **Web Service** on Render connected to this repository.
2. Configure settings:
   - **Environment**: Node
   - **Build Command**: `npm install && npx prisma generate && npx prisma db push && node scripts/seed.mjs && npm run build`
   - **Start Command**: `npm run start`
3. Deploy!

---

## 📄 License & Disclaimer

Academic demonstration project for the Department of Computer Science & Engineering, Shahjalal University of Science & Technology (SUST), Sylhet, Bangladesh. All data reflects official published tabulation records.
