import {Router} from 'express'
import productController from '../controller/product.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { validate, validateProductId } from '../middlewares/validation.middlewares.js'
import { productSchema } from '../schema/product.schema.js'

const router = Router()

router.post("/products", validate(productSchema), authMiddleware, productController.createdProductController)
router.get("/products", authMiddleware, productController.findAllProductsController)
router.get("/products/:id", validateProductId, authMiddleware, productController.findProductsByIdController)
router.patch("/products/:id", validateProductId, authMiddleware, productController.updateProductController)

export default router

