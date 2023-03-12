const jwt = require("jsonwebtoken")
const HttpError = require("../helpers")
const { SECRET_KEY } = process.env
const ModelAuthUser = require("../models/authUser")

const authenticate = async (req, res, next) => {
    const { authorization } = req.headers
    const [bearer, token] = authorization.split(" ")
    if (bearer !== "Bearer") {
        next(HttpError(401))
    }

    try {
        const { id } = jwt.verify(token, SECRET_KEY)
        const user = await ModelAuthUser.findById(id)
        if (!user || !user.token) {
            HttpError(401)
        }
        req.user = user
        next()
    } catch {
        next(HttpError(401))
    }
}

module.exports = authenticate