import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('catalog_db.sqlite', (err) => {
    if(err) {
        console.log("Erro ao conectar o banco de dados: ", err.message)
    } else {
        console.log("Conectado com sucesso ao banco de dado SQlite")
    }
})

export default db