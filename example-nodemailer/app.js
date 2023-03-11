const nodemailer = require("nodemailer")
require("dotenv").config()

const { META_PASSWORD } = process.env

// далі створюємо обєкт налаштувань нашого підключення

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465, // 25, 465, 2525
    secure: true, // вимагає шифрування порт 465
    auth: {
        user: "mykhailohurak@meta.ua", // email, до якого ми підключаємось
        pass: META_PASSWORD,
    }

}

const transport = nodemailer.createTransport(nodemailerConfig) // поверне обєкт, який за цими налаштуваннями буде відправляти пошту

const email = {
    to: "howipa2757@gpipes.com",
    from: "mykhailohurak@meta.ua",
    subject: "Verify mail",
    html: `<p>Verify Mail Success`
}

transport.sendMail(email)
    .then(() => {
        console.log("Email send success")
    })
    .catch((error) => {
        console.log(error.message)
    })