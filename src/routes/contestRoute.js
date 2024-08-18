
const express = require('express');
const router  = express.Router();
const contestController = require('../controllers/contestController');

router.get('/', contestController.getContest);
router.post('/', contestController.addContest);
router.post('/contest_participant', contestController.addContestParticipant);

module.exports = router;
