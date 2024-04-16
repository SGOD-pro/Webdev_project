function isVerified(req, _, next) {
    if (req.session._id) {
        return next()
    }
    const error = new Error("You are not verified.")
    error.status = "404"; // Adding status property to the error object
    throw error
}
module.exports = isVerified