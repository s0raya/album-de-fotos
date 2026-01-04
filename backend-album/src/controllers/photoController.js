const path = require('path');
const { uploadFile, getTransformedURL, deleteFromCloudinary } = require('../middleware/uploadFile.js')
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
            if(!files) {
                return res.redirect('/');
            }
            
            await Promise.all(files.map( async (file) => {
                try {
                    // Usar originalname para mostrar el nombre original sin timestamp
                    const filename = file.originalname;
                    //Obtengo los metadatos de la foto
                    const metadata = await exifr.parse(file.path);
                    const { DateTimeOriginal, latitude, longitude} = metadata;

                    // Función para mapear weathercode de Open-Meteo (WMO) a description e icon
                    // Los iconos se mapean a códigos de OpenWeatherMap para compatibilidad
                    const mapWeatherCode = (code) => {
                        // Códigos WMO de Open-Meteo mapeados a OpenWeatherMap icon codes
                        const weatherMap = {
                            0: { description: 'Clear sky', icon: '01d' }, // clear sky day
                            1: { description: 'Mainly clear', icon: '02d' }, // few clouds
                            2: { description: 'Partly cloudy', icon: '02d' }, // scattered clouds
                            3: { description: 'Overcast', icon: '04d' }, // broken clouds / overcast
                            45: { description: 'Fog', icon: '50d' }, // fog
                            48: { description: 'Depositing rime fog', icon: '50d' }, // fog
                            51: { description: 'Light drizzle', icon: '09d' }, // shower rain
                            53: { description: 'Moderate drizzle', icon: '09d' },
                            55: { description: 'Dense drizzle', icon: '09d' },
                            56: { description: 'Light freezing drizzle', icon: '13d' }, // snow
                            57: { description: 'Dense freezing drizzle', icon: '13d' },
                            61: { description: 'Slight rain', icon: '10d' }, // rain
                            63: { description: 'Moderate rain', icon: '10d' },
                            65: { description: 'Heavy rain', icon: '10d' },
                            66: { description: 'Light freezing rain', icon: '13d' },
                            67: { description: 'Heavy freezing rain', icon: '13d' },
                            71: { description: 'Slight snow fall', icon: '13d' }, // snow
                            73: { description: 'Moderate snow fall', icon: '13d' },
                            75: { description: 'Heavy snow fall', icon: '13d' },
                            77: { description: 'Snow grains', icon: '13d' },
                            80: { description: 'Slight rain showers', icon: '09d' },
                            81: { description: 'Moderate rain showers', icon: '09d' },
                            82: { description: 'Violent rain showers', icon: '09d' },
                            85: { description: 'Slight snow showers', icon: '13d' },
                            86: { description: 'Heavy snow showers', icon: '13d' },
                            95: { description: 'Thunderstorm', icon: '11d' }, // thunderstorm
                            96: { description: 'Thunderstorm with slight hail', icon: '11d' },
                            99: { description: 'Thunderstorm with heavy hail', icon: '11d' }
                        };
                        
                        return weatherMap[code] || { description: 'Unknown', icon: '01d' };
                    };

                    const fetchWeather = async(latitude, longitude, photoDate) => {
                        try {
                            // Formatear la fecha para Open-Meteo (YYYY-MM-DD)
                            const dateStr = moment(photoDate).format('YYYY-MM-DD');
                            // Obtener la hora de la foto
                            const photoHour = moment(photoDate).hour();
                            
                            // Open-Meteo Archive API - completamente gratuita, sin API key
                            const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${dateStr}&end_date=${dateStr}&hourly=temperature_2m,weathercode&timezone=auto`;
                            
                            const weatherRes = await fetch(apiUrl);
                            
                            // Verificar si la respuesta fue exitosa
                            if (!weatherRes.ok) {
                                console.warn(`Open-Meteo API retornó status ${weatherRes.status}. Continuando sin datos del clima.`);
                                return { description: 'N/A', icon: '', temp: null};
                            }
                            
                            const data = await weatherRes.json();
                            
                            // Verificar que la respuesta tenga la estructura esperada
                            if (!data || !data.hourly || !data.hourly.time || !data.hourly.temperature_2m || !data.hourly.weathercode) {
                                console.warn('Open-Meteo: estructura de datos inválida. Continuando sin datos del clima.');
                                return { description: 'N/A', icon: '', temp: null};
                            }
                            
                            // Buscar el índice correspondiente a la hora de la foto
                            const times = data.hourly.time;
                            const temperatures = data.hourly.temperature_2m;
                            const weathercodes = data.hourly.weathercode;
                            
                            // Encontrar el índice más cercano a la hora de la foto
                            let closestIndex = 0;
                            let minTimeDiff = Infinity;
                            
                            times.forEach((timeStr, index) => {
                                const timeHour = moment(timeStr).hour();
                                const timeDiff = Math.abs(timeHour - photoHour);
                                if (timeDiff < minTimeDiff) {
                                    minTimeDiff = timeDiff;
                                    closestIndex = index;
                                }
                            });
                            
                            // Obtener los datos del índice más cercano
                            const temp = temperatures[closestIndex];
                            const weathercode = weathercodes[closestIndex];
                            
                            // Mapear el weathercode a description e icon
                            const { description, icon } = mapWeatherCode(weathercode);
                            
                            return { 
                                description: description || 'N/A', 
                                icon: icon || 'c01', 
                                temp: temp != null ? Math.round(temp * 10) / 10 : null // Redondear a 1 decimal
                            };
                        } catch (error) {
                            console.error('Error with Open-Meteo API:', error);
                            // Retornar valores por defecto en caso de error
                            return { description: 'N/A', icon: '', temp: null};
                        }
                    }
                    const { description, icon, temp } = await fetchWeather(latitude, longitude, DateTimeOriginal);


                    //Convierto la foto en buffer para subirla a cloudinary (solo la original)
                    let fileOriginal = await sharp(file.path).toBuffer()
                    const { downloadURL: originalDownloadURL } = await uploadFile(fileOriginal, file)
                    fileOriginal = null;

                    //Genero la URL de la cover usando transformaciones de Cloudinary
                    //Cloudinary generará la versión comprimida bajo demanda
                    const compressedDownloadURL = getTransformedURL(originalDownloadURL, {
                        height: 200,
                        fit: 'contain',
                        quality: 'auto:low'
                    });

                    //Elimino el archivo de la carpeta local
                    await fs.unlink(file.path);

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
                } catch (fileError) {
                    console.error('Error procesando archivo:', fileError);
                    // Intentar eliminar el archivo local incluso si hay error
                    try {
                        await fs.unlink(file.path);
                    } catch (unlinkError) {
                        console.error('Error eliminando archivo local:', unlinkError);
                    }
                    throw fileError; // Re-lanzar el error para que Promise.all lo capture
                }
            }))
            res.redirect(reqPath)
        } catch (error) {
            console.error('Error en addPhoto:', error);
            if (!res.headersSent) {
                res.status(500).send('Error with photos');
            }
        }
    },

    async updatePhoto(req,res) {
        try {
            const id = req.params._id;
            const { name, date, temp } = req.body;
            const updatePhoto = await Photo.findByIdAndUpdate(id, {name, date, 'weather.temp': temp }, {new: true});
            res.send({message: 'photo edited correctly'})
        } catch (error) {
            res.status(500).send({message: 'Error updating photo'});
        }
    },

    async deletePhoto(req,res) {
        try {
            const id = req.params._id
            const photo = await Photo.findById(id)
            
            if (!photo) {
              return res.status(404).send({message: "Photo not found"})
            }
            
            // Eliminar de Cloudinary antes de eliminar de MongoDB
            // Eliminar la imagen original
            if (photo.path) {
                await deleteFromCloudinary(photo.path);
            }
            
            // Nota: No necesitamos eliminar cover_path porque es una transformación de la original
            // Cloudinary elimina automáticamente todas las transformaciones cuando se elimina la original
            
            // Eliminar de MongoDB
            const deletedPhoto = await Photo.findByIdAndDelete(id)
            
            res.json({message: "Photo deleted successfully", deletedPhoto})
          } catch (error) {
            console.error('Error deleting photo:', error);
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

