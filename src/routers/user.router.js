// Importa o Router do Express para criar as rotas
import {Router} from "express"
// Importa o controller de usuários, que possui as funções que executam as regras
import userController from '../controller/user.controller.js'
// Importa middlewares de validação
import { validate, validateUserId } from '../middlewares/validation.middlewares.js'
// Importa o schema do usuário para validar os dados na criação
import { userSchema } from "../schema/user.schema.js" 
// Importa o middleware de autenticação
import { authMiddleware } from "../middlewares/auth.middleware.js"

// Cria a instância do roteador
const router = Router()

// Rota para criar um novo usuário (valida o body usando o schema do usuário)
router.post("/", validate(userSchema), userController.createUserController)
// Rota para login de usuário (gera e devolve o token)
router.post("/login", userController.loginUserController)
// Autentica todas as rotas abaixo
router.use(authMiddleware)
// Buscar todos os usuários
router.get("/", userController.findAllUserController)
// Buscar um usuário específico pelo ID (valida se o ID é um número inteiro positivo)
router.get("/:id", validateUserId, userController.findUserByIdController)
// Atualizar um usuário específico (valida se o ID é válido)
router.patch("/:id", validateUserId, userController.updateUserController)
// Deletar um usuário específico (valida se o ID é válido)
router.delete("/:id", validateUserId, userController.deleteUserController)

export default router