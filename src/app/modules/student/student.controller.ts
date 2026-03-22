import { Request, Response, NextFunction } from "express";
import * as studentService from "./student.service";

export const create = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
  try {
       const createdStudent = await studentService.createStudent(req.body);

      res.status(201).json({
      success: true,
      data: createdStudent,
    });

  } catch (error){
    next(error);
  }
};
export const getAll = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
  try {
    const pageNumber = Number(req.query.page) || 1;
    const pageSize = Number(req.query.limit) || 10;

    const result = await studentService.getStudents(
      pageNumber,
      pageSize
    );

      res.status(200).json({
        success: true,
        meta: result.meta,
        data: result.data,
    });
  }   catch (error){
    next(error);
  }
};
export const update = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
  try {
    const studentId = req.params.id;

    const updatedStudent = await studentService.updateStudent(
      studentId as string,
      req.body
    );

    res.status(200).json({
      success: true,
      data: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};


export const remove = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
    try {
     const studentId = req.params.id;
    await studentService.deleteStudent(studentId as string);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  }  catch (error) {
      next(error);
  }
};