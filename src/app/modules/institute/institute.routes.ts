import express from "express"
import { create, getAll, update, remove } from "./institute.controller"
import { checkAuth } from "../../middlewares/checkAuth"


const router = express.Router()

router.post("/", checkAuth, create)
router.get("/", checkAuth, getAll)
router.patch("/:id", checkAuth, update)
router.delete("/:id", checkAuth, remove)

export default router