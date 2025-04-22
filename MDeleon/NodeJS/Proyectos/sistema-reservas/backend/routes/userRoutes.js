const express = require('express');
const { register, login, getAllUsers } = require('../controllers/userController');
const { auth, isAdmin } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', auth, isAdmin, getAllUsers);

module.exports = router;
