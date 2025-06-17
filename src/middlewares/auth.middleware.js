// Carrega variáveis de ambiente do arquivo .env
import 'dotenv/config'
// Importa biblioteca para trabalhar com JSON Web Token
import jwt from 'jsonwebtoken'
// Importa o serviço de usuário, para validar se o usuário do token existe no banco
import userService from '../service/user.service.js'

export function authMiddleware(req, res, next) {
    // Captura o token do header Authorization
    const tokenHeader = req.headers.authorization

    // Se não tiver token no header, retorna erro 401 (não autorizado)
    if(!tokenHeader) {
        return res.status(401).send({ message: 'The token wat not informed'})
    }

    // Quebra o token em duas partes: "Bearer" e o token em si
    const partsToken = tokenHeader.split(" ")

     // Verifica se tem exatamente 2 partes (Bearer e o token)
    if(partsToken.length !== 2) {
        return res.status(401).send({ message: 'Invalid token'}) 
    }

    const [schema, token] = partsToken

    // Verifica se o schema é "Bearer"
    if(!/^Bearer$/i.test(schema)) {
        return res.status(401).send({ message: 'Malformatted token!'})
    }

    // Verifica se o token é válido
    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
    if(err) {
        // Se o token for inválido ou expirado
        return res.status(401).send({ message: 'Invalid token' })
    }

    try {
        // Busca o usuário pelo ID decodificado do token
        const user = await userService.findUserByIdService(decoded.id)
        // Se o usuário não existir, retorna não autorizado
        if(!user || !user.id) {
            return res.status(401).send({ message: 'Invalid token' })
        }

        // Adiciona o ID do usuário na requisição, pra poder usar nos próximos middlewares ou controllers
        req.userId = user.id
        // Se tudo deu certo, segue o fluxo
        return next()

    } catch(error) {
        // Se der erro na busca do usuário
        return res.status(401).send({ message: 'User not found' })
    }
})

}