import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "./auth.service";

export const signup = async (req: Request,res: Response,next: NextFunction):Promise<void> => {
  try {
    const createdUser = await registerUser(req.body);
    res.status(201).json({
      success: true,
      data: createdUser,
    });
  } catch(error) {
      next(error);
  }
};

export const signin = async (req: Request,res: Response,next: NextFunction): Promise<void>=> {
  try {
    const accessToken = await loginUser(req.body);

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",

    });
    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch(error){

    next(error);
  }
};
export const logout = (_req: Request,res: Response,next: NextFunction):void =>{
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",

    });
    res.status(200).json({
      success: true,
      message: "Logout successful",

    });
  } catch (error){
    next(error);
  }
};