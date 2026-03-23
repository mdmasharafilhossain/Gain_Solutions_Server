
import { prisma } from "../config/db";

async function main() {
  console.log("Seeding started...");

  const institutes = await prisma.institute.createMany({
    data: Array.from({ length: 1000 }, (_, i) => ({
      name: `Institute ${i + 1}`,
      location: `City ${i % 50}`,
    })),
    skipDuplicates: true,
  });

  const allInstitutes = await prisma.institute.findMany();

  await prisma.course.createMany({
    data: Array.from({ length: 50 }, (_, i) => ({
      name: `Course ${i + 1}`,
    })),
    skipDuplicates: true,
  });

  const allCourses = await prisma.course.findMany();

  const studentsData = Array.from({ length: 100000 }, (_, i) => ({
    name: `Student ${i + 1}`,
    instituteId: allInstitutes[i % allInstitutes.length].id,
  }));

  await prisma.student.createMany({
    data: studentsData,
    skipDuplicates: true,
  });

  const allStudents = await prisma.student.findMany();

  const resultsData = Array.from({ length: 100000 }, (_, i) => ({
    studentId: allStudents[i % allStudents.length].id,
    courseId: allCourses[i % allCourses.length].id,
    score: Math.floor(Math.random() * 100),
    year: 2020 + (i % 5),
  }));

  await prisma.result.createMany({
    data: resultsData,
    skipDuplicates: true,
  });

  console.log("Seeding completed successfully (100k data)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });