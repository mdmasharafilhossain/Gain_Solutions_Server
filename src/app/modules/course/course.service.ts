import { CreateCourseInput, UpdateCourseInput } from "./course.schema";
import { prisma } from "../../config/db";
import { AppError } from "../../utils/AppError";

export const createCourse = async (courseData: CreateCourseInput)=> {
  const { name } = courseData;
  const existingCourse = await prisma.course.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive", 
      },
    },
  });
  if (existingCourse){
    throw AppError.conflict("Course already exists");
  }
  const createdCourse =await prisma.course.create({
    data: courseData,
  });
  return createdCourse;
};

export const getCourses = async () => {
  const courses = await prisma.course.findMany();
  return courses;
};

// Update Course
export const updateCourse = async (courseId: string,updateData: UpdateCourseInput)=> {
  const existingCourse = await prisma.course.findUnique({
    where: { id: courseId },
  });
  if (!existingCourse){

    throw AppError.notFound("Course not found");
  }

  if (updateData.name) {
    const duplicateCourse = await prisma.course.findFirst({
      where: {
        name: {
          equals: updateData.name,
          mode: "insensitive",
        },
        NOT: { id: courseId },
      },
    });
    if (duplicateCourse){
          throw AppError.conflict("Course name already exists");
    }
  }
  const updatedCourse = await prisma.course.update({
    where: { id: courseId },
    data: updateData,
  });

  return updatedCourse;
};
export const deleteCourse = async(courseId: string)=> {
  const existingCourse = await prisma.course.findUnique({
    where: { id: courseId },

  });
  if (!existingCourse){

    throw AppError.notFound("Course not found");
  }
  await prisma.course.delete({

    where: { id: courseId },
  });

  return null;
};