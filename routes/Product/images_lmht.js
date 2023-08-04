const express = require('express');
const router = express.Router();
const ImagesLMHTController = require('../../Controllers/Product/ImagesLMHT');

router.get('/getByAccGameId/:id',ImagesLMHTController.getImagesByAccgameId);
router.get('/getOne/:id',ImagesLMHTController.getImageByAccgameId);
router.post('/delete/:imageId',ImagesLMHTController.deleteImageById);
router.post('/add',ImagesLMHTController.addImage);


module.exports = router;