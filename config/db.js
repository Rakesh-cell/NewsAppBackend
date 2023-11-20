const mongoose = require('mongoose')

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
        .catch(err => {
            console.error(err)
        })
    console.log(`Mongodb is now connected ${conn.connection.host}`.cyan.underline.bold)
}

module.exports = connectDB;
{
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
}