const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.showLoginForm);
router.get('/register', authController.showRegisterForm);
router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
router.get('/logout', authController.logoutUser);

module.exports = router;
