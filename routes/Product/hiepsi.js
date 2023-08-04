const express = require('express');
const router = express.Router();
const HiepsiController = require('../../Controllers/Product/hiepsi');

router.post('/create',HiepsiController.create);
router.get('/getall',HiepsiController.getAll);
router.get('/getallBySeller/:id',HiepsiController.getAllBySeller);
router.post('/delete/:id', HiepsiController.delete);
router.get('/account-info/:id',HiepsiController.getAccountInfo);
router.post('/update', HiepsiController.updateHiepsi);

module.exports = router;