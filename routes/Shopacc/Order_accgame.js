const express = require('express');
const router = express.Router();
const OrderController = require('../../Controllers/Shopacc/Order_accgame');
router.get('/getall/:id_account',OrderController.getAccGameByIdAccount);


module.exports = router;