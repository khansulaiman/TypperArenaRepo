
const express = require('express');
const router = express.Router();
const contestController = require('../controllers/contestController');

router.get('/', contestController.getContest);
router.post('/', contestController.addContest);
router.post('/contest_participant', contestController.addContestParticipant);
router.get(
    '/contest_participant/contest_id/:contest_id/user_id/:user_id',
    contestController.getContestParticipant
);

router.post('/paragraph', contestController.addParagraph);
router.get('/paragraph/contest_id/:contest_id', contestController.getParagraph);

module.exports = router;
