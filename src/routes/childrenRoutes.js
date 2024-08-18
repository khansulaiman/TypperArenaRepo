
const express = require('express');
const router = express.Router();
const childrenController = require('../controllers/childrenController');

router.post('/set_leaderboard', childrenController.setLeaderboards);
router.post('/set_test_result', childrenController.setTestResult);
router.post('/set_test_type', childrenController.setTestType);

module.exports = router;
