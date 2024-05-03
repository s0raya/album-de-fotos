const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeatherSchema = new mongoose.Schema({
    temp: Number,
    description: String,
    icon: String
})

const PhotoSchema = new mongoose.Schema(
    {
        name: String,
        path: String,
        cover_path: String,
        tags: [{type: String}],
        lat: Number,
        lng: Number,
        weather: WeatherSchema,
        date: Date,
        album: String
    },
    { timestamps: true}
);

const AlbumSchema = new mongoose.Schema({
    name: String,
    cover_path: String,
    parent: String,
}, { timestamps: true});

const Photo = mongoose.model('Photo', PhotoSchema);
const Weather = mongoose.model('Weather', PhotoSchema);
const Album = mongoose.model('Album', AlbumSchema);

module.exports = { Photo, Album, Weather };