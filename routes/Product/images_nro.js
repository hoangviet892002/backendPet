const express = require('express');
const router = express.Router();
const ImagesNroController = require('../../Controllers/Product/ImagesNro');

router.get('/getByAccGameId/:id',ImagesNroController.getImagesByAccgameId);
router.get('/getOne/:id',ImagesNroController.getImageByAccgameId);
router.post('/delete/:imageId',ImagesNroController.deleteImageById);
router.post('/add',ImagesNroController.addImage);


module.exports = router;