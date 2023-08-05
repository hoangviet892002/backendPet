const express = require('express');
const router = express.Router();
const NgocrongController = require('../../Controllers/Product/ngocrong');

router.post('/create',NgocrongController.create);
router.get('/getall',NgocrongController.getAll);
router.get('/getallBySeller/:id',NgocrongController.getAllBySeller);
router.get('/getRelatedProducts/:id',NgocrongController.getRelatedProducts);
router.get('/getOne/:id',NgocrongController.getOne);
router.post('/delete/:id', NgocrongController.delete);
router.get('/account-info/:id',NgocrongController.getAccountInfo);
router.post('/update', NgocrongController.updateNgocrong);
router.post('/buy', NgocrongController.buy);
module.exports = router;