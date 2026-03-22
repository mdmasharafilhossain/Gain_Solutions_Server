import { Request, Response, NextFunction } from "express"

export const validate = (schema: any) => {
 return (req: Request, res: Response, next: NextFunction)=>{

  const result = schema.safeParse({
  body: req.body,

})

  if (!result.success){
   return res.status(400).json({
    message: result.error.errors,
   })
  }

  next()

 }
}