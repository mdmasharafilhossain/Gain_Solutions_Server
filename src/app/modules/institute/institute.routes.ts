import express from "express"
import { create, getAll, update, remove } from "./institute.controller"
import { checkAuth } from "../../middlewares/checkAuth"
import { validate } from "../../middlewares/validate"
import { InstituteSchema } from "./institute.schema"


const router = express.Router()

router.post("/", checkAuth, validate(InstituteSchema), create)
router.get("/", checkAuth, getAll)
router.patch("/:id", checkAuth, validate(InstituteSchema), update)
router.delete("/:id", checkAuth, remove)

export default router