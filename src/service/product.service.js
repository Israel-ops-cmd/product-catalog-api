import productRepository from '../repositories/products.repositories.js'

async function createProductService(newProduct, userId) {
    const createdProduct = await productRepository.createProductRepository(newProduct, userId)
    if(!createdProduct) throw new Error('Error creating product!')
    return createdProduct
}

async function findAllProductsService() {
    const products = await productRepository.findAllProductsRepository()
    return products
}

async function findProductByIdService(productId) {
    const product = await productRepository.findProductsByIdRepository(productId)
    if(!product) throw new Error('Product not found!')
    return product
}

export default {
    createProductService,
    findAllProductsService,
    findProductByIdService
}