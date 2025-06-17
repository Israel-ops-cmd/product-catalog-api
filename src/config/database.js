// Importa o módulo sqlite3, que permite interagir com bancos de dados SQLite no Node.js
import sqlite3 from 'sqlite3'

// Cria uma conexão com o banco de dados chamado 'catalog_db.sqlite'
// Se o arquivo não existir, o SQLite irá criá-lo automaticamente
const db = new sqlite3.Database('catalog_db.sqlite', (err) => {
    // Verifica se houve erro na conexão
    if(err) {
        // Se houver erro, exibe no console a mensagem de erro
        console.log("Erro ao conectar o banco de dados: ", err.message)
    } else {
        // Se não houver erro, exibe mensagem de sucesso
        console.log("Conectado com sucesso ao banco de dado SQlite")
    }
})

// Exporta a conexão do banco para ser usada em outros arquivos do projeto
export default db