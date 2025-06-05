import db from '../config/database.js'

db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
        `
)

function createUserRepository(newUser) {
    return new Promise((res, rej) => {
        const { username, email, password } = newUser
        db.run(`
            INSERT INTO users (username, email, password)
            VALUES(?, ?, ?)
            `, [username, email, password], function (err) {
                if(err) {
                    rej(err)
                } else {
                    res({ id: this.lastID, ...newUser})
                }
            })
    })
}

export default {
    createUserRepository
}