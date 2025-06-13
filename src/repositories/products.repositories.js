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