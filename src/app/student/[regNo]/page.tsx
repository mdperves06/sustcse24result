import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStudentByReg, getAllStudents } from "@/lib/data";
import { GradeBadge } from "@/components/GradeBadge";
import { SgpaComparisonChart } from "@/components/Charts/SgpaComparisonChart";
import { SemesterCourseChart } from "@/components/Charts/SemesterCourseChart";
import {
  Trophy,
  ArrowLeft,
  Calendar,
  Award,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Printer,
  ChevronRight,
} from "lucide-react";

interface StudentProfilePageProps {
  params: Promise<{
    regNo: string;
  }>;
}

export async function generateStaticParams() {
  const students = getAllStudents();
  return students.map((s) => ({
    regNo: s.regNo,
  }));
}

export async function generateMetadata({ params }: StudentProfilePageProps) {
  const { regNo } = await params;
  const student = getStudentByReg(regNo);
  if (!student) {
    return { title: "Student Not Found | SUST CSE Portal" };
  }
  return {
    title: `${student.name} (${student.regNo}) | Academic Profile`,
    description: `Official academic results and semester breakdown for ${student.name}, Registration No. ${student.regNo}, SUST CSE.`,
  };
}

export default async function StudentProfilePage({
  params,
}: StudentProfilePageProps) {
  const { regNo } = await params;
  const student = getStudentByReg(regNo);

  if (!student) {
    notFound();
  }

  const standardTotalCredits = 39.0;
  const isRegular = student.session === "2024-2025";
  const hasFailedCourses =
    student.sem1Courses?.some((c) => c.gradePoint === 0) ||
    student.sem2Courses?.some((c) => c.gradePoint === 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Navigation & Breadcrumb */}
      <div className="flex items-center justify-between no-print">
        <Link
          href="/ranking"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sust-forest hover:text-emerald-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cumulative Rankings
        </Link>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm card-elevation relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sust-forest text-white shadow-sm">
                <Trophy className="w-3.5 h-3.5 text-sust-gold" />
                Official Rank #{student.rank} of 99
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Session {student.session}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                {student.gender}
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {student.name}
              </h1>
              <p className="text-sm font-mono text-slate-500 mt-1">
                Registration No: <strong className="text-slate-800">{student.regNo}</strong>
              </p>
            </div>

            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sust-forest" />
              Verified Department Record • Shahjalal University of Science & Technology
            </p>
          </div>

          {/* Quick Metrics Badge Group */}
          <div className="flex items-center gap-4 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-8">
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 text-center min-w-[130px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sust-forest block">
                Cumulative CGPA
              </span>
              <span className="text-3xl sm:text-4xl font-black text-sust-forest">
                {student.cgpa.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                Scale 4.00
              </span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center min-w-[130px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Completed Credits
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-800">
                {student.totalCompletedCredits.toFixed(1)}
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                of {standardTotalCredits.toFixed(1)} Standard
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Irregular / Warning Note if student has failed courses or non-standard credit */}
      {hasFailedCourses && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 space-y-1">
            <p className="font-bold text-amber-900">
              Incomplete Course Credits Registered
            </p>
            <p className="text-amber-800/90 text-xs leading-relaxed">
              This student has course(s) with Grade Point 0.00 (F). Earned semester credits reflect only passed courses. Failed credits must be cleared in accordance with SUST examination regulations.
            </p>
          </div>
        </div>
      )}

      {/* Performance Overview Chart & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SGPA Progression Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Semester SGPA vs Cumulative CGPA
              </h2>
              <p className="text-xs text-slate-500">
                Comparative progression between 1st Semester and 2nd Semester performance
              </p>
            </div>
          </div>
          <SgpaComparisonChart
            sem1Gpa={student.sem1Gpa}
            sem2Gpa={student.sem2Gpa}
            cgpa={student.cgpa}
          />
        </div>

        {/* Semester Performance Cards */}
        <div className="space-y-4 flex flex-col justify-between">
          {/* Sem 1 Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                1st Semester
              </span>
              {student.sem1Grade && (
                <GradeBadge grade={student.sem1Grade} size="sm" />
              )}
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900">
                {student.sem1Gpa !== null ? student.sem1Gpa.toFixed(2) : "N/A"}
              </span>
              <span className="text-xs text-slate-500">
                Credits: <strong>{student.sem1Credit?.toFixed(2)}</strong> / 19.50
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Exam: Jan-Jun 2025 • Held Nov 2025
            </p>
          </div>

          {/* Sem 2 Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                2nd Semester
              </span>
              {student.sem2Grade && (
                <GradeBadge grade={student.sem2Grade} size="sm" />
              )}
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900">
                {student.sem2Gpa !== null ? student.sem2Gpa.toFixed(2) : "N/A"}
              </span>
              <span className="text-xs text-slate-500">
                Credits: <strong>{student.sem2Credit?.toFixed(2)}</strong> / 19.50
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Exam: Jul-Dec 2025 • Held Apr 2026
            </p>
          </div>

          {/* Cumulative Progress Bar */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Credit Completion</span>
              <span className="font-bold text-sust-forest">
                {((student.totalCompletedCredits / standardTotalCredits) * 100).toFixed(0)}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-sust-forest rounded-full transition-all"
                style={{
                  width: `${Math.min(
                    100,
                    (student.totalCompletedCredits / standardTotalCredits) * 100
                  )}%`,
                }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-500">
              {student.totalCompletedCredits.toFixed(2)} of {standardTotalCredits.toFixed(2)} total 1st year credits earned
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Semester Course Tables */}
      <div className="space-y-8">
        {/* Semester 1 Course Table */}
        <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sust-forest" />
                1st Semester (1/1) Examination Results – 2025
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Session: {student.session} • Held Nov 2025 • Result Published On: 03-Mar-2026
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="bg-emerald-50 text-sust-forest border border-emerald-200 font-bold px-3 py-1 rounded-lg">
                Earned: {student.sem1Credit?.toFixed(2)} Cr
              </span>
              <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-lg">
                SGPA: {student.sem1Gpa?.toFixed(2) ?? "N/A"}
              </span>
            </div>
          </div>

          {/* 1/1 Course Performance Bar Chart */}
          {student.sem1Courses && student.sem1Courses.length > 0 && (
            <div className="p-4 sm:p-6 border-b border-slate-100 bg-white">
              <SemesterCourseChart
                courses={student.sem1Courses}
                semesterName="1st Semester (1/1)"
                sgpa={student.sem1Gpa}
              />
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-6">Course Code</th>
                  <th className="py-3 px-6">Identifier</th>
                  <th className="py-3 px-6">Course Title</th>
                  <th className="py-3 px-6 text-center">Credit</th>
                  <th className="py-3 px-6 text-center">Grade Point</th>
                  <th className="py-3 px-6 text-center">Letter Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {student.sem1Courses?.map((course) => (
                  <tr
                    key={course.courseId}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-6 font-mono font-bold text-sust-forest text-xs">
                      {course.courseCode}
                    </td>
                    <td className="py-3.5 px-6 font-mono text-xs text-slate-600">
                      {course.identifier}
                    </td>
                    <td className="py-3.5 px-6 font-medium text-slate-900">
                      {course.title}
                    </td>
                    <td className="py-3.5 px-6 text-center font-mono text-xs text-slate-700">
                      {course.credit.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-6 text-center font-mono font-semibold text-slate-800 text-xs">
                      {course.gradePoint.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <GradeBadge grade={course.letterGrade} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50/80 font-bold text-xs text-slate-800 border-t border-slate-200">
                  <td colSpan={3} className="py-3.5 px-6">
                    Semester 1 Total
                  </td>
                  <td className="py-3.5 px-6 text-center font-mono">
                    {student.sem1Courses
                      ?.reduce((sum, c) => sum + c.credit, 0)
                      .toFixed(2)}
                  </td>
                  <td colSpan={2} className="py-3.5 px-6 text-right">
                    Semester SGPA:{" "}
                    <span className="text-sust-forest font-black text-sm ml-1">
                      {student.sem1Gpa?.toFixed(2) ?? "N/A"}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        {/* Semester 2 Course Table */}
        <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sust-forest" />
                2nd Semester (1/2) Examination Results – 2025
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Session: {student.session} • Held Apr 2026 • Printed On: 30-Jul-2026
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="bg-emerald-50 text-sust-forest border border-emerald-200 font-bold px-3 py-1 rounded-lg">
                Earned: {student.sem2Credit?.toFixed(2)} Cr
              </span>
              <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-lg">
                SGPA: {student.sem2Gpa?.toFixed(2) ?? "N/A"}
              </span>
            </div>
          </div>

          {/* 1/2 Course Performance Bar Chart */}
          {student.sem2Courses && student.sem2Courses.length > 0 && (
            <div className="p-4 sm:p-6 border-b border-slate-100 bg-white">
              <SemesterCourseChart
                courses={student.sem2Courses}
                semesterName="2nd Semester (1/2)"
                sgpa={student.sem2Gpa}
              />
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-6">Course Code</th>
                  <th className="py-3 px-6">Identifier</th>
                  <th className="py-3 px-6">Course Title</th>
                  <th className="py-3 px-6 text-center">Credit</th>
                  <th className="py-3 px-6 text-center">Grade Point</th>
                  <th className="py-3 px-6 text-center">Letter Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {student.sem2Courses?.map((course) => (
                  <tr
                    key={course.courseId}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-6 font-mono font-bold text-sust-forest text-xs">
                      {course.courseCode}
                    </td>
                    <td className="py-3.5 px-6 font-mono text-xs text-slate-600">
                      {course.identifier}
                    </td>
                    <td className="py-3.5 px-6 font-medium text-slate-900">
                      {course.title}
                    </td>
                    <td className="py-3.5 px-6 text-center font-mono text-xs text-slate-700">
                      {course.credit.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-6 text-center font-mono font-semibold text-slate-800 text-xs">
                      {course.gradePoint.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <GradeBadge grade={course.letterGrade} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50/80 font-bold text-xs text-slate-800 border-t border-slate-200">
                  <td colSpan={3} className="py-3.5 px-6">
                    Semester 2 Total
                  </td>
                  <td className="py-3.5 px-6 text-center font-mono">
                    {student.sem2Courses
                      ?.reduce((sum, c) => sum + c.credit, 0)
                      .toFixed(2)}
                  </td>
                  <td colSpan={2} className="py-3.5 px-6 text-right">
                    Semester SGPA:{" "}
                    <span className="text-sust-forest font-black text-sm ml-1">
                      {student.sem2Gpa?.toFixed(2) ?? "N/A"}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
