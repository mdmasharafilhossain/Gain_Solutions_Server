import { Request, Response, NextFunction } from "express";
import * as courseService from "./course.service";


export const create = async (req: Request,res: Response,next: NextFunction):Promise<void> => {
  try {

    const createdCourse = await courseService.createCourse(req.body);
    res.status(201).json({
      success: true,
      data: createdCourse,
    });
  } catch (error) {


    next(error);
  }
};
export const getAll = async(req: Request, res:Response,next: NextFunction): Promise<void> => {
  try {
    const pageNumber =Number(req.query.page) || 1;
    const pageSize = Number(req.query.limit) || 10;

    const result = await courseService.getCourses(pageNumber, pageSize);

    res.status(200).json({
      success: true,
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
export const update = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
try {
    const courseId = req.params.id;
    const updatedCourse = await courseService.updateCourse(
      courseId as string,
      req.body
    );

    res.status(200).json({
      success: true,
      data: updatedCourse,
    });
  } catch (error){
    next(error);
  }
};
export const remove = async (req: Request,res: Response,next: NextFunction):Promise<void> => {
  try{

    const courseId = req.params.id;

    await courseService.deleteCourse(courseId as string);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error){
    next(error);
  }
};