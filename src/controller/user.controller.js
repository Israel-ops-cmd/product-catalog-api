// Importa os serviços responsáveis pela regra de negócio
import userService from "../service/user.service.js"
import { loginService } from '../service/auth.service.js'

// Controller responsável por criar um novo usuário
// Recebe os dados do corpo da requisição e retorna um token JWT
async function createUserController(req, res) {
    const newUser = req.body
    try {
        const token = await userService.createUserService(newUser)
        res.status(201).send({ token })
    } catch(e) {
        return res.status(400).send(e.message)
    }
}

// Controller responsável por realizar o login
// Recebe email e senha no corpo da requisição
// Retorna um token JWT se a autenticação for bem-sucedida
async function loginUserController(req, res) {
    const { email, password } = req.body
    try {
        const token = await loginService(email, password)
        res.send({ token })
    } catch(e) {
        return res.status(400).send(e.message)
    }
}

// Controller que retorna todos os usuários cadastrados
async function findAllUserController(req, res){
    try {
        const users = await userService.findAllUserService()
        res.status(201).send({ users })
    } catch(e) {
        return res.status(400).send(e.message)
    }
}

// Controller que busca um usuário específico pelo ID (parâmetro da rota)
async function findUserByIdController(req, res) {
    const { id } = req.params
    try {
        const user = await userService.findUserByIdService(id)
        res.send({ user })
    } catch(e) {
        return res.status(404).send(e.message)
    }
}

// Controller que atualiza os dados de um usuário pelo ID
// Recebe os novos dados no corpo da requisição
async function updateUserController(req, res) {
    const { id } = req.params
    const newUser = req.body
    try {
        const user = await userService.updateUserService(newUser, id)
        res.send({ user })
    } catch(e) {
        return res.status(400).send(e.message)
    }
}

// Controller que deleta um usuário específico pelo ID
async function deleteUserController(req, res) {
    const { id } = req.params
    try {
        const message = await userService.deleteUserService(id)
        res.status(201).send({ message })
    } catch(e) {
        return res.status(400).send(e.message)
    }
}

export default {
    createUserController,
    findAllUserController,
    updateUserController,
    deleteUserController,
    loginUserController,
    findUserByIdController
}