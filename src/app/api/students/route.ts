import { NextResponse } from "next/server";
import { getAllStudents } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase();

  let students = getAllStudents();

  if (q) {
    students = students.filter(
      (s) =>
        s.regNo.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    total: students.length,
    students,
  });
}
