import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      cookies: {
        token?: string;
      };
      user?: string | JwtPayload;
    }
  }
}