
const express = require('express');
const router  = express.Router();
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
    '/user_contest/user_id/:user_id',
    contestController.getUserContest
);

router.get(
    '/notification_data/user_id/:user_id',
    contestController.GetNotificationData
)

router.get(
    '/contest_participant/contest_id/:contest_id',
    contestController.getContestParticipantAll
);

router.post(
    '/paragraph',
    contestController.addParagraph
);

router.patch(
    '/paragraph/paragraph_id/:paragraph_id',
    contestController.updateParagraph
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
    '/leaderboard/contest_id/:contest_id',
    contestController.getLeaderboard
)

router.get(
    '/paragraph/sample/duration/:duration',
    contestController.getSampleParagraph
);

router.get(
    '/paragraph/sample/list',
    contestController.getSampleParagraphList
);

// getSampleParagraphList
module.exports = router;
