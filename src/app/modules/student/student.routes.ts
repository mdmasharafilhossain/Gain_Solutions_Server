import express from "express"

import { create, getAll, update, remove } from "./student.controller"
import { checkAuth } from "../../middlewares/checkAuth"
import { validate } from "../../middlewares/validate"
import { createStudentSchema, updateStudentSchema } from "./student.schema"


const router = express.Router()

router.post("/", checkAuth, validate(createStudentSchema), create)
router.get("/", checkAuth, getAll)
router.patch("/:id", checkAuth, validate(updateStudentSchema), update)
router.delete("/:id", checkAuth, remove)

export default router