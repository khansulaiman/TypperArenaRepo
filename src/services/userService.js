const User = require('../models/userModel'); // Ensure the path is correct

const createUser = async (userData) => {
    const user = await User.create(userData);
    return user;
};

const getAllUsers = async () => {
    const users = await User.find(); // Fetch all users from the database
    return users;
};

module.exports = {
    getAllUsers,
    createUser,
};