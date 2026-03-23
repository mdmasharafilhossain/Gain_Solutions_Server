import express from "express";
import {create,getAll,update,remove,getByInstitute,getTopCourses,getTopStudents,performanceCompareController,} from "./result.controller";
import { validate } from "../../middlewares/validate";
import {createResultSchema,updateResultSchema,} from "./result.schema";
import { checkAuth } from "../../middlewares/checkAuth";

const router = express.Router();
router.post("/",checkAuth,validate(createResultSchema),create);
router.get("/", checkAuth, getAll);
router.patch("/:id",checkAuth,validate(updateResultSchema),update);
router.delete("/:id", checkAuth, remove);
router.get("/institute/:instituteId",checkAuth,getByInstitute);
router.get("/top-courses",checkAuth,getTopCourses);
router.get("/top-students",checkAuth,getTopStudents);
router.get("/performance-test",checkAuth,performanceCompareController);

export default router;