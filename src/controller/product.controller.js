// Importa o service de produtos, que contém as regras de negócio
import productService from '../service/product.service.js'

// Controller para criar um novo produto
async function createdProductController(req, res) {
    const newProduct = req.body // Dados do produto que vieram no corpo da requisição
    const userId = req.userId // ID do usuário autenticado (capturado pelo middleware auth)
    try {
        const createdProduct = await productService.createProductService(newProduct, userId)
        res.status(201).send({ createdProduct }) // Retorna o produto criado
    } catch(e) {
        res.status(400).send(e.message) // Em caso de erro, responde com erro 400
    }
}

// Controller para listar todos os produtos
async function findAllProductsController(req, res) {
    try {
        const products = await productService.findAllProductsService()
        res.send({ products }) // Retorna todos os produtos
    } catch(e) {
        res.status(404).send(e.message) // Caso não encontre, responde com erro 404
    }
}

// Controller para buscar um produto pelo ID
async function findProductsByIdController(req, res) {
    const productId = req.params.id // Captura o ID do produto pela URL
    try {
        const product = await productService.findProductByIdService(productId)
        res.send({ product }) // Retorna o produto encontrado
    } catch(e) {
        res.status(404).send(e.message) // Se não encontrar, responde com erro 404
    }
}

// Controller para atualizar um produto
async function updateProductController(req, res) {
    const updatedProduct = req.body // Dados atualizados do produto
    const productId = req.params.id // ID do produto a ser atualizado
    const userId = req.userId // ID do usuário autenticado (capturado pelo middleware auth)

    try {
        const response = await productService.updateProductService(updatedProduct, productId, userId)
        res.send(response) // Retorna o produto atualizado
    } catch(e) {
        res.status(400).send(e.message) // Em caso de erro (como não autorizado), responde com erro 400
    }
}


// Controller para deletar um produto
async function deleteProductController(req, res) {
    const productId = req.params.id // ID do produto a ser deletado
    const userId = req.userId // ID do usuário autenticado

    try {
        const response = await productService.deleteProductService(productId, userId)
        res.send(response) // Retorna mensagem de sucesso
    } catch(e) {
        res.status(400).send(e.message) // Em caso de erro, responde com erro 400
    }
}

// Controller para buscar produtos por nome ou categoria
async function searchProductsController(req, res) {
    const { search } = req.query // Captura o termo de busca na URL (ex.: /products/search?search=arroz)
    try {
        const products = await productService.searchProductService(search)
        res.send({ products }) // Retorna os produtos encontrados
    } catch(e) {
        res.status(400).send(e.message) // Em caso de erro, responde com erro 400
    }
}

// Exporta todos os controllers para serem utilizados nas rotas
export default {
    createdProductController,
    findAllProductsController,
    findProductsByIdController,
    updateProductController,
    deleteProductController,
    searchProductsController
}