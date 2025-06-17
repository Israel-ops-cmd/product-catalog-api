// Importa o Router do Express, que permite criar agrupamentos de rotas
import { Router } from 'express'

// Importa as rotas de usuários, definidas no arquivo user.router.js
import userRouters from './user.router.js'

// Importa as rotas de produtos, definidas no arquivo product.router.js
import productRouters from './product.router.js'

// Cria uma instância do Router
const routers = Router()

// Todas as rotas que começarem com /users serão tratadas dentro do arquivo user.router.js
// Exemplo: POST /users, GET /users/:id, etc.
routers.use('/users', userRouters)

// Todas as rotas que começarem com /products serão tratadas dentro do arquivo product.router.js
// Exemplo: POST /products, GET /products/search, etc.
routers.use('/products', productRouters)

// Exporta esse agrupamento de rotas para ser usado no arquivo principal da aplicação
export { routers }