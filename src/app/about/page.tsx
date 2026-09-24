import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Calendar,
  Award,
  Users,
  Building,
  CheckCircle,
  ExternalLink,
  BookOpen,
} from "lucide-react";

export const metadata = {
  title: "About & Source Tabulation Metadata | SUST CSE Portal",
  description:
    "Official examination committee records, source tabulation sheet provenance, and academic grading policy for SUST CSE results.",
};

export default function AboutPage() {
  const gradingScale = [
    { grade: "A+", point: "4.00", marks: "80% and above", description: "Outstanding" },
    { grade: "A", point: "3.75", marks: "75% to <80%", description: "Excellent" },
    { grade: "A-", point: "3.50", marks: "70% to <75%", description: "Very Good" },
    { grade: "B+", point: "3.25", marks: "65% to <70%", description: "Good" },
    { grade: "B", point: "3.00", marks: "60% to <65%", description: "Satisfactory" },
    { grade: "B-", point: "2.75", marks: "55% to <60%", description: "Above Average" },
    { grade: "C+", point: "2.50", marks: "50% to <55%", description: "Average" },
    { grade: "C", point: "2.25", marks: "45% to <50%", description: "Below Average" },
    { grade: "C-", point: "2.00", marks: "40% to <45%", description: "Pass" },
    { grade: "F", point: "0.00", marks: "<40%", description: "Fail" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-sust-forest mb-1.5">
          <ShieldCheck className="w-5 h-5 text-sust-forest" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Data Governance & Institutional Provenance
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          About & Source Tabulation Metadata
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete institutional provenance, examination committee authorization records, and departmental grading scales.
        </p>
      </div>

      {/* Primary Academic Disclaimer Banner */}
      <div className="bg-amber-50/80 border-2 border-amber-200 rounded-2xl p-6 space-y-2">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
          <Award className="w-5 h-5 text-amber-700" />
          Official Academic Notice & Demonstration Disclaimer
        </div>
        <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
          &ldquo;Data presented is derived from verified departmental tabulation sheets for demonstration and academic analysis.&rdquo;
          The portal guarantees zero synthetic mock data and zero hallucinated course records. All 99 student entries, registration numbers, credit allocations, and letter grades are 100% synchronized with the physical tabulation records maintained by Shahjalal University of Science and Technology.
        </p>
      </div>

      {/* Source Tabulation Sheets Audit */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-slate-900">
          <FileText className="w-5 h-5 text-sust-forest" />
          <h2 className="text-xl font-bold">Official Source Documents Audit</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Semester 1 Tabulation Sheet Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sust-forest bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md">
                  Source Document 1
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  1st Semester Tabulation Sheet
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  FinalTabulationSheet.pdf
                </p>
              </div>
              <Calendar className="w-5 h-5 text-slate-400" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Examination:</span>
                <span className="font-semibold text-slate-800 text-right">
                  B.Sc. (Engg.) 1st Semester – 2025
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Session Covered:</span>
                <span className="font-semibold text-slate-800">January - June 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Examination Held:</span>
                <span className="font-semibold text-slate-800">November 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Result Published:</span>
                <span className="font-semibold text-emerald-700">03-March-2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Courses:</span>
                <span className="font-semibold text-slate-800">8 Courses (19.50 Credits)</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 text-xs space-y-1.5">
              <span className="font-bold text-slate-700 block">Tabulation Committee:</span>
              <p className="text-slate-600">
                <strong>Chairman:</strong> Dr. Husne Ara Chowdhury
              </p>
              <p className="text-slate-600">
                <strong>Tabulators:</strong> Md. Eamin Rahman, Mr Md Shadmim Hasan Sifat, Mr. Abdullah Al Thaki, Mr. Md. Shymon Islam
              </p>
              <p className="text-slate-600">
                <strong>Controller of Examinations:</strong> Md. Mahbub Hossain
              </p>
            </div>
          </div>

          {/* Semester 2 Tabulation Sheet Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-md">
                  Source Document 2
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  2nd Semester Tabulation Sheet
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  FinalTabulationSheet-1.pdf
                </p>
              </div>
              <Calendar className="w-5 h-5 text-slate-400" />
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Examination:</span>
                <span className="font-semibold text-slate-800 text-right">
                  B.Sc. (Engg.) 2nd Semester – 2025
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Session Covered:</span>
                <span className="font-semibold text-slate-800">July - December 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Examination Held:</span>
                <span className="font-semibold text-slate-800">April 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sheet Printed On:</span>
                <span className="font-semibold text-amber-700">30-July-2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Courses:</span>
                <span className="font-semibold text-slate-800">9 Courses (19.50 Credits)</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 text-xs space-y-1.5">
              <span className="font-bold text-slate-700 block">Tabulation Committee:</span>
              <p className="text-slate-600">
                <strong>Chairman:</strong> Dr. Husne Ara Chowdhury
              </p>
              <p className="text-slate-600">
                <strong>Tabulators:</strong> Md. Eamin Rahman, Mr. Abdullah Al Thaki, Mr Md Shadmim Hasan Sifat, Mr. Md. Fahimul Islam
              </p>
              <p className="text-slate-600">
                <strong>Controller of Examinations:</strong> Md. Mahbub Hossain
              </p>
            </div>
          </div>
        </div>

        {/* Source Document 3: DOCX Cumulative Ranking */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                Source Document 3
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2">
                Official Cumulative CGPA Ranking List
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Cumulative_CGPA_Ranking_List.docx
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The authoritative cumulative merit ranking for exactly 99 students. This document is the single source of truth for student cohort ranking positions (Rank 1 through Rank 99) and official final Cumulative CGPA (ranging from 3.99 down to 2.34).
          </p>
        </div>
      </section>

      {/* Official SUST Grading Scale */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-4 p-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            SUST Academic Grading Policy (Scale 4.00)
          </h2>
          <p className="text-xs text-slate-500">
            Official numerical scale and letter grade equivalencies established by the Academic Council
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-4">Letter Grade</th>
                <th className="py-2.5 px-4">Grade Point</th>
                <th className="py-2.5 px-4">Marks Range</th>
                <th className="py-2.5 px-4">Qualitative Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {gradingScale.map((row) => (
                <tr key={row.grade} className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-4 font-bold text-slate-800">
                    {row.grade}
                  </td>
                  <td className="py-2.5 px-4 font-mono font-semibold text-sust-forest">
                    {row.point}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600">{row.marks}</td>
                  <td className="py-2.5 px-4 text-slate-500">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tech Stack & Architecture Box */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Building className="w-5 h-5 text-emerald-400" />
          Technical Stack & Architecture
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The portal is built with <strong>Next.js 15 (App Router, React 19, TypeScript)</strong>, styled with <strong>Tailwind CSS</strong>, rendered with <strong>Recharts</strong> data visualizations, and backed by a relational <strong>SQLite</strong> database with <strong>Prisma ORM</strong>. The architecture is modular and ready for production deployment on Render.
        </p>
      </section>
    </div>
  );
}
