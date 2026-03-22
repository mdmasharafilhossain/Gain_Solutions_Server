import express from "express"
import { signup, signin, logout } from "./auth.controller"
import { signupSchema, signinSchema } from "./auth.schema"
import { validate } from "../../middlewares/validate"

const router = express.Router()

router.post("/register", validate(signupSchema), signup)
router.post("/login", validate(signinSchema), signin)
router.post("/logout", logout)

export default router