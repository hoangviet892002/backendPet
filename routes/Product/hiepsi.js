const express = require('express');
const router = express.Router();
const HiepsiController = require('../../Controllers/Product/hiepsi');

router.post('/create',HiepsiController.create);

module.exports = router;