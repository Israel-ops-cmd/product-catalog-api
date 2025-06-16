import productService from '../service/product.service.js'

async function createdProductController(req, res) {
    const newProduct = req.body
    const userId = req.userId
    try {
        const createdProduct = await productService.createProductService(newProduct, userId)
        res.status(201).send({ createdProduct })
    } catch(e) {
        res.status(400).send(e.message)
    }
}

async function findAllProductsController(req, res) {
    try {
        const products = await productService.findAllProductsService()
        res.send({ products })
    } catch(e) {
        res.status(404).send(e.message)
    }
}

async function findProductsByIdController(req, res) {
    const productId = req.params.id
    try {
        const product = await productService.findProductByIdService(productId)
        res.send({ product })
    } catch(e) {
        res.status(404).send(e.message)
    }
}

async function updateProductController(req, res) {
    const updatedProduct = req.body
    const productId = req.params.id
    const userId = req.userId

    try {
        const response = await productService.updateProductService(updatedProduct, productId, userId)
        res.send(response)
    } catch(e) {
        res.status(400).send(e.message)
    }
}

async function deleteProductController(req, res) {
    const productId = req.params.id
    const userId = req.userId

    try {
        const response = await productService.deleteProductService(productId, userId)
        res.send(response)
    } catch(e) {
        res.status(400).send(e.message)
    }
}

export default {
    createdProductController,
    findAllProductsController,
    findProductsByIdController,
    updateProductController,
    deleteProductController
}