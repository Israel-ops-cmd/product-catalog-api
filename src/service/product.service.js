// Importa os repositórios de produtos e usuários
import productRepository from '../repositories/products.repositories.js'
import userRepository from '../repositories/user.repositories.js'
// Importa o serviço de envio de e-mail
import sendEmail from '../service/email.service.js'

async function createProductService(newProduct, userId) {
    // Cria o produto no banco
    const createdProduct = await productRepository.createProductRepository(newProduct, userId)
    if(!createdProduct) throw new Error('Error creating product!')
    
    // Busca o usuário dono do produto
    const user = await userRepository.findUserByIdRepository(userId)

    // Se encontrou o usuário e ele tem e-mail, dispara um e-mail informando que o produto foi criado
    if(user && user.email) {
        sendEmail(user.email, createdProduct.name)
    }
    return createdProduct
}

// Busca todos os produtos
async function findAllProductsService() {
    const products = await productRepository.findAllProductsRepository()
    return products
}

// Busca produto por ID
async function findProductByIdService(productId) {
    const product = await productRepository.findProductsByIdRepository(productId)
    if(!product) throw new Error('Product not found!')
    return product
}

// Atualiza o produto
async function updateProductService(updatedProduct, productId, userId) {
    const product = await productRepository.findProductsByIdRepository(productId)
    if(!product) throw new Error('Product not found!')
    if(product.userId !== userId) throw new Error('Unauthorized!')
    const response = await productRepository.updateProductRepository(updatedProduct, productId)
    return response
}

// Deleta o produto
async function deleteProductService(productId, userId) {
    const product = await productRepository.findProductsByIdRepository(productId)
    if(!product) throw new Error('Product not found!')
    if(product.userId !== userId) throw new Error('Unauthorized')
    const response = await productRepository.deleteProductRepository(productId)
    return response
}

// Busca produtos com ou sem filtro (search)
async function searchProductService(search) {
    if(!search) return await productRepository.findAllProductsRepository()
    const products = await productRepository.searchProductsRepository(search)
    return products
}

export default {
    createProductService,
    findAllProductsService,
    findProductByIdService,
    updateProductService,
    deleteProductService,
    searchProductService
}