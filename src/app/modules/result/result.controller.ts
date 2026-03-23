import { Request, Response, NextFunction } from "express";
import * as resultService from "./result.service";
export const create = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
try{
    const createdResult = await resultService.createResult(req.body);
    res.status(201).json({
      success: true,
      data: createdResult,
    });
  }catch(error){
    next(error);
  }
};
export const getAll = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
try {
       const pageNumber = Number(req.query.page) || 1;
       const pageSize = Number(req.query.limit) || 10;
       const result = await resultService.getResults(pageNumber, pageSize);

    res.status(200).json({
      success: true,
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
export const update = async (req: Request,res: Response,next: NextFunction):Promise<void> => {
  try {
    const resultId =req.params.id;
    const updatedResult = await resultService.updateResult(
      resultId as string,
      req.body
    );
    res.status(200).json({
      success: true,
      data: updatedResult,
    });
  } catch (error) {
    next(error);
  }
};
export const remove = async (req: Request,res: Response,next: NextFunction):Promise<void> => {
try{
    const resultId = req.params.id;
    await resultService.deleteResult(resultId as string);
    res.status(200).json({
      success: true,
      message: "Result deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getByInstitute = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
  try {
    const instituteId = req.params.instituteId;
    const pageNumber = Number(req.query.page) || 1;
    const pageSize = Number(req.query.limit) || 10;
    const result = await resultService.getResultsByInstitute(
      instituteId as string,
      pageNumber,
      pageSize
    );
    res.status(200).json({
      success: true,
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
export const getTopCourses = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
try {
    const year = Number(req.query.year);
    const data = await resultService.getTopCoursesPerYear(year);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
export const getTopStudents = async (_req: Request,res: Response,next: NextFunction): Promise<void> => {
try{
    const data = await resultService.getTopStudents();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
export const performanceCompareController = async (_req: Request,res: Response,next: NextFunction
):Promise<void> => {
try{
    const data = await resultService.performanceCompare();

    res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    next(error);
  }
};
export const performance = async ( _req: Request,res: Response,next: NextFunction
):Promise<void> => {
  try {
    const data = await resultService.performanceTest();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};