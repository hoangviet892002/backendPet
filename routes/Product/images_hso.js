const express = require('express');
const router = express.Router();
const ImagesHsoController = require('../../Controllers/Product/ImagesHso');

router.get('/getByAccGameId/:id',ImagesHsoController.getImagesByAccgameId);
router.get('/getOne/:id',ImagesHsoController.getImageByAccgameId);
router.post('/delete/:imageId',ImagesHsoController.deleteImageById);
router.post('/add',ImagesHsoController.addImage);


module.exports = router;