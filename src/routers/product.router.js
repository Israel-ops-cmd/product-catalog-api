// Importa o Router do Express
import {Router} from 'express'
// Importa os controllers que contêm as funções que respondem às rotas
import productController from '../controller/product.controller.js'
// Importa o middleware de autenticação (valida o token JWT)
import { authMiddleware } from '../middlewares/auth.middleware.js'
// Importa os middlewares de validação de dados (Zod)
import { validate, validateProductId } from '../middlewares/validation.middlewares.js'
// Importa o schema do Zod para validar o corpo da requisição de produto
import { productSchema } from '../schema/product.schema.js'

// Cria uma instância do Router do Express
const router = Router()

// Autenticação de todas as rotas abaixo
router.use(authMiddleware) 

// Rota para criar um novo produto
// Primeiro valida o corpo da requisição (productSchema)
// Depoischama o controller que cria o produto
router.post("/", validate(productSchema), productController.createdProductController)

// Rota para buscar produtos por nome ou categoria (utiliza query params)
router.get("/search", productController.searchProductsController)

// Rota para listar todos os produtos
router.get("/", productController.findAllProductsController)

// Rota para buscar um produto específico pelo ID
// Valida se o ID é válido (validateProductId)
router.get("/:id", validateProductId, productController.findProductsByIdController)

// Rota para atualizar um produto específico
// Valida se o ID é válido
router.patch("/:id", validateProductId, productController.updateProductController)

// Rota para deletar um produto específico
// Valida se o ID é válido
router.delete("/:id", validateProductId, productController.deleteProductController)

// Exporta o router para ser usado no arquivo principal da aplicação
export default router

