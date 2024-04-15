function isVerified(req, _, next) {
    if (req.session._id) {
        return next()
    }
    throw new Error("Restricted page")
}
module.exports= isVerified