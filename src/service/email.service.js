import nodemailer from 'nodemailer'
import 'dotenv/config.js'

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

function sendEmail(to, productName) {
    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject: 'Produto Cadastrado',
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
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.error('Error sending email: ', err)
        } else {
            console.log('Email sent: ', info.response)
        }
    })
}



export default sendEmail