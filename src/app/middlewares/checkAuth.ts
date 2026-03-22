import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../utils/AppError";




export const checkAuth = (req: Request, _res:Response,next:NextFunction): void => {
    try {
        const accessToken = req.cookies?.token;

        if (!accessToken) {

            throw AppError.unauthorized("Access token is missing");
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {

            throw AppError.internalError("JWT secret is not configured");
        }

        const decodedPayload = jwt.verify(accessToken, jwtSecret);
        req.user = decodedPayload;

        next();

    }catch(error){
        next(error);
    }
};