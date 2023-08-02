const express = require('express');
const router = express.Router();
const AccountController = require('../../Controllers/Users/Account');

router.get('/users', AccountController.getAllUsers);
router.post('/changeUserRole', AccountController.changeUserRole);
router.post('/addMoney', AccountController.addMoney);

module.exports = router;
