import {Router} from 'express'
import productController from '../controller/product.controller.js'

const router = Router()

router.post("/product", productController.createdProductController)

export default router

