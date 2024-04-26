const { request } = require("express");

function isAdmin(req, _, next) {
    if (req.session._id && req.session.role) {
        console.log("kii");
        return next();
    }
    const error = new Error("Restricted Area! Not allowed!");
    error.status = "500";
    throw error;
}

module.exports = isAdmin;
