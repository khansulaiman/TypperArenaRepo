const mongoose = require('mongoose');
const Contest = require('../models/contestModel'); // Ensure the path is correct
const contestParticipantModel = require('../models/contestParticipantModel'); // Ensure the path is correct
const paragraphsModel = require("../models/paragraphModel");
const testResultModel = require("../models/testResultModel");

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


const getUserContest = async (user_id) => {
    try {
        const contestParticipants = await contestParticipantModel.find({ user_id })
            .populate([
                {
                    path: 'contest_id',
                    model: 'contest',
                },
                {
                    path: 'user_id',
                    model: 'users',
                    select: 'user_name user_email gender',
                }
            ])
            .select('user_id contest_id refundable status joined_at');

        return {
            contestParticipants,
            contestCount: contestParticipants.length
        };
    } catch (err) {
        console.error('Failed to get user contest:', err);
        return null;
    }
};


const GetNotificationData = async (user_id) => {
    try {
        // Validate user_id
        if (!user_id) {
            throw new Error('User ID is required');
        }

        // Get the current Unix timestamp
        const currentUnixTime = Math.floor(Date.now() / 1000);
        console.log('Current Unix Time:', currentUnixTime);

        // Aggregation pipeline
        const contestParticipants = await contestParticipantModel.aggregate([
            // Step 1: Match the user_id
            {
                $match: { user_id: mongoose.Types.ObjectId(user_id) }, // Ensure user_id is an ObjectId
            },
            // Step 2: Lookup contest details
            {
                $lookup: {
                    from: 'contest', // Ensure this matches your contest collection name
                    localField: 'contest_id',
                    foreignField: '_id',
                    as: 'contest',
                },
            },
            // Step 3: Unwind contest array to access its fields
            {
                $unwind: '$contest',
            },
            // Step 4: Filter contests where start_date >= currentUnixTime
            {
                $match: { 'contest.start_date': { $gte: currentUnixTime } },
            },
            // Step 5: Lookup user details
            {
                $lookup: {
                    from: 'users', // Ensure this matches your users collection name
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            // Step 6: Unwind user array to access its fields
            {
                $unwind: '$user',
            },
            // Step 7: Select only the required fields for the result
            {
                $project: {
                    _id: 1,
                    contest_id: '$contest._id',
                    'contest.name': 1,
                    'contest.start_date': 1,
                    'contest.description': 1,
                    'contest.is_paid': 1,
                    'contest.fee': 1,
                    refundable: 1,
                    status: 1,
                    joined_at: 1,
                    'user.user_name': 1,
                    'user.user_email': 1,
                    'user.gender': 1,
                },
            },
        ]);

        console.log('Filtered Contest Participants:', contestParticipants);

        // Return the result
        return {
            STATUS: "SUCCESSFUL",
            DB_DATA: {
                contestParticipants,
                contestCount: contestParticipants.length,
            },
            DESCRIPTION: contestParticipants.length
                ? "Notification fetched successfully"
                : "No upcoming contests found for the user",
        };
    } catch (err) {
        console.error('Failed to fetch contest data:', err.message);
        return {
            STATUS: "FAILED",
            DESCRIPTION: "An error occurred while fetching notifications",
            ERROR: err.message,
        };
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


const updateParagraph = async (paragraphObject) => {
    console.log('Attempting to update paragraphs.');

    try {
        const updatedParagraph = await paragraphsModel.findByIdAndUpdate(
            paragraphObject.paragraph_id,
            {
                $set: {
                    content: paragraphObject.content,
                    difficulty_level: paragraphObject.difficulty_level,
                    typing_duration: paragraphObject.typing_duration
                }
            },
            { new: true } // This option returns the modified document
        );

        if (updatedParagraph) {
            console.log('Updated paragraphs successfully.');
            return updatedParagraph; // Return the updated document
        } else {
            console.log('No paragraph found with that ID.');
            return null;
        }
    } catch (err) {
        console.log(err);
        console.log('Failed to update paragraphs.');
        return null;
    }
}

const getParagraphs = async (contest_id) => {

    // contest_id = toString(contest_id);
    console.log('Attempting to get paragraphs.', contest_id);
    try {
        const paragraphs = await paragraphsModel.find({contest_id: contest_id});
        if(paragraphs.length === 0)  return null;
        return paragraphs;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getSampleParagraph = async (typing_duration) => {

    try {
        const paragraphs = await paragraphsModel.find({contest_id: null, typing_duration: typing_duration});
        console.log({paragraphs});
        if(paragraphs.length === 0)  return null;
        return paragraphs;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const getSampleParagraphList = async () => {

    try {
        const paragraphs = await paragraphsModel.find({contest_id: null});
        console.log({paragraphs});
        if(paragraphs.length === 0)  return null;
        return paragraphs;
    } catch (err) {
        console.log(err);
        return null;
    }
}


const getLeaderboard = async (contest_id, limit = 10) => {
    console.log('Attempting to get leaderboard.', contest_id);

    try {
        const leaderboard = await testResultModel.find({ contest_id }) // Corrected variable name
            .sort({ wpm: -1, accuracy: -1 }) // Sort by WPM and then accuracy
            .limit(limit) // Limit results to top N
            .populate('user_id', 'user_name') // Populate user information (e.g., name)
            .populate('paragraph_id', 'content'); // Populate paragraph information (e.g., title)

        return leaderboard.map((entry, index) => ({
            position: index + 1,
            user: entry.user_id?.user_name || 'Unknown User',
            paragraph: entry.paragraph_id?.content || 'Unknown Paragraph',
            wpm: entry.wpm,
            accuracy: entry.accuracy,
            raw: entry.raw,
            characters: entry.characters,
            consistency: entry.consistency,
            time: entry.time,
            demography: entry.demography,
        }));
    } catch (err) {
        console.error('Failed to get leaderboard:', err); // Improved error logging
        return null;
    }
}




const deleteParagraph = async (paragraph_id) => {

    console.log('Attempting to delete paragraphs.', paragraph_id);
    try {
        const deletedParagraph = await paragraphsModel.findByIdAndDelete(paragraph_id);
        return deletedParagraph;
    } catch (err) {
        console.log(err);
        return null;
    }

}

const deleteContest = async (contest_id) => {

    console.log('Attempting to delete contest.', contest_id);

    try {
        const deletedContest = await Contest.findByIdAndDelete(contest_id);
        return deletedContest;
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
    deleteParagraph,
    deleteContest,
    getSampleParagraph,
    updateParagraph,
    getLeaderboard,
    getSampleParagraphList,
    getUserContest,
    GetNotificationData
};
