// Importa a biblioteca Zod para validação de dados
import { z } from 'zod'

// Schema para validação dos dados do usuário
const userSchema = z.object({
    // Username deve ser uma string com no mínimo 3 caracteres
    username: z.string().min(3, 'Username is required'),
    // Email deve ser uma string no formato de email válido
    email: z.string().email('Invalid email'),
    // Senha deve ter no mínimo 6 caracteres
    password: z.string().min(6, 'Password must be at least 6 characters long')
})

// Schema para validação do ID do usuário
const userIdSchema = z.object({
    // ID deve ser um número inteiro e positivo
    id: z.number().int().positive('User ID must be a positive integer')
})

export {
    userSchema,
    userIdSchema
}