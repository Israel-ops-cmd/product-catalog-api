// Importa o repositório que faz acesso ao banco de dados
import userRepository from '../repositories/user.repositories.js'
// Importa a função que gera o token JWT
import { generateJWT } from '../service/auth.service.js'
// Importa o bcrypt para criptografar senhas
import bcrypt from 'bcrypt'

// Cria um novo usuário no sistema
// Verifica se username ou email já estão cadastrados
// Criptografa a senha antes de salvar
// Gera e retorna um token JWT para o usuário criado
async function createUserService (newUser) {
    const foundUserUsername = await userRepository.findUserByUsernameRepository(newUser.username)
    if(foundUserUsername) throw new Error('User already exists!')
    const foundUserEmail = await userRepository.findUserByEmailRepository(newUser.email)
    if(foundUserEmail) throw new Error('User already exists!')
    const passHash = await bcrypt.hash(newUser.password, 10)
    const user = await userRepository.createUserRepository({ ...newUser, password: passHash})
    if(!user) throw new Error('Error creating user!')
    console.log(user.id)
    const token = generateJWT(user.id)
    return token
}

// Busca um usuário pelo ID
// Retorna os dados do usuário se encontrado
async function findUserByIdService(id) {
    const user = await userRepository.findUserByIdRepository(id)
    if(!user) throw new Error('User not found!')
    return user
}

// Retorna uma lista com todos os usuários cadastrados
async function findAllUserService () {
    const users = await userRepository.findAllUserRepository()
    return users
}

// Atualiza os dados de um usuário específico (pelo ID)
// Se a senha for informada, ela é criptografada antes de atualizar
async function updateUserService(newUser, userId) {
    const user = await userRepository.findUserByIdRepository(userId)
    if(!user) throw new Error('User not found!')
    
    // Criptografa a nova senha se ela foi enviada
    if(newUser.password) {
        newUser.password = await bcrypt.hash(newUser.password, 10)
    }
    const updateUser = await userRepository.updateUserRepository(userId, newUser)
    return updateUser
}

// Deleta um usuário do sistema pelo ID
// Retorna uma mensagem de confirmação
async function deleteUserService(userId) {
    const user = await userRepository.findUserByIdRepository(userId)
    if(!user) throw new Error('User not found')
    const { message } = await userRepository.deleteUserRepository(userId)
    return message
}

export default {
    createUserService,
    findAllUserService,
    updateUserService,
    deleteUserService,
    findUserByIdService
}