import fs from "fs";
import path from "path";
import { Student, Course, CohortStats } from "@/types";

const dataDir = path.join(process.cwd(), "data", "processed");

export function getCohortStats(): CohortStats {
  const filePath = path.join(dataDir, "cohort_stats.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function getAllStudents(): Student[] {
  const filePath = path.join(dataDir, "students.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export function getStudentByReg(regNo: string): Student | null {
  const students = getAllStudents();
  const found = students.find((s) => s.regNo === regNo);
  return found || null;
}

export function getAllCourses(): Course[] {
  const filePath = path.join(dataDir, "courses.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export interface CourseStudentGrade {
  regNo: string;
  name: string;
  session: string;
  rank: number;
  gradePoint: number;
  letterGrade: string;
}

export interface CourseDetailStats {
  course: Course;
  totalEnrolled: number;
  averageGradePoint: number;
  gradeDistribution: { [grade: string]: number };
  students: CourseStudentGrade[];
}

export function getCourseStats(courseId: string): CourseDetailStats | null {
  const courses = getAllCourses();
  const course = courses.find((c) => c.id === courseId);
  if (!course) return null;

  const students = getAllStudents();
  const gradesList: CourseStudentGrade[] = [];
  const distribution: { [grade: string]: number } = {
    "A+": 0,
    A: 0,
    "A-": 0,
    "B+": 0,
    B: 0,
    "B-": 0,
    "C+": 0,
    C: 0,
    "C-": 0,
    F: 0,
  };

  let totalPoints = 0;

  for (const s of students) {
    const list = course.semester === 1 ? s.sem1Courses : s.sem2Courses;
    const match = list?.find((item) => item.courseId === courseId);
    if (match) {
      gradesList.push({
        regNo: s.regNo,
        name: s.name,
        session: s.session,
        rank: s.rank,
        gradePoint: match.gradePoint,
        letterGrade: match.letterGrade,
      });

      if (distribution[match.letterGrade] !== undefined) {
        distribution[match.letterGrade]++;
      } else {
        distribution[match.letterGrade] = 1;
      }
      totalPoints += match.gradePoint;
    }
  }

  // Sort students by gradePoint desc, then rank asc
  gradesList.sort((a, b) => b.gradePoint - a.gradePoint || a.rank - b.rank);

  const avg = gradesList.length > 0 ? totalPoints / gradesList.length : 0;

  return {
    course,
    totalEnrolled: gradesList.length,
    averageGradePoint: Number(avg.toFixed(2)),
    gradeDistribution: distribution,
    students: gradesList,
  };
}
