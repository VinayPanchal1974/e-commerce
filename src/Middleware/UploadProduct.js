const multer = require("multer")


const storage = multer.diskStorage({
    destination: "./public/uplaods",
    filename: (request, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        const path = "IMG" + uniqueSuffix + "." + file.originalname.split(".")[file.originalname.split(".").length - 1]
        request.imagePath = path
        cb(null, path)
    }
})
const fileFilter = (request, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
        cb(null, true)
    } else {
        cb("unsupported file type", false)
    }
}
const uploadUserImage = multer({
    storage: storage,
    limits: 1024 * 1024 * 2,
    fileFilter: fileFilter,
})

module.exports = uploadUserImage