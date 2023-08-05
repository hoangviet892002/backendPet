const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/authController');

// Đăng ký tài khoản
router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.post('/changepass', AuthController.changepass);

router.post('/sales-summary/:id', AuthController.DashBoard);

module.exports = router;
