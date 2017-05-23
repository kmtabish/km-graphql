
// require mongoose node module
const mongoose = require('mongoose');

//connect to mongodb database
mongoose.connect('mongodb://127.0.0.1:27017/testgraphql');

//Attach listner to connect event
//Get the default connection
const db = mongoose.connection

mongoose.connection.once('connect', function(){
   console.log("Mogodb connected")
});

module.exports = db;
