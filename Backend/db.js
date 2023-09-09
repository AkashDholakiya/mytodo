const mongoose = require('mongoose');
const  uri = "mongodb://127.0.0.1:27017/mytodo";

const MongoConnect = () => {
    mongoose.connect(uri);
    console.log("Connection Successful");
}  

module.exports = MongoConnect;