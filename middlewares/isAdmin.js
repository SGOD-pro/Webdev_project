function isAdmin(req, _, next) {
    if (req.session._id && req.session.role===2000) {
        return next();
    }
    const error = new Error("Restricted Area! Not allowed!");
    error.status = "500"; // Adding status property to the error object
    throw error;
}

module.exports = isAdmin;
