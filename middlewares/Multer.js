const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // File name will be the original name of the uploaded file
    }
})

const upload = multer({ storage: storage })
module.exports = upload
