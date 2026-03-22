import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodType, ZodError } from "zod";

export const validate = <T>(schema: ZodType<T>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {

    const result = schema.safeParse({
      body: req.body,

    });

    if (!result.success) {

         const error = result.error as ZodError;

      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
            
        })),
      });
      return;
    }

    next();
  };
};