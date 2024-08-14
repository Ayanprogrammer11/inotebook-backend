const mongoose = require('mongoose');

const mongoURI = process.env.databaseurl;
mongoose.set('strictQuery', false);
const connectToMongo = async () => {
    // console.log("Function running")
    try {
        console.log("Inside try");
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully");
    } catch(err) {
        // console.log("Inside catch")
        console.log("Failed to Connect");
        console.error(err);
    }
}

module.exports = connectToMongo;
