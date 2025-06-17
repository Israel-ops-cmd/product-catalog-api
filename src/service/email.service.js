// Importa o nodemailer, que permite envio de e-mails
import nodemailer from 'nodemailer'
// Importa as variáveis de ambiente do arquivo .env
import 'dotenv/config.js'

// Configura o serviço de e-mail utilizando o Gmail e dados do .env
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL, // E-mail remetente (pega do .env)
        pass: process.env.PASS // Senha do e-mail ou senha de app (pega do .env)
    }
})

// Função responsável por enviar o e-mail
function sendEmail(to, productName) {
    // Define as informações do e-mail
    const mailOptions = {
        from: process.env.EMAIL, // Quem envia
        to, // Para quem será enviado (recebe como parâmetro)
        subject: 'Produto Cadastrado', // Assunto do e-mail
        html: ` 
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #4CAF50;">Novo Produto Cadastrado!</h2>
                <p>Olá,</p>
                <p>
                    Informamos que o produto <strong>${productName}</strong> foi cadastrado com sucesso no sistema.
                </p>
                <p>Se não reconhece essa ação, por favor, entre em contato conosco.</p>
                <p style="margin-top: 30px;">
                    Atenciosamente,<br>
                    <strong>Equipe Product Catalog</strong>
                </p>
            </div>

        `
    } // Conteúdo do e-mail em HTML

    // Realiza o envio do e-mail
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            // Se ocorrer algum erro no envio, exibe no console
            console.error('Error sending email: ', err)
        } else {
            // Caso o e-mail seja enviado com sucesso, exibe a confirmação
            console.log('Email sent: ', info.response)
        }
    })
}


// Exporta a função para ser utilizada em outras partes do projeto
export default sendEmail