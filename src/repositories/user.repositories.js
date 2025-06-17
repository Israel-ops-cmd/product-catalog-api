// Importa a conexão com o banco de dados
import db from '../config/database.js'

// Cria a tabela 'users' caso ela ainda não exista
db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
        `
)

// Cria um novo usuário no banco de dados
// Recebe um objeto com username, email e password
// Retorna o usuário criado com o id gerado
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

// Busca um usuário pelo username
// Retorna os dados do usuário encontrado ou null
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

// Busca um usuário pelo email
// Retorna os dados do usuário encontrado ou null
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

// Busca um usuário pelo ID
// Retorna os dados do usuário encontrado ou null
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

// Retorna uma lista com todos os usuários cadastrados no banco
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

// Atualiza os dados de um usuário específico (pelo ID)
// Recebe um objeto com os campos que devem ser atualizados
// Retorna o objeto atualizado junto com o id
function updateUserRepository(id, user) {
    return new Promise((res, rej) => {
        const fields = ['username', 'email', 'password']
        let query = 'UPDATE users SET '
        const values = []

        // Monta dinamicamente a query SQL apenas com os campos que foram passados
        fields.forEach((field) => {
            if(user[field] !== undefined) {
                query += `${field} = ?,`
                values.push(user[field])
            }
        })

        // Remove a última vírgula da query
        query = query.slice(0, -1)

        // Adiciona a cláusula WHERE para atualizar o usuário correto
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

// Deleta um usuário do banco de dados pelo ID
// Retorna uma mensagem de sucesso junto com o id deletado
async function deleteUserRepository(id) {
    return new Promise((res, rej) => {
        db.run(`
            DELETE FROM users
            WHERE id = ?
            `, [id], (err) => {
                if(err) {
                    rej(err)
                } else {
                    res({ message: 'user deleted successfully', id})
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
    updateUserRepository,
    deleteUserRepository
}