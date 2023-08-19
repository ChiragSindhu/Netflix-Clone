const mongoose = require('mongoose');

const moviesListSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Key: Number,
    Name: String,
    Year: String,
    ThumbnailMedium: String,
    rating: String,
    MaxQuality: String,
    Type: String
});

const moviesDetailSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Key: Number,
    Name: String,
    Category: Array,
    Rating: String,
    Release: String,
    Synopsis: String,
    Time: String,
    Banner: String,
    ThumbnailMedium: String,
    TrailerUrl: String,
    MovieUrl: String

});

module.exports.moviesList = mongoose.model('movieList', moviesListSchema,"MoviesList");
module.exports.moviesDetail = mongoose.model('movieDetail', moviesDetailSchema,"MoviesDetail");