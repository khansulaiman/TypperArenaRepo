const File = require('../models/fileModel'); // Ensure the path is correct

const addFile = async (userData) => {
    const file = await File.create(userData);
    return file;
};

const getFiles = async () => {
    // const files = await File.find(); // Fetch all users from the database
    const  files = await File.aggregate([
        {
            $lookup: {
                from: 'users', // Collection to join (users)
                localField: 'uploaded_by', // Field from file collection
                foreignField: '_id', // Field from users collection
                as: 'uploader' // Output array field
            }
        },
        {
            $unwind: '$uploader' // Deconstruct the array to get an object
        },
        {
            $lookup: {
                from: 'courses', // Collection to join (courses)
                localField: 'related_course_id', // Field from file collection
                foreignField: '_id', // Field from courses collection
                as: 'course' // Output array field
            }
        },
        {
            $unwind: '$course' // Deconstruct the array to get an object
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                file_path: 1,
                uploaded_by: 1,
                user_name: '$uploader.user_name', // Include user_name from the joined users collection
                related_course_id: 1,
                course_name: '$course.name', // Include course name from the joined courses collection
                status: 1,
                entry_time: 1
            }
        }
    ]);
    
    return files;
};

module.exports = {
    addFile,
    getFiles,
};