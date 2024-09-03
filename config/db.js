const mongoose = require('mongoose');

exports.ConnectDB = async()=>{
    await mongoose.connect(`${process.env.MONGO_URI}/dashboard`)
    console.log(mongoose.connection.host);
}