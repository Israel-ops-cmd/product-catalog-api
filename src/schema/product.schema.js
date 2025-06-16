import { z } from 'zod'

const productSchema = z.object({
    name: z.string().min(1, 'Name is required!'),
    category: z.string().min(1, 'Category is required!'),
    price: z.string().regex(/^\d+([.,]\d{1,2})?$/, "Invalid Price!").transform((val) => Number(val.replace(',', '.')))
})

const productIdSchema = z.object({
    productId: z.number().int().positive('Product ID Must be a positive integer')
})

export { productSchema, productIdSchema }