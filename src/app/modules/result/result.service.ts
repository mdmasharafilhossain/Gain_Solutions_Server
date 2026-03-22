
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
export const getResults = async () => {
  const results = await prisma.result.findMany({
    include: {
      student: true,
      course: true,
    },
  });

  return results;
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
export const getResultsByInstitute = async (instituteId: string) => {
  const institute = await prisma.institute.findUnique({
    where: { id: instituteId },
    include: {
      students: {
        include: {
          results: {
            include: {
              course: true,
            },
          },
        },
      },
    },
  });

  if (!institute) {
    throw AppError.notFound("Institute not found");
  }

  return institute;
};
export const getTopCoursesPerYear = async (year: number) => {
  const result = await prisma.result.groupBy({
    by: ["courseId"],
    where: { year },
    _count: { courseId: true },
    orderBy: {
      _count: { courseId: "desc" },
    },
    take: 5,
  });

  return result;
};
export const getTopStudents = async () => {
  const result = await prisma.result.groupBy({
    by: ["studentId"],
    _avg: { score: true },
    orderBy: {
      _avg: { score: "desc" },
    },
    take: 10,
  });

  return result;
};
export const performanceTest = async () => {
  return prisma.$queryRawUnsafe(`
    EXPLAIN ANALYZE SELECT * FROM "Result" WHERE "year" = 2024;
  `);
};