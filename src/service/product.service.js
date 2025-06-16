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

async function updateProductService(updatedProduct, productId, userId) {
    const product = await productRepository.findProductsByIdRepository(productId)
    if(!product) throw new Error('Product not found!')
    if(product.userId !== userId) throw new Error('Unauthorized!')
    const response = await productRepository.updateProductRepository(updatedProduct, productId)
    return response
}

async function deleteProductService(productId, userId) {
    const product = await productRepository.findProductsByIdRepository(productId)
    if(!product) throw new Error('Product not found!')
    if(product.userId !== userId) throw new Error('Unauthorized')
    const response = await productRepository.deleteProductRepository(productId)
    return response
}

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