
import { prisma } from "../../config/db";
import { AppError } from "../../utils/AppError";
import {
  CreateStudentInput,
  UpdateStudentInput,
} from "./student.schema";

export const createStudent = async (studentData: CreateStudentInput) =>{
  const { name, instituteId } = studentData;
  const institute = await prisma.institute.findUnique({
    where: { id: instituteId },
    
  });

  if (!institute){

    throw AppError.notFound("Institute not found");
  }
  const existingStudent = await prisma.student.findFirst({
    where: {
      name,
      instituteId,
    },
  });

  if (existingStudent) {
    throw AppError.conflict(
      "Student with same name already exists in this institute"
    );
  }

  const createdStudent = await prisma.student.create({
    data: studentData,
  });

  return createdStudent;
};

export const getStudents = async (page: number,limit: number) =>{
  if (page < 1 || limit < 1){

    throw AppError.badRequest("Invalid pagination parameters");
  }

  const skip = (page - 1) * limit;

  const [students, total] = await Promise.all([
    prisma.student.findMany({
      skip,
      take: limit,
      include: {
        institute: true,
      },
    }),
    prisma.student.count(),
  ]);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: students,
  };
};
export const updateStudent = async (studentId: string,updateData: UpdateStudentInput) =>{
  const existingStudent = await prisma.student.findUnique({

    where: { id: studentId },
  });

  if (!existingStudent) {

    throw AppError.notFound("Student not found");
  }
  if (updateData.instituteId) {
    const institute = await prisma.institute.findUnique({
      where: { id: updateData.instituteId },
    });
    if (!institute){
      throw AppError.notFound("Institute not found");
    }
  }

  const updatedStudent = await prisma.student.update({
    where: { id: studentId },
    data: updateData,
  });

  return updatedStudent;
};
export const deleteStudent = async (studentId: string) =>{
  const existingStudent = await prisma.student.findUnique({
    where: { id: studentId },
  });

  if (!existingStudent) {
    throw AppError.notFound("Student not found");
  }

  await prisma.student.delete({
    where: { id: studentId },
  });

  return null;
};