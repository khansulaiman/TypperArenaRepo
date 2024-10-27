
const express = require('express');
const router = express.Router();
const childrenController = require('../controllers/childrenController');

router.post('/set_leaderboard', childrenController.setLeaderboards);
router.post('/set_test_result', childrenController.setTestResult);
router.post('/set_test_type', childrenController.setTestType);


router.post('/add_module', childrenController.addModule);
router.post('/add_permission', childrenController.addPermission);
router.post('/assign_permission', childrenController.assignPermission);
router.get('/user_permission/user_id/:user_id', childrenController.getUserPermission);

module.exports = router;
