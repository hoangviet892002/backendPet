const express = require('express');
const router = express.Router();
const LienminhController = require('../../Controllers/Product/lienminh');

router.post('/create',LienminhController.create);
router.get('/getall',LienminhController.getAll);
router.get('/getallBySeller/:id',LienminhController.getAllBySeller);
router.post('/delete/:id', LienminhController.delete);
router.get('/account-info/:id',LienminhController.getAccountInfo);
router.post('/update', LienminhController.updateLienminh);
module.exports = router;