const express = require('express');
const router = express.Router();
const LienminhController = require('../../Controllers/Product/lienminh');

router.post('/create',LienminhController.create);

module.exports = router;