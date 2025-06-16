import db from '../config/database.js'

db.run(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id)
    )
    `)

async function createProductRepository(newProduct, userId) {
    return new Promise((res, rej) => {
        const { name, category, price } = newProduct
        db.run(`
            INSERT INTO products (name, category, price, userId) VALUES (?, ?, ?, ?)
            `, [name, category, price, userId], 
            function (err) {
                if(err) {
                    rej(err)
                } else {
                    res({ id: this.lastID, ...newProduct})
                }
            })
    })
}

async function findAllProductsRepository() {
    return new Promise((res, rej) => {
        db.all(`
                SELECT * FROM products
            `, [], (err, rows) => {
                if(err) {
                    rej(err)
                } else {
                    res(rows)
                }
            })
    })
}

async function findProductsByIdRepository(productId) {
    return new Promise((res, rej) => {
        db.get(`
            SELECT * FROM products WHERE id = ?
            `, [productId], (err, row) => {
                if(err) {
                    rej(err)
                } else {
                    res(row)
                }
            })
    })
}

async function updateProductRepository(updatedProduct, productId) {
    return new Promise((res, rej) => {
        const fields = ['name', 'category', 'price']
        let query = "UPDATE products SET "
        const values = []

        fields.forEach(field => {
            if(updatedProduct[field] !== undefined) {
                query += `${field} = ?,`
                values.push(updatedProduct[field])
            }
        })

        query = query.slice(0, -1)
        query += "WHERE id = ?"
        values.push(productId)

        db.run(query, values, function(err) {
            if(err) {
                rej(err)
            } else {
                res({ id: productId, ...updatedProduct})
            }
        })

    })
}

export default {
    createProductRepository,
    findAllProductsRepository,
    findProductsByIdRepository,
    updateProductRepository
}