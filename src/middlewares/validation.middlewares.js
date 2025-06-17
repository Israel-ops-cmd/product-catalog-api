// Importando os schemas de validação de ID de usuário e produto
import { userIdSchema } from "../schema/user.schema.js"
import { productIdSchema } from '../schema/product.schema.js'

// Middleware genérico que valida o corpo (body) da requisição com base no schema recebido
const validate = (schema) => (req, res, next) => {
    try {
        // Faz a validação dos dados enviados no corpo da requisição
        schema.parse(req.body)
        next() // Se estiver tudo certo, segue para o próximo middleware ou controller
    } catch(e) {
        // Se der erro na validação, retorna status 400 e os erros encontrados
        res.status(400).send({ error: e.errors})
    }
}

const validateUserId = (req, res, next) => {
    try {
        // Converte o id da URL (string) para número
        const userId = Number(req.params.id)
        // Valida se o ID é um número inteiro e positivo
        userIdSchema.parse({ id: userId})
        next() // Se estiver válido, segue o fluxo
    } catch(e) {
        // Retorna erro 400 se o ID não for válido
        res.status(400).json({ error: e.errors})
    }
}

const validateProductId = (req, res, next) => {
    try {
        // Converte o ID recebido na URL para número e valida
        productIdSchema.parse({ productId: +req.params.id})
        next() // Continua se estiver válido
    } catch(e) {
        // Se inválido, retorna erro 400 com os detalhes
        res.status(400).json({ error: e.errors})
    }
}

export { validate, validateUserId, validateProductId }