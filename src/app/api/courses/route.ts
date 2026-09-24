import { NextResponse } from "next/server";
import { getAllCourses, getCourseStats } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("id");

  if (courseId) {
    const stats = getCourseStats(courseId);
    if (!stats) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    return NextResponse.json(stats);
  }

  const courses = getAllCourses();
  return NextResponse.json(courses);
}
