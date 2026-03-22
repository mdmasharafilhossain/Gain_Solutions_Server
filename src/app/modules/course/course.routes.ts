import express from "express";
import {create,getAll,update,remove} from "./course.controller";
import { validate } from "../../middlewares/validate";
import {createCourseSchema,updateCourseSchema,} from "./course.schema";
import { checkAuth } from "../../middlewares/checkAuth";

const router = express.Router();

router.post("/",checkAuth,validate(createCourseSchema),create);
router.get("/", checkAuth, getAll);
router.patch("/:id",checkAuth,validate(updateCourseSchema),update);
router.delete("/:id", checkAuth, remove);

export default router;