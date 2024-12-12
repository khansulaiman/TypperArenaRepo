
const express = require('express');
const router = express.Router();
const contestController = require('../controllers/contestController');

router.get('/', 
    contestController.getContest
);

router.post(
    '/',
     contestController.addContest
    );

router.delete(
    '/contest_id/:contest_id', 
    contestController.deleteContest
);

router.post(
    '/contest_participant',
    contestController.addContestParticipant
);
router.get(
    '/contest_participant/contest_id/:contest_id/user_id/:user_id',
    contestController.getContestParticipant
);

router.get(
    '/contest_participant/contest_id/:contest_id',
    contestController.getContestParticipantAll
);

router.post(
    '/paragraph',
    contestController.addParagraph
);

router.delete(
    '/paragraph/paragraph_id/:paragraph_id',
    contestController.deleteParagraph
);

router.get(
    '/paragraph/contest_id/:contest_id',
    contestController.getParagraph
);

router.get(
    '/paragraph/sample/duration/:duration', 
    contestController.getSampleParagraph
);

module.exports = router;
