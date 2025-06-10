import {Router} from "express"
import userController from '../controller/user.controller.js'
import { validate } from '../middlewares/validation.middlewares.js'
import { userSchema } from "../schema/user.schema.js" 

const router = Router()

router.post("/users", validate(userSchema), userController.createUserController)
router.post("/users/login", userController.loginUserController)
router.get("/users", userController.findAllUserController)
router.patch("/users/:id", userController.updateUserController)
router.delete("/users/:id", userController.deleteUserController)

export default router