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

export default {
    createdProductController
}