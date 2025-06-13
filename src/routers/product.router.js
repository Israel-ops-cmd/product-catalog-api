import {Router} from 'express'
import productController from '../controller/product.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validation.middlewares.js'
import { productSchema } from '../schema/product.schema.js'

const router = Router()

router.post("/products", validate(productSchema), authMiddleware, productController.createdProductController)

export default router

