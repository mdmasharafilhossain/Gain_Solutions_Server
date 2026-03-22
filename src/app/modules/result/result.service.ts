
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