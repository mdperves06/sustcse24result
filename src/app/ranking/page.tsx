import React from "react";
import { getAllStudents, getCohortStats } from "@/lib/data";
import { RankingTable } from "@/components/RankingTable";
import { Trophy, ShieldCheck, Download, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Cumulative CGPA Ranking | SUST CSE Portal",
  description:
    "Authoritative cumulative CGPA rankings for all 99 students in the Department of Computer Science & Engineering, SUST.",
};

export default function RankingPage() {
  const students = getAllStudents();
  const stats = getCohortStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-sust-forest mb-1.5">
            <Trophy className="w-5 h-5 text-sust-gold" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Department Academic Registry
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Cumulative CGPA Ranking List
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official ranking of all {students.length} students based on Cumulative CGPA across Semesters 1 and 2.
          </p>
        </div>

        {/* Quick Highlights Pill */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-center">
            <span className="text-[10px] uppercase font-bold text-sust-forest block">
              Top CGPA
            </span>
            <span className="text-lg font-black text-sust-forest">
              {stats.topCgpa.toFixed(2)}
            </span>
          </div>
          <div className="bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-600 block">
              Cohort Mean
            </span>
            <span className="text-lg font-bold text-slate-800">
              {stats.avgCgpa.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Official Synchronization Disclaimer Banner */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 flex items-start gap-3 shadow-xs">
        <ShieldCheck className="w-5 h-5 text-sust-forest flex-shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-emerald-950 space-y-1">
          <p className="font-semibold text-sust-forest">
            Official Department Record Synchronization
          </p>
          <p className="text-emerald-900/80 text-xs leading-relaxed">
            Official rank and cumulative CGPA are strictly synchronized with the cumulative department record (`Cumulative_CGPA_Ranking_List.docx`). Semester 1 and 2 SGPA, credit counts, and letter grades are verified directly against the published Tabulation Sheets.
          </p>
        </div>
      </div>

      {/* The Ranking Table */}
      <RankingTable students={students} />
    </div>
  );
}
