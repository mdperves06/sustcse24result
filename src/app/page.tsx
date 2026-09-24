import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getCohortStats, getAllStudents } from "@/lib/data";
import { StatCard } from "@/components/StatCard";
import { CgpaDistributionChart } from "@/components/Charts/CgpaDistributionChart";
import {
  Users,
  Award,
  TrendingUp,
  Star,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Search,
  BookOpen,
  Calendar,
  Building,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const stats = getCohortStats();
  const students = getAllStudents();
  const top3 = stats.topStudents.slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-14 pb-20 border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            {/* SUST Crest & Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Department of Computer Science & Engineering
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="relative w-16 h-20 flex-shrink-0">
                <Image
                  src="/sust-logo.png"
                  alt="Shahjalal University of Science and Technology logo"
                  fill
                  sizes="64px"
                  className="object-contain drop-shadow"
                  priority
                />
              </div>
              <div className="text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  SUST CSE Academic Portal
                </h1>
                <p className="text-slate-300 text-sm sm:text-base font-medium mt-1">
                  Shahjalal University of Science & Technology, Sylhet
                </p>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Official cumulative CGPA ranking, semester tabulation sheets, and course-wise performance analytics for B.Sc. (Engg.) 1st & 2nd Semester Examinations.
            </p>

            {/* Quick Search Box */}
            <div className="w-full max-w-xl mt-4">
              <form
                action="/ranking"
                method="GET"
                className="relative flex items-center shadow-xl rounded-full overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 p-1.5 focus-within:ring-2 focus-within:ring-emerald-400"
              >
                <Search className="w-5 h-5 text-slate-400 ml-4 pointer-events-none" />
                <input
                  type="text"
                  name="q"
                  placeholder="Enter Student Name or Registration Number (e.g. 2024331080)..."
                  className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-sust-forest hover:bg-emerald-600 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Search</span>
                </button>
              </form>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/ranking"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sust-forest hover:bg-emerald-600 text-white font-bold text-sm shadow-lg hover:shadow-emerald-900/30 transition-all"
              >
                <Trophy className="w-4 h-4 text-sust-gold" />
                View Full Cumulative Ranking
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                Explore Courses & Grade Curves
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Cohort Key Statistics Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Official Cohort Statistics
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Aggregated metric breakdown across all 99 enrolled students in the department
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-sust-forest border border-emerald-200 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Verified Data
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <StatCard
              title="Total Enrolled"
              value={stats.totalStudents}
              subtitle="96 (2024-25) + 3 (2023-24)"
              icon={Users}
              badge="Full Cohort"
              color="green"
            />
            <StatCard
              title="Gender Ratio"
              value={`${stats.totalMale}M / ${stats.totalFemale}F`}
              subtitle={`${stats.totalFemale} Female Students (9.1%)`}
              icon={Users}
              badge="Official"
              color="emerald"
            />
            <StatCard
              title="Top Cumulative CGPA"
              value={stats.topCgpa.toFixed(2)}
              subtitle="Mamnuna Hasan (2024331080)"
              icon={Trophy}
              badge="Rank 1"
              color="gold"
            />
            <StatCard
              title="Cohort Average"
              value={stats.avgCgpa.toFixed(2)}
              subtitle="Cumulative CGPA Average"
              icon={TrendingUp}
              badge="Mean"
              color="green"
            />
            <StatCard
              title="CGPA ≥ 3.75"
              value={stats.countGe375}
              subtitle={`${((stats.countGe375 / stats.totalStudents) * 100).toFixed(1)}% High Distinction`}
              icon={Star}
              badge="Dean's List"
              color="gold"
            />
            <StatCard
              title="CGPA ≥ 3.50"
              value={stats.countGe350}
              subtitle={`${((stats.countGe350 / stats.totalStudents) * 100).toFixed(1)}% First Class`}
              icon={Award}
              badge="Honors"
              color="blue"
            />
          </div>
        </section>

        {/* Top 3 Performers Podium Showcase */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sust-gold" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Top 3 Academic Performers
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Official highest cumulative CGPA achievers recognized by the Department Examination Committee
              </p>
            </div>
            <Link
              href="/ranking"
              className="text-xs sm:text-sm font-semibold text-sust-forest hover:text-emerald-800 flex items-center gap-1"
            >
              View all 99 rankings
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {top3.map((student, idx) => {
              const rankStyles = [
                {
                  border: "border-amber-400/80 bg-gradient-to-b from-amber-50/60 to-white",
                  badge: "bg-amber-100 text-amber-900 border-amber-300",
                  icon: Trophy,
                  iconColor: "text-amber-500 fill-amber-400",
                  title: "1st Place – Cohort Valedictorian",
                },
                {
                  border: "border-slate-300 bg-gradient-to-b from-slate-50/80 to-white",
                  badge: "bg-slate-200 text-slate-800 border-slate-300",
                  icon: Trophy,
                  iconColor: "text-slate-400 fill-slate-300",
                  title: "2nd Place – High Distinction",
                },
                {
                  border: "border-amber-600/40 bg-gradient-to-b from-amber-50/30 to-white",
                  badge: "bg-amber-100 text-amber-900 border-amber-300",
                  icon: Trophy,
                  iconColor: "text-amber-700 fill-amber-600",
                  title: "3rd Place – High Distinction",
                },
              ];
              const s = rankStyles[idx];
              const Icon = s.icon;

              return (
                <div
                  key={student.regNo}
                  className={`rounded-2xl p-6 border-2 shadow-sm card-elevation relative overflow-hidden flex flex-col justify-between ${s.border}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${s.badge}`}
                      >
                        <Icon className={`w-4 h-4 ${s.iconColor}`} />
                        Rank #{student.rank}
                      </span>
                      <span className="text-xs font-mono font-medium text-slate-500">
                        {student.regNo}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        {s.title}
                      </p>
                      <h3 className="text-xl font-extrabold text-slate-900 mt-1 leading-snug">
                        {student.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Session: {student.session}
                      </p>
                    </div>

                    {/* CGPA & Credits */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                      <div className="bg-white/80 p-3 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Cumulative CGPA
                        </span>
                        <span className="text-2xl font-black text-sust-forest">
                          {student.cgpa.toFixed(2)}
                        </span>
                      </div>
                      <div className="bg-white/80 p-3 rounded-xl border border-slate-200/80">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Completed Credits
                        </span>
                        <span className="text-2xl font-bold text-slate-800">
                          {student.totalCompletedCredits.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Semester 1 vs Semester 2 SGPA */}
                    <div className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-lg text-slate-600">
                      <span>
                        Sem 1: <strong>{student.sem1Gpa?.toFixed(2)}</strong>
                      </span>
                      <span className="text-slate-300">|</span>
                      <span>
                        Sem 2: <strong>{student.sem2Gpa?.toFixed(2)}</strong>
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/student/${student.regNo}`}
                    className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sust-forest hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-sm"
                  >
                    View Academic Transcript
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Analytics & Cohort Distribution */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CGPA Distribution Chart Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Cohort CGPA Distribution Curve
                </h3>
                <p className="text-xs text-slate-500">
                  Spread of students across standard academic classification tiers
                </p>
              </div>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                N = 99
              </span>
            </div>
            <CgpaDistributionChart students={students} />
          </div>

          {/* Department Tabulation Audits Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sust-forest">
                <Building className="w-5 h-5 text-sust-forest" />
                <h3 className="text-lg font-bold text-slate-900">
                  Department Audits
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tabulation sheets processed and authorized by the SUST Examination Committee:
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <div className="flex items-center gap-1.5 font-bold text-sust-forest mb-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    1st Semester Examination – 2025
                  </div>
                  <p className="text-slate-600">Jan-Jun 2025 | Held Nov 2025</p>
                  <p className="text-slate-500 mt-1">
                    Published: 03-Mar-2026 • 8 Courses (19.50 Cr)
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 mb-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    2nd Semester Examination – 2025
                  </div>
                  <p className="text-slate-600">Jul-Dec 2025 | Held Apr 2026</p>
                  <p className="text-slate-500 mt-1">
                    Printed: 30-Jul-2026 • 9 Courses (19.50 Cr)
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
            >
              View Verification Signatures & Details
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
