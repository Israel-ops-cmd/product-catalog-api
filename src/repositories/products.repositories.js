// Importa a conexão com o banco de dados
import db from '../config/database.js'

// Cria a tabela products caso ela não exista no banco
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

// Função para criar um novo produto
async function createProductRepository(newProduct, userId) {
    return new Promise((res, rej) => {
        const { name, category, price } = newProduct
        db.run(`
            INSERT INTO products (name, category, price, userId) VALUES (?, ?, ?, ?)
            `, [name, category, price, userId], 
            function (err) {
                if(err) {
                    rej(err) // Se der erro, rejeita a promise
                } else {
                    // Retorna o produto criado, com o ID gerado
                    res({ id: this.lastID, ...newProduct})
                }
            })
    })
}

// Função que busca todos os produtos
async function findAllProductsRepository() {
    return new Promise((res, rej) => {
        db.all(`
                SELECT * FROM products
            `, [], (err, rows) => {
                if(err) {
                    rej(err)
                } else {
                    res(rows) // Retorna todos os produtos
                }
            })
    })
}

// Função que busca o produto pelo ID
async function findProductsByIdRepository(productId) {
    return new Promise((res, rej) => {
        db.get(`
            SELECT * FROM products WHERE id = ?
            `, [productId], (err, row) => {
                if(err) {
                    rej(err)
                } else {
                    res(row) // Retorna o produto encontrado (ou undefined se não achar)
                }
            })
    })
}

// Função que atualiza o produto por ID
async function updateProductRepository(updatedProduct, productId) {
    return new Promise((res, rej) => {
        const fields = ['name', 'category', 'price']
        let query = "UPDATE products SET "
        const values = []

        // Monta a query dinamicamente, só com os campos enviados
        fields.forEach(field => {
            if(updatedProduct[field] !== undefined) {
                query += `${field} = ?,`
                values.push(updatedProduct[field])
            }
        })

        query = query.slice(0, -1) // Remove a última vírgula
        query += "WHERE id = ?"
        values.push(productId)

        db.run(query, values, function(err) {
            if(err) {
                rej(err)
            } else {
                // Retorna o produto atualizado
                res({ id: productId, ...updatedProduct})
            }
        })

    })
}

// Função que deleta o produto pelo ID
async function deleteProductRepository(productId) {
    return new Promise((res, rej) => {
        db.run(`
                DELETE FROM products
                WHERE id = ?
            `, [productId], (err) => {
                if(err) {
                    rej(err)
                } else {
                    res({ message: 'Produtc deleted sucessfully', productId})
                }
            })
    })
}

// Função que busca produtos por nome ou categoria (pesquisa parcial)
async function searchProductsRepository(search) {
    return new Promise((res, rej) => {
        db.all(`
                SELECT * FROM products WHERE name LIKE ? OR category LIKE ?
            `, [`%${search}%`, `%${search}%`], (err, rows) => {
                if(err) {
                    rej(err)
                } else {
                    res(rows) // Retorna os produtos que batem com a busca
                }
            })
    })
}

export default {
    createProductRepository,
    findAllProductsRepository,
    findProductsByIdRepository,
    updateProductRepository,
    deleteProductRepository,
    searchProductsRepository
}