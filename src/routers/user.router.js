import {Router} from "express"
import userRouters from '../controller/user.controller.js'
import { validate } from '../middlewares/validation.middlewares.js'
import { userSchema } from "../schema/user.schema.js" 

const router = Router()

router.post("/users", validate(userSchema), userRouters.createUserController)

export default router