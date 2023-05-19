const mongoose = require('mongoose');

const connectDB = async () =>{
    try {
        mongoose.set('strictQuery',false);
        const conn = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`Connected to mongodb : ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;