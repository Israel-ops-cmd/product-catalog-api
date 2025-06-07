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

function findUserByUsernameRepository(username) {
    return new Promise((res, rej) => {
        db.get(`
            SELECT id, username, email, password FROM users
            WHERE username = ?
            `, [username], (err, row) => {
                if(err) {
                    rej(err)
                } else {
                    res(row)
                }
            })
    })
}

function findUserByEmailRepository(email) {
    return new Promise((res, rej) => {
        db.get(`
            SELECT id, username, email, password FROM users
            WHERE email = ?
            `, [email], (err, row) => {
                if(err) {
                    rej(err)
                } else {
                    res(row)
                }
            })
    })
}

function findUserByIdRepository(id) {
    return new Promise((res, rej) => {
        db.get(`
            SELECT id, username, email, password FROM users
            WHERE id = ?
            `, [id], (err, row) => {
                if(err) {
                    rej(err)
                } else {
                    res(row)
                }
            })
    })
}

function findAllUserRepository() {
    return new Promise((res, rej) => {
        db.all(`
            SELECT id, username, email, password FROM users
            `, [], (err, rows) => {
                if(err) {
                    rej(err)
                } else {
                    res(rows)
                }
            })
    })
}

function updateUserRepository(id, user) {
    return new Promise((res, rej) => {
        const fields = ['username', 'email', 'password']
        let query = 'UPDATE users SET '
        const values = []

        fields.forEach((field) => {
            if(user[field] !== undefined) {
                query += `${field} = ?,`
                values.push(user[field])
            }
        })

        query = query.slice(0, -1)
        query += 'WHERE id = ?'
        values.push(id)

        db.run(query, values, (err) => {
            if(err) {
                rej(err)
            } else {
                res({ ...user, id})
            }
        })
    })
}

export default {
    createUserRepository,
    findUserByUsernameRepository,
    findUserByEmailRepository,
    findUserByIdRepository,
    findAllUserRepository,
    updateUserRepository
}