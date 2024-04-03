function isVerified(req, _, next) {
    if (req.session._id) {
        return next()
    }
    throw new Error("User not logged in.")
}
export default isVerified