const express = require('express');
const router = express.Router();
const HiepsiController = require('../../Controllers/Product/hiepsi');

router.post('/create',HiepsiController.create);
router.get('/getall',HiepsiController.getAll);
router.get('/getallBySeller/:id',HiepsiController.getAllBySeller);
router.get('/getRelatedProducts/:id',HiepsiController.getRelatedProducts);
router.get('/getOne/:id',HiepsiController.getOne);
router.post('/delete/:id', HiepsiController.delete);
router.get('/account-info/:id',HiepsiController.getAccountInfo);
router.post('/update', HiepsiController.updateHiepsi);
router.post('/buy', HiepsiController.buy);

module.exports = router;