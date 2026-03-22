import express, { Request, Response } from "express";
import 'dotenv/config';
// import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";


import authRoutes from "./app/modules/auth/auth.routes";
import instituteRoutes from "./app/modules/institute/institute.routes";
import studentRoutes from "./app/modules/student/student.route";
// import folderRoutes from "./app/modules/folder/folder.routes";
// import fileRoutes from "./app/modules/file/file.route";



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


// app.use(
//   cors({
//     origin:[ process.env.FRONTEND_URL!, process.env.FRONTEND_PROD_URL!],
//     credentials: true,
//   })
// );

// import path from "path";

// app.use(
//   "/uploads",
//   express.static(path.join(__dirname, "../uploads"))
// );
app.use("/api/auth", authRoutes);
app.use("/api/institutes", instituteRoutes);
app.use("/api/students", studentRoutes);
// app.use("/api/folders", folderRoutes);
// app.use("/api/files", fileRoutes);


app.use(globalErrorHandler);
app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to Zoom IT Server");
});

export default app;
