"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Course } from "@/types";
import { GradeDistributionChart } from "@/components/Charts/GradeDistributionChart";
import { GradeBadge } from "@/components/GradeBadge";
import {
  BookOpen,
  Filter,
  Search,
  Users,
  Award,
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

interface CourseStudentGrade {
  regNo: string;
  name: string;
  session: string;
  rank: number;
  gradePoint: number;
  letterGrade: string;
}

interface CourseExplorerProps {
  courses: Course[];
  courseStatsMap: {
    [courseId: string]: {
      totalEnrolled: number;
      averageGradePoint: number;
      gradeDistribution: { [grade: string]: number };
      students: CourseStudentGrade[];
    };
  };
}

export const CourseExplorer: React.FC<CourseExplorerProps> = ({
  courses,
  courseStatsMap,
}) => {
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    courses[0]?.id || ""
  );
  const [studentSearch, setStudentSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState<string>("all");

  // Courses filtered by current semester
  const semesterCourses = useMemo(() => {
    return courses.filter((c) => c.semester === selectedSemester);
  }, [courses, selectedSemester]);

  // Handle switching semester
  const handleSemesterChange = (sem: number) => {
    setSelectedSemester(sem);
    const firstCourseInSem = courses.find((c) => c.semester === sem);
    if (firstCourseInSem) {
      setSelectedCourseId(firstCourseInSem.id);
    }
    setStudentSearch("");
    setGradeFilter("all");
  };

  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const currentStats = courseStatsMap[selectedCourseId] || {
    totalEnrolled: 0,
    averageGradePoint: 0,
    gradeDistribution: {},
    students: [],
  };

  // Filter students in current course
  const filteredStudents = useMemo(() => {
    return currentStats.students.filter((s) => {
      const q = studentSearch.toLowerCase().trim();
      const matchesSearch =
        !q || s.name.toLowerCase().includes(q) || s.regNo.includes(q);
      const matchesGrade =
        gradeFilter === "all" || s.letterGrade === gradeFilter;
      return matchesSearch && matchesGrade;
    });
  }, [currentStats.students, studentSearch, gradeFilter]);

  // Find most frequent grade
  const topGrade = useMemo(() => {
    let bestGrade = "N/A";
    let max = -1;
    for (const [grade, count] of Object.entries(currentStats.gradeDistribution)) {
      if (count > max && count > 0) {
        max = count;
        bestGrade = grade;
      }
    }
    return { grade: bestGrade, count: max };
  }, [currentStats.gradeDistribution]);

  return (
    <div className="space-y-8">
      {/* Top Filter & Selectors */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Course Selection
            </h2>
            <p className="text-xs text-slate-500">
              Choose a semester and course to explore grade distribution & class rosters
            </p>
          </div>

          {/* Semester Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => handleSemesterChange(1)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedSemester === 1
                  ? "bg-sust-forest text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Semester 1 (8 Courses)
            </button>
            <button
              onClick={() => handleSemesterChange(2)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedSemester === 2
                  ? "bg-sust-forest text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Semester 2 (9 Courses)
            </button>
          </div>
        </div>

        {/* Course Buttons / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {semesterCourses.map((c) => {
            const isSelected = c.id === selectedCourseId;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCourseId(c.id);
                  setStudentSearch("");
                  setGradeFilter("all");
                }}
                className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-emerald-50/80 border-sust-forest ring-2 ring-sust-forest/20 shadow-sm"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-sust-forest">
                      {c.code}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      ID: {c.identifier}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 line-clamp-2">
                    {c.title}
                  </h4>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <span>{c.credits.toFixed(2)} Credits</span>
                  <span className="font-medium text-emerald-700">
                    {courseStatsMap[c.id]?.totalEnrolled || 99} Enrolled
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Course Header Banner */}
      {currentCourse && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 pb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sust-forest text-white">
                  Semester {currentCourse.semester}
                </span>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  Code: {currentCourse.code} ({currentCourse.identifier})
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {currentCourse.credits.toFixed(2)} Credits
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentCourse.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Department of Computer Science & Engineering, SUST
              </p>
            </div>

            {/* Course Summary Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl text-center">
                <span className="text-[10px] uppercase font-bold text-sust-forest block">
                  Enrolled
                </span>
                <span className="text-2xl font-black text-sust-forest">
                  {currentStats.totalEnrolled}
                </span>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-3.5 rounded-xl text-center">
                <span className="text-[10px] uppercase font-bold text-amber-800 block">
                  Average GP
                </span>
                <span className="text-2xl font-black text-amber-800">
                  {currentStats.averageGradePoint.toFixed(2)}
                </span>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-xl text-center">
                <span className="text-[10px] uppercase font-bold text-blue-800 block">
                  Peak Grade
                </span>
                <span className="text-2xl font-black text-blue-800">
                  {topGrade.grade}
                </span>
              </div>
            </div>
          </div>

          {/* Grade Distribution Visualization */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Grade Distribution Frequency
                </h3>
                <p className="text-xs text-slate-500">
                  Number of students receiving each letter grade in this course
                </p>
              </div>
            </div>
            <GradeDistributionChart
              distribution={currentStats.gradeDistribution}
            />
          </div>
        </div>
      )}

      {/* Course Student Roster */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Student Roster & Course Grades
            </h3>
            <p className="text-xs text-slate-500">
              Showing {filteredStudents.length} of {currentStats.totalEnrolled}{" "}
              enrolled students
            </p>
          </div>

          {/* Search & Grade Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search roster..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sust-forest/30"
              />
            </div>

            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-sust-forest/30"
            >
              <option value="all">All Grades</option>
              {["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "F"].map(
                (g) => (
                  <option key={g} value={g}>
                    Grade {g} (
                    {currentStats.gradeDistribution[g] || 0})
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* Table of Enrolled Students */}
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Cohort Rank</th>
                <th className="py-3 px-4">Registration No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Session</th>
                <th className="py-3 px-4 text-center">Grade Point</th>
                <th className="py-3 px-4 text-center">Letter Grade</th>
                <th className="py-3 px-4 text-right">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No students found matching this criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr
                    key={s.regNo}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-slate-700 text-xs">
                      #{s.rank}
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-slate-800 text-xs">
                      {s.regNo}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {s.name}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-500">
                      {s.session}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-800 text-xs">
                      {s.gradePoint.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <GradeBadge grade={s.letterGrade} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/student/${s.regNo}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-sust-forest hover:underline"
                      >
                        View Profile
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
