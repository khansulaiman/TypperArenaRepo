const User = require('../models/userModel'); // Ensure the path is correct
const ArenaUser = require('../models/arenaUserModel'); // Ensure the path is correct

const createUser = async (userData) => {
    const user = await User.create(userData);
    return user;
};

const arenaUser = async (userData) => {

    try {

        console.log({userData})
        const checkUser = await ArenaUser.findOne({ user_email: userData.user_email });

        if (checkUser) {
            return {
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "User already exists"
            };
        }

        const user = await ArenaUser.create(userData);
        return {
            STATUS: "SUCCESSFUL",
            DESCRIPTION: "User created successfully",
            DB_DATA: user
        };

    } catch (error) {
        console.log(error);
        return {
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Technical error"
        };
    }

   
};

const getAllUsers = async () => {
    const users = await User.find(); // Fetch all users from the database
    return users;
};

module.exports = {
    getAllUsers,
    createUser,
    arenaUser
};