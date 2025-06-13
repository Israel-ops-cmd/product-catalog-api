import db from '../config/database.js'

db.run(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY AUTOINCREMENT,
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

export default {
    createProductRepository
}