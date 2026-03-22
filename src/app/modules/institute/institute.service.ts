import { prisma } from "../../config/db";
import { AppError } from "../../utils/AppError";
import { InstituteInput } from "./institute.schema";



export const createInstitute = async (instituteData: InstituteInput)=> {
    const { name, location } = instituteData;
  const existingInstitute = await prisma.institute.findFirst({
    where: {  name, location},
  });

  if (existingInstitute){
    throw AppError.conflict(
      "Institute with same name and location already exists"
    );
  }
  const createdInstitute = await prisma.institute.create({
    data: instituteData,
  });

  return createdInstitute;
};

export const getInstitutes = async (page: number, limit: number) => {

  const skip = (page - 1) * limit
  const [data, total] = await Promise.all([
    prisma.institute.findMany({ skip, take: limit }),
    prisma.institute.count()
  ])

  return {
    meta: {
      page,
      limit,
      total,
    },
    data,
  }
}


export const updateInstitute = async (instituteId: string,updateData: InstituteInput)=>{
  const existingInstitute = await prisma.institute.findUnique({
      where: { id: instituteId },
  });

  if (!existingInstitute) {

    throw AppError.notFound("Institute not found");
  }

  const updatedInstitute = await prisma.institute.update({
    where: { id: instituteId },
    data: updateData,
  });

  return updatedInstitute;
};export const deleteInstitute = async (instituteId: string) => {
  const existingInstitute = await prisma.institute.findUnique({
    where: { id: instituteId },
  });

  if (!existingInstitute) {
    throw AppError.notFound("Institute not found");
  }

  await prisma.institute.delete({
    where: { id: instituteId },
  });

  return null;
};