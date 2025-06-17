// Importa o Zod para validação de dados
import { z } from 'zod'

// Schema para validação dos dados ao criar ou atualizar um produto
const productSchema = z.object({
    // O nome do produto deve ser uma string, com no mínimo 1 caractere
    name: z.string().min(1, 'Name is required!'),

    // A categoria do produto também deve ser uma string, com no mínimo 1 caractere
    category: z.string().min(1, 'Category is required!'),

    // O preço vem como string, mas deve seguir um formato numérico (ex.: "10", "10.50", "10,50")
    // Regex valida se é um número inteiro ou decimal com até duas casas
    // Se o usuário colocar vírgula, ela é convertida para ponto
    // Depois o valor é transformado para Number
    price: z.string().regex(/^\d+([.,]\d{1,2})?$/, "Invalid Price!").transform((val) => Number(val.replace(',', '.')))
})

// Schema para validação do ID do produto
const productIdSchema = z.object({
    // O ID do produto deve ser um número inteiro e positivo
    productId: z.number().int().positive('Product ID Must be a positive integer')
})

// Exporta os schemas para serem usados nos middlewares de validação
export { productSchema, productIdSchema }