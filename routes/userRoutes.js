const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.get('/user/:userId',userController. getUserById);
router.put('/user/:userId',userController. updateUser);
router.post('/login', userController.loginUser);

module.exports = router;
