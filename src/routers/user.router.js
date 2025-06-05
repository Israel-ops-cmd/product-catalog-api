import {Router} from "express"
import userRouters from '../controller/user.controller.js'

const router = Router()

router.post("/users", userRouters.createUserController)

export default router