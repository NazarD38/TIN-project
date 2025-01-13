const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.showUsers);
router.post('/update-role', userController.updateUserRole);
router.post('/delete/:id', userController.deleteUser);


module.exports = router;
