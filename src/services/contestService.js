const Contest = require('../models/contestModel'); // Ensure the path is correct
const contestParticipantModel = require('../models/contestParticipantModel'); // Ensure the path is correct
const paragraphsModel = require("../models/paragraphModel");

const addContest = async (userData) => {
    try {
        const  contest = await Contest.create(userData);
        return contest;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getContest = async () => {
    try {
        const  contest = await Contest.find(); // Fetch all users from the database
        if (contest.length === 0) {
            return null;
        }
        return contest;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const addContestParticipant = async (userData) => {
    try {
        const  contestParticipant = await contestParticipantModel.create(userData);
        return contestParticipant;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const getContestParticipant = async (contestUser) => {
    try {
        const contestParticipants = await contestParticipantModel.find(contestUser).populate([{
            path:   'contest_id', // temporarily rename to 'contest_data' to avoid confusion
            model:  'contest',
            select: 'name description',
            alias:  'contest_data'
        },
        {
            path:   'user_id',
            model:  'users',
            select: 'user_name user_email gender',
            alias:  'user_data'
        }]).select('user_id contest_id refundable status joined_at');

        if (contestParticipants.length === 0) {
            return null;
        }

        return contestParticipants;
    } catch (err) {
        console.log(err);
        return null;
    }
};

const addParagraph = async (paragraphOject) => {

    console.log('Attempting to add paragraphs.');

    try {
        const addedParagraphs = await paragraphsModel.create(paragraphOject);
        console.log('Added paragraphs successfully.');
        return addedParagraphs;
    } catch (err) {
        console.log(err);
        console.log('Failed to add paragraphs.');
        return null;
    }
}

const getParagraphs = async (contest_id) => {

    // contest_id = toString(contest_id);
    console.log('Attempting to get paragraphs.', contest_id);
    try {
        const paragraphs = await paragraphsModel.find({contest_id: contest_id});
        return paragraphs;
    } catch (err) {
        console.log(err);
        return null;
    }
}


module.exports = {
    addContest,
    getContest,
    addContestParticipant,
    getContestParticipant,
    addParagraph,
    getParagraphs,
};
