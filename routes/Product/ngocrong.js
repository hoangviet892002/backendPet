const express = require('express');
const router = express.Router();
const NgocrongController = require('../../Controllers/Product/ngocrong');

router.post('/create',NgocrongController.create);

module.exports = router;