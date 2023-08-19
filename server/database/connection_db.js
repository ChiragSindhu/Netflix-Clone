const mongoose = require("mongoose");
const CONNECTION_URL = "mongodb+srv://netflixCloneDB:freenetflixforall@netflixdatabase.erywipr.mongodb.net/NetflixDatabase?retryWrites=true&w=majority";

function connectNetflixDatabase(){
    mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true});
}

var conn = mongoose.connection;
conn.on('connected', function() {
    console.log('Database Connected.');
});

conn.on('disconnected', function () {
    console.log('Database disconnected.');
});

conn.on('error', console.error.bind(console, 'connection error:'));

module.exports = {conn, connectNetflixDatabase};