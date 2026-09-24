import React from "react";
import { getAllCourses, getCourseStats } from "@/lib/data";
import { CourseExplorer } from "@/components/CourseExplorer";
import { BookOpen, Layers } from "lucide-react";

export const metadata = {
  title: "Course-wise Performance Explorer | SUST CSE Portal",
  description:
    "Explore grade distribution frequencies, class enrollments, and academic curves across all courses in B.Sc. (Engg.) 1st and 2nd semesters.",
};

export default function CoursesPage() {
  const courses = getAllCourses();

  // Pre-calculate stats for all 17 courses
  const courseStatsMap: { [key: string]: any } = {};
  for (const c of courses) {
    const stats = getCourseStats(c.id);
    if (stats) {
      courseStatsMap[c.id] = stats;
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-sust-forest mb-1.5">
          <BookOpen className="w-5 h-5 text-sust-forest" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Academic Curriculum Analytics
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Course-wise Performance Explorer
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Detailed grade distribution charts, enrollment metrics, and student grade rosters for all 17 courses across Semester 1 and Semester 2.
        </p>
      </div>

      {/* Interactive Explorer Client Component */}
      <CourseExplorer courses={courses} courseStatsMap={courseStatsMap} />
    </div>
  );
}
