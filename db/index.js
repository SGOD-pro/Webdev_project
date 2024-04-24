const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        const mongodbInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb connected", mongodbInstance.connection.host);
       

    } catch (error) {
       
        throw new Error
    }
}
module.exports = connectDB