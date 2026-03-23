
import { z } from "zod";
import { CreateResultInput, UpdateResultInput } from "./result.schema";
import { prisma } from "../../config/db";
import { AppError } from "../../utils/AppError";

export const createResult = async(resultData:CreateResultInput) => {
  const { studentId, courseId,  year } =resultData;
  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });
  if (!student) throw AppError.notFound("Student not found");
  const course = await prisma.course.findUnique({
    where: { id: courseId },

  });
  if (!course) throw AppError.notFound("Course not found");
  const existingResult = await prisma.result.findFirst({
   
    where: { studentId, courseId, year },
  });
  if (existingResult) {
    throw AppError.conflict(
      "Result already exists for this student, course and year"
    );
  }

  const createdResult = await prisma.result.create({
    data: resultData,
  });
  return createdResult;
};
export const getResults = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const [results,total] =await Promise.all([

    prisma.result.findMany({
      skip,
      take: limit,
      include: {
        student: true,
        course: true,
      },
    }),
    prisma.result.count(),
  ]);

  return {
    meta: {page,limit,total},
    data: results,
  };
};
export const updateResult = async (resultId: string,updateData: UpdateResultInput)=> {
  const existingResult = await prisma.result.findUnique({
    where: { id: resultId },
  });
    if (!existingResult) {
 
      throw AppError.notFound("Result not found");
  }

    const updatedResult = await prisma.result.update({
      where: { id: resultId },
          data: updateData,
       });
  return updatedResult;
};

export const deleteResult = async (resultId: string) => {
  const existingResult = await prisma.result.findUnique({
    where: { id: resultId },
  });
    if (!existingResult){

     throw AppError.notFound("Result not found");
  }

    await prisma.result.delete({
    where: { id: resultId },
  });

  return null;
};
export const getResultsByInstitute = async (instituteId: string,page: number,limit: number)=> {
  if (page < 1 || limit < 1) {
    throw AppError.badRequest("Invalid pagination parameters");
  }

  const skip = (page - 1) * limit;
  const institute = await prisma.institute.findUnique({
    where: { id: instituteId },
  });
  if (!institute) {
    throw AppError.notFound("Institute not found");
  }
  const [students, total] = await Promise.all([
    prisma.student.findMany({
      where: { instituteId },
      skip,
      take: limit,
      include: {
        results: {
          include: {
            course: true,
          },
        },
      },
    }),
    prisma.student.count({
      where: { instituteId },
    }),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: {
      institute,
      students,
    },
  };
};
export const getTopCoursesPerYear = async (year: number) => {
  const grouped = await prisma.result.groupBy({
    by: ["courseId"],
    where: { year },
    _count: { courseId: true },
    orderBy: {
      _count: { courseId: "desc" },
    },
    take: 5,
  });

  const courseIds = grouped.map((g) => g.courseId);

  const courses = await prisma.course.findMany({
    where: {
      id: { in: courseIds },
    },
  });

  return grouped.map((item) => {
    const course = courses.find((c) => c.id === item.courseId);
    return {
      courseId: item.courseId,
      courseName: course?.name,
      totalTaken: item._count.courseId,
    };
  });
};
export const getTopStudents = async () => {
  const grouped = await prisma.result.groupBy({
    by: ["studentId"],
    _avg: { score: true },
    orderBy: {
      _avg: { score: "desc" },
    },
    take: 10,
  });

  const studentIds = grouped.map((g) => g.studentId);

  const students = await prisma.student.findMany({
    where: {
      id: { in: studentIds },
    },
    include: {
      institute: true,
    },
  });

  return grouped.map((item) => {
    const student = students.find((s) => s.id === item.studentId);
    return {
      studentId: item.studentId,
      studentName: student?.name,
      institute: student?.institute?.name,
      avgScore: item._avg.score,
    };
  });
};
export const performanceCompare = async () => {

  await prisma.$executeRawUnsafe(`
    SET enable_indexscan = OFF;
    SET enable_bitmapscan = OFF;
  `);

  const beforeResult: any[] = await prisma.$queryRawUnsafe(`
    EXPLAIN ANALYZE SELECT * FROM "Result" WHERE "year" = 2024;
  `);

  await prisma.$executeRawUnsafe(`
    SET enable_indexscan = ON;
    SET enable_bitmapscan = ON;
  `);

  const afterResult: any[] = await prisma.$queryRawUnsafe(`
    EXPLAIN ANALYZE SELECT * FROM "Result" WHERE "year" = 2024;
  `);
  const parsePlan = (result: any[]) => {
    const text = result.map((r) => r["QUERY PLAN"]).join("\n");

    const executionTime = text.match(/Execution Time: ([\d.]+) ms/)?.[1];
    const rows = text.match(/rows=(\d+)/)?.[1];

    let scanType = "Unknown";
    if (text.includes("Seq Scan")) scanType = "Sequential Scan";
    else if (text.includes("Bitmap Index Scan")) scanType = "Bitmap Index Scan";
    else if (text.includes("Index Scan")) scanType = "Index Scan";

    return {
      scanType,
      executionTime: executionTime ? executionTime + " ms" : "N/A",
      rows: rows ? Number(rows) : 0,
    };
  };

  const before = parsePlan(beforeResult);
  const after = parsePlan(afterResult);
  const beforeTime = parseFloat(before.executionTime);
  const afterTime = parseFloat(after.executionTime);

  const improvement =
    beforeTime && afterTime
      ? `${(((beforeTime - afterTime) / beforeTime) * 100).toFixed(2)}% faster`
      : "N/A";

  return {
    query: `SELECT * FROM Result WHERE year = 2024`,
    before,
    after,
    improvement,
    message:
      after.scanType !== "Sequential Scan"
        ? "Index successfully optimized the query"
        : "Index not used",
  };
};