const express = require('express');
const router = express.Router();
const HiepsiController = require('../../Controllers/Product/hiepsi');

router.post('/create',HiepsiController.create);
router.get('/getall',HiepsiController.getAll);
router.post('/delete/:id', HiepsiController.delete)

module.exports = router;