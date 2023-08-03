const express = require('express');
const router = express.Router();
const NgocrongController = require('../../Controllers/Product/ngocrong');

router.post('/create',NgocrongController.create);
router.get('/getall',NgocrongController.getAll);
router.post('/delete/:id', NgocrongController.delete)
module.exports = router;