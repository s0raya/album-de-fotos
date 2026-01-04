const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController.js');
const uploadPhotos = require('../middleware/multer.js');

router.get('/', (req, res) => {
    res.redirect('/home')
})


router.post('/home/album/:_id', uploadPhotos.array('photos', 10), photoController.addPhoto)
router.post('/home', uploadPhotos.array('photos', 10), photoController.addPhoto)
router.get('/home/album/:_id', photoController.getAllPhotos)
router.get('/home', photoController.getAllPhotos)
router.put('/home/:_id',photoController.updatePhoto);
router.post('/createAlbum', photoController.createAlbum)
router.delete('/home/:_id',photoController.deletePhoto);
router.delete('/home/album/:_id',photoController.deleteAlbum);



module.exports = router;