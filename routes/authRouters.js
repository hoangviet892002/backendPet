const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/authController');

// Đăng ký tài khoản
router.post('/register', AuthController.register);



module.exports = router;
