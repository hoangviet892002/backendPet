const express = require('express');
const router = express.Router();
const LienminhController = require('../../Controllers/Product/lienminh');

router.post('/create',LienminhController.create);
router.get('/getall',LienminhController.getAll);
router.post('/delete/:id', LienminhController.delete)
module.exports = router;