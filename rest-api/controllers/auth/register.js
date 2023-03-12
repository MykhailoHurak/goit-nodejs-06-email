const bcrypt = require("bcrypt")
const gravatar = require("gravatar")
const {nanoid} = require("nanoid")

const ModelAuthUser = require("../../models/authUser")
const { HttpError, sendEmail } = require("../../helpers")

const register = async (req, res) => {
    const { email, password } = req.body

    const user = await ModelAuthUser.findOne({ email })

    if (user) {
        throw HttpError(409, "Conflict: Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const avatarURL = gravatar.url(email) // створюється тимчасова рандомна аватарка

    const verificationCode = nanoid()

    const userNew = await ModelAuthUser.create({ ...req.body, password: hashPassword, avatarURL, verificationCode })
    
    const verifyEmail = {
        to: email,
        subject: "Verify your email",
        html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationCode}">Click verify email</a>`
    }

    await sendEmail(verifyEmail)

    res.status(201).json({
        name: userNew.name,
        email: userNew.email,
    })
}

module.exports = register