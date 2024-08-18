const Contest = require('../models/contestModel'); // Ensure the path is correct
const contestParticipantModel = require('../models/contestParticipantModel'); // Ensure the path is correct

const addContest = async (userData) => {
    const contest = await Contest.create(userData);
    return contest;
};

const getContest = async () => {
    const contest = await Contest.find(); // Fetch all users from the database
    return contest;
};

const addContestParticipant = async (userData) => {
    const contestParticipant = await contestParticipantModel.create(userData);
    return contestParticipant;
};

module.exports = {
    addContest,
    getContest,
    addContestParticipant
};