function isVerified(req, _, next) {
    if (req.session._id && !req.session.role) {
        return next()
    }
    const error = new Error("You are not verified.")
    error.status = "404";
    throw error
}
module.exports = isVerified