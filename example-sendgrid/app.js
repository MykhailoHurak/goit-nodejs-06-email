const sendgridMail = require("@sendgrid/mail")
require("dotenv").config()

const { SENDGRID_API_KEY } = process.env

sendgridMail.setApiKey(SENDGRID_API_KEY)

const email = {
    to: "howipa2757@gpipes.com",
    from: "mykhailohurak@gmail.com",
    subject: "Verify mail",
    html: `<p>Verify Mail Success`
}

sendgridMail.send(email)
    .then(() => {
        console.log("Email send success")
    })
    .catch((error) => {
        console.log(error.message)
    })
