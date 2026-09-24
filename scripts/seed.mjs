import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const dataDir = path.join(__dirname, "..", "data", "processed");

async function main() {
  console.log("Starting Prisma database seeding...");

  const studentsData = JSON.parse(
    fs.readFileSync(path.join(dataDir, "students.json"), "utf-8")
  );
  const coursesData = JSON.parse(
    fs.readFileSync(path.join(dataDir, "courses.json"), "utf-8")
  );
  const resultsData = JSON.parse(
    fs.readFileSync(path.join(dataDir, "results.json"), "utf-8")
  );

  console.log(`Clearing existing data...`);
  await prisma.courseResult.deleteMany();
  await prisma.student.deleteMany();
  await prisma.course.deleteMany();

  console.log(`Seeding ${coursesData.length} courses...`);
  for (const c of coursesData) {
    await prisma.course.create({
      data: {
        id: c.id,
        code: c.code,
        identifier: c.identifier,
        title: c.title,
        credits: c.credits,
        semester: c.semester,
      },
    });
  }

  console.log(`Seeding ${studentsData.length} students...`);
  for (const s of studentsData) {
    await prisma.student.create({
      data: {
        regNo: s.regNo,
        name: s.name,
        session: s.session,
        gender: s.gender,
        rank: s.rank,
        cgpa: s.cgpa,
        sem1Gpa: s.sem1Gpa,
        sem1Credit: s.sem1Credit,
        sem1Grade: s.sem1Grade,
        sem2Gpa: s.sem2Gpa,
        sem2Credit: s.sem2Credit,
        sem2Grade: s.sem2Grade,
        totalCompletedCredits: s.totalCompletedCredits,
      },
    });
  }

  console.log(`Seeding ${resultsData.length} course results...`);
  // Batch insert in chunks of 100
  const chunkSize = 100;
  for (let i = 0; i < resultsData.length; i += chunkSize) {
    const chunk = resultsData.slice(i, i + chunkSize);
    await prisma.courseResult.createMany({
      data: chunk.map((r) => ({
        studentRegNo: r.studentRegNo,
        courseId: r.courseId,
        semester: r.semester,
        gradePoint: r.gradePoint,
        letterGrade: r.letterGrade,
      })),
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
