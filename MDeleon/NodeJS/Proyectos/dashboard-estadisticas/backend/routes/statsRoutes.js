const express = require('express');
const router = express.Router();
const { createStat, getStats } = require('../controllers/statsController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, createStat);
router.get('/', verifyToken, getStats);

module.exports = router;
