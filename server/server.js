const express = require("express");
const cors = require("cors");

const path = require('path');

const body_parser = require("body-parser");
const connectionDB = require("./database/connection_db.js");
const databaseModel = require("./database/model.js");

const app = express();
const PORT = 5000;

app.use(body_parser.json({ limit: "25mb", extended: true }));
app.use(body_parser.urlencoded({limit: "25mb", extended: true}));

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.get('/Home', async (request, response) => {
    try{
        response.send(await databaseModel.moviesList.find());
    }catch(err){
        console.log(err);
    }
    response.end();
});

app.get('/Movie', async (request, response) => {
    try{
        const MovieKey = request.query.movieKey;
        response.send(await databaseModel.moviesDetail.find({ "Key": MovieKey }));
    }catch(err){
        console.log(err);
    }
    response.end();
});

app.get('/getSubtitles', (request, response) => {
    try{
        const subtitlePath = path.join(__dirname, request.query.subtitleName);
        //console.log("Getting request for subtitle " + subtitlePath);

        response.status(200).sendFile(subtitlePath);
    }catch(Err)
    {
        console.log("\nErrors while responsing subtitles : " + Err);
        response.status(404).end();
    }
});

app.listen(PORT, () => {
    connectionDB.connectNetflixDatabase();
    console.log("Server started at port", PORT);
});
