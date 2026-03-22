import { Request, Response, NextFunction } from "express";
import {createInstitute,getInstitutes,updateInstitute,deleteInstitute,} from "./institute.service";

export const create = async (req: Request,res: Response,next: NextFunction):Promise<void> =>{
  try {
    const createdInstitute =await createInstitute(req.body);
    res.status(201).json({

      success: true,
      data: createdInstitute,
    });
  } catch(error) {
    next(error);
  }
};
export const getAll = async (req: Request,res: Response,next: NextFunction): Promise<void>=> {
  try {
    const pageNumber = Number(req.query.page) || 1;

    const pageSize = Number(req.query.limit) || 10;
    const result = await getInstitutes(pageNumber, pageSize);
res.status(200).json({
      success: true,
      meta: result.meta,
      data: result.data,
    });

  } catch (error){
    next(error);
  }
};
export const update = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
  try {
    const instituteId = req.params.id;
      const updatedInstitute = await updateInstitute(
        instituteId as string,
        req.body
        );
    res.status(200).json({
      success: true,
      data: updatedInstitute,
    });
  } catch(error) {
    next(error);
  }
};
export const remove = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
  try {
    const instituteId = req.params.id;
    await deleteInstitute(instituteId as string);
      res.status(200).json({
        success: true,
        message: "Institute deleted successfully",
      });
  } catch (error){
    
    next(error);
  }
};