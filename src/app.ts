import express, { Request, Response } from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";


import authRoutes from "./app/modules/auth/auth.routes";
import instituteRoutes from "./app/modules/institute/institute.routes";
import studentRoutes from "./app/modules/student/student.routes";
import courseRoutes from "./app/modules/course/course.routes";
import resultRoutes from "./app/modules/result/result.routes";



const app = express();


app.use((req, res, next) => {
  const method = req.method.toUpperCase();
  const contentLength = req.headers["content-length"];
  const contentType = (req.headers["content-type"] || "").toLowerCase();


  if (method === "GET" || method === "HEAD") {
    req.body = {};
    return next();
  }

  if (contentLength === "0") {
    req.body = {};
    return next();
  }


  if (contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")) {
    return next();
  }


  if (!contentType) {
    req.body = {};
    return next();
  }


  if (contentType.includes("application/json")) {
    return express.json({ limit: "1mb" })(req, res, next);
  }

  return next();
});



app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/institutes", instituteRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/results", resultRoutes);


app.use(globalErrorHandler);
app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to Gain Solutions Server");
});

export default app;
