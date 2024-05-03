const path = require('path');
const uploadFile = require('../middleware/uploadFile.js')
const {Photo, Album} = require('../models/Photo.js')

const sharp = require('sharp');
const moment = require('moment');
const fs = require('node:fs').promises
const exifr = require('exifr')
require('dotenv').config();


const photoController = {
    async getAllPhotos(req,res) {
        try {
            const albumId = req.params._id;
            let photos;
            let album;
            if (albumId) {
                photos = await Photo.find({album: albumId});
                album = await Album.find({parent: albumId});
            } else {
                photos = await Photo.find({album: ''});
                album = await Album.find({parent: ''});
            }
            res.json({photos, album})
        } catch (error) {
            res.status(500).send({ message: "Error getting photos", error });
        }
    },

    async createAlbum(req,res) {
        try {
            const nameAlbum = req.body.name;
            const albumId = req.body.parent;
            if (!nameAlbum) {
                res.status(400).send({ message: "Name is required" });
                return;
            }
            const newAlbum = await Album.create({
                name: nameAlbum,
                cover_path: '',
                parent: albumId ? albumId : ''
            })
            res.status(200).send({ message: 'Album created' })
        } catch (error) {
            res.status(500).send({ message: "Error create album"})
        }
    },

    async addPhoto(req,res) {
        try {
            const albumId = req.params._id;
            const reqPath = req.path;
            const files = req.files; 
            if(!files) res.redirect('/home')
            await Promise.all(files.map( async (file) => {
                const { filename } = file
                //Obtengo los metadatos de la foto
                const metadata = await exifr.parse(file.path);
                const { DateTimeOriginal, latitude, longitude} = metadata;
                const start_date = moment(DateTimeOriginal).format('YYYY-MM-DD:HH')
                const end_date = moment(DateTimeOriginal).add(1, 'days').format('YYYY-MM-DD:HH')

                const fetchWeather = async(latitude, longitude, start_date, end_date) => {
                    const key = process.env.WT_APIKEY;
                    try {
                        const res = await fetch(`${process.env.WT_URL}?lat=${latitude}&lon=${longitude}&start_date=${start_date}&end_date=${end_date}&key=${key}`)
                        const data = await res.json();
                        const { description, icon } = data.data[0].weather;
                        const { temp } = data.data[0];
                        return { description, icon, temp};
                    } catch (error) {
                        res.status(500).send({ message: "Error with API Weather"})
                    }
                }
                const { description, icon, temp } = await fetchWeather(latitude, longitude, start_date, end_date);


                //Convierto la foto en buffer para subirla a firebase
                let fileOriginal = await sharp(file.path).toBuffer()
                const { downloadURL: originalDownloadURL } = await uploadFile(fileOriginal, file)
                fileOriginal = null;


                //Comprimo la foto para la cover que se sube a firebase
                let fileCompressed = await sharp(file.path)
                .resize({height: 200, fit: 'contain'})
                .toBuffer()
                const { downloadURL: compressedDownloadURL } = await uploadFile(fileCompressed, file, true)
                fileCompressed = null;

                //Elimino el archivo de la carpeta local
                fs.unlink(file.path);

                //Creo la foto en la base de datos
                const newPhoto = await Photo.create({
                    name: filename,
                    path: originalDownloadURL,
                    cover_path: compressedDownloadURL,
                    tags: [],
                    lat: latitude,
                    lng: longitude,
                    weather: {
                        temp,
                        description,
                        icon
                    },
                    date: DateTimeOriginal,
                    album: albumId ? albumId : ''
                })

            }))
            res.redirect(reqPath)
        } catch (error) {
            res.status(500).send('Error with photos');
        }
    },

    async updatePhoto(req,res) {

    },

    async deletePhoto(req,res) {
        try {
            const id = req.params._id
            const deletedPhoto = await Photo.findByIdAndDelete(id)
            if (!deletedPhoto) {
              return res.status(404).send({message: "Photo not found"})
            }  
            res.json({message: "Photo deleted successfully", deletedPhoto})
          } catch (error) {
            res.status(500).send({ message: "Error deleting photo"})
          }
    },

    async deleteAlbum(req,res) {
        try {
            const id = req.params._id;
            const deletedAlbum = await Album.findByIdAndDelete(id);
            if (!deletedAlbum) {
                return res.status(404).send({message: "Photo not found"})
            }
            res.json({message: "Album deleted successfully", deletedAlbum})
        } catch (error) {
            res.status(500).send({ message: "Error deleting photo"})
        }
    }
        
};

module.exports = photoController;

