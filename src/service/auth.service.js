// Importa o jsonwebtoken, utilizado para gerar e validar tokens JWT
import jwt from 'jsonwebtoken'
// Importa as variáveis de ambiente do arquivo .env
import "dotenv/config"
// Importa o repositório de usuários para consultar os dados no banco
import userRepository from '../repositories/user.repositories.js'
// Importa o bcrypt, utilizado para comparar e criptografar senhas
import bcrypt from 'bcrypt'

// Função que gera um token JWT
function generateJWT(id) {
    return jwt.sign( // Gera o token
        { id }, // Payload (informação que vai dentro do token, no caso o ID do usuário)
        process.env.SECRET_JWT, // Chave secreta (vem do .env)
        { expiresIn: 86400 } // Tempo de expiração do token (24 horas = 86400 segundos)
    )
}

// Função responsável por realizar o login do usuário
async function loginService(email, password) {
    // Busca o usuário no banco através do e-mail
    const user = await userRepository.findUserByEmailRepository(email)

    // Se não encontrar o usuário, lança um erro
    if(!user) throw new Error('Invalid user!')

    // Compara a senha fornecida com o hash armazenado no banco
    const isPasswordValid = await bcrypt.compare(password, user.password)

    // Se a senha não for válida, lança um erro
    if(!isPasswordValid) throw new Error('Invalid user!')
    
    // Se estiver tudo certo, gera e retorna um token JWT
    return generateJWT(user.id)
}

// Exporta as funções para serem usadas em outras partes do projeto
export { generateJWT, loginService }