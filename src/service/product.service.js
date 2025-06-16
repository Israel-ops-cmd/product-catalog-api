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

export default {
    createProductService,
    findAllProductsService
}