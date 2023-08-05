const express = require('express');
const router = express.Router();
const TransactionController = require('../../Controllers/Shopacc/Transaction');
router.get('/get/:id_account',TransactionController.TransactionByIdAccount);


module.exports = router;