const Leaderboard = require('../models/leaderboardModel'); // Ensure the path is correct
const TestResult  = require('../models/testResultModel'); // Ensure the path is correct
const TestType    = require('../models/testTypeModel'); // Ensure the path is correct
// const Timetable = require('../models/timetableModel');

const setLeaderboard = async (userData) => {

    const leaderboard = await Leaderboard.create(userData);
    return leaderboard;
};

const setTestResult  = async (userData) => {

    const testResult = await TestResult.create(userData);
    return testResult;
};

const setTestType  = async (userData) => {
     
    const testType = await TestType.create(userData);
    return testType;
    
};

// const addTimetable = async (userData) => {
//     const timetable = await Timetable.create(userData);
//     return timetable;
// };

// const getTimetable = async () => {
//     try {
//         const timetable = await Timetable.find()
//             .populate('teacher_id', 'user_name user_email') // Populate teacher with specific fields
//             .populate('class_id', 'name description'); // Populate class with specific fields

//         return timetable;
//     } catch (error) {
//         console.error("Error fetching timetable:", error);
//         throw error;
//     }
// }
// const updataClass = async (id,userData) => {
//     const update_record = await Classes.findOneAndUpdate(
//         {_id:id},
//         userData,
//     )
//     return update_record;
// };


// const getClasses = async () => {
//     // const classes = await Classes.find(); // Fetch all users from the database
//     const classes = await Classes.aggregate([{$lookup: {from: "courses", localField: "course_id", foreignField: "_id", as: "course"}}]); // Fetch all users from the database
//     return classes;
// };

// const singleClass = async (id) => {
//     const classes = await Classes.findOne({_id:id}); // Fetch all users from the database
//     return classes;
// };

module.exports = {
    setLeaderboard,
    setTestResult,
    setTestType,
    // updataClass,
    // getClasses,
    // singleClass,
    // addTimetable,
    // getTimetable
};