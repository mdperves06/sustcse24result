export interface CourseResultItem {
  courseId: string;
  courseCode: string;
  identifier: string;
  title: string;
  credit: number;
  gradePoint: number;
  letterGrade: string;
}

export interface Student {
  rank: number;
  regNo: string;
  name: string;
  session: string;
  gender: string;
  cgpa: number;
  sem1Gpa: number | null;
  sem1Credit: number | null;
  sem1Grade: string | null;
  sem2Gpa: number | null;
  sem2Credit: number | null;
  sem2Grade: string | null;
  totalCompletedCredits: number;
  sem1Courses?: CourseResultItem[];
  sem2Courses?: CourseResultItem[];
}

export interface Course {
  id: string;
  code: string;
  identifier: string;
  title: string;
  credits: number;
  semester: number;
}

export interface CohortStats {
  totalStudents: number;
  totalMale: number;
  totalFemale: number;
  topCgpa: number;
  minCgpa: number;
  avgCgpa: number;
  countGe375: number;
  countGe350: number;
  countGe300: number;
  topStudents: Student[];
  metadata: {
    department: string;
    university: string;
    sem1: {
      exam: string;
      heldIn: string;
      publishedOn: string;
      chairman: string;
      controller: string;
      tabulators: string[];
    };
    sem2: {
      exam: string;
      heldIn: string;
      printedOn: string;
      chairman: string;
      controller: string;
      tabulators: string[];
    };
  };
}
