const express = require('express');
const router = express.Router();
const LienminhController = require('../../Controllers/Product/lienminh');

router.post('/create',LienminhController.create);
router.get('/getall',LienminhController.getAll);
router.get('/getallBySeller/:id',LienminhController.getAllBySeller);
router.get('/getRelatedProducts/:id',LienminhController.getRelatedProducts);
router.get('/getOne/:id',LienminhController.getOne);
router.post('/delete/:id', LienminhController.delete);
router.get('/account-info/:id',LienminhController.getAccountInfo);
router.post('/update', LienminhController.updateLienminh);
router.post('/buy', LienminhController.buy);
module.exports = router;