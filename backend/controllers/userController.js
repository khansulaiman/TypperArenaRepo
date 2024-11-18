const User          = require('../models/userModel');
const ArenaUser     = require('../models/arenaUserModel');
const user_services = require("../services/userService");
const jwt_services  = require("../services/jwtTokenService");
const bcrypt        = require('bcrypt');

// const getAllUsers = async (req, res) => {

//     // try {
//     //     console.log(req.session.user.user_name);
//     //     const users = await User.find();
//     //     res.json(users);
//     // } catch (err) {
//     //     res.status(500).json({ message: err.message });
//     // }

// };

// const get_user_info = async (req, res) => {


//     // console.log(req.session?.user._id);
//     // const user_id = req.session?.user?._id;
//     // if(!user_id) {
//     //     return res.status(401).json({
//     //         STATUS: "ERROR",
//     //         ERROR_DESCRIPTION: "Unauthorized access"
//     //     });
//     // }

//     // try {
       


//     //     const user = await User.findOne({ _id: user_id })
//     //         .populate('user_qualification', 'name')
//     //         .populate({
//     //             path: 'enrollments',
//     //             populate: {
//     //                 path: 'course_id',
//     //                 model: 'course',
//     //                 select: 'name description course_fee trial_days'
//     //             }
//     //         });

//     //     if (!user) {
//     //         return res.status(404).json({
//     //             STATUS: "ERROR",
//     //             ERROR_DESCRIPTION: "User not found"
//     //         });
//     //     }

//     //     // res.json(user);

//     //     return res.status(200).json({
//     //         STATUS: "SUCCESSFUL",
//     //         DB_DATA: user,
//     //         DESCRIPTION: "User fetched successfully",
//     //     });

//     // } catch (err) {
//     //     res.status(500).json({ message: err.message });
//     // }

// };

// const get_enroll_user = async (req, res) => {


// //    const course_id = req.query.course_id;

// //    console.log({course_id});

//     // if(!course_id) {
//     //     return res.status(401).json({
//     //         STATUS: "ERROR",
//     //         ERROR_DESCRIPTION: "Course id is missing!"
//     //     });
//     // }

//     // try {
       


//     //     const user = await Enrollement.find({ course_id: course_id }).populate('user_id', 'user_name user_type user_qualification gender user_email country city postal_code ');

//     //     if (!user) {
//     //         return res.status(404).json({
//     //             STATUS: "ERROR",
//     //             ERROR_DESCRIPTION: "User not found"
//     //         });
//     //     }

//     //     // res.json(user);

//     //     return res.status(200).json({
//     //         STATUS: "SUCCESSFUL",
//     //         DB_DATA: user,
//     //         DESCRIPTION: "User fetched successfully",
//     //     });

//     // } catch (err) {
//     //     res.status(500).json({ message: err.message });
//     // }

// };


const createUser = async (req, res, next) => {

    const {user_name,user_email, password} = req.body;


    if (!user_name) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "User name is required"
        })
    }

    if (!user_email) {

        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "User email is required"
        })
    }

    if (!password) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Password is required"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user_object = {
        user_name,
        user_email,
        password: hashedPassword
    };

    try {

        const user = await user_services.createUser(user_object);

        if(!user) {
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "User not created"
            });
        }

        let jwt_token = jwt_services.generateToken({
            _id: user._id,
            user_name:  user.user_name,
            user_email: user.user_email,
            online_status:user.online_status,
            gender:user.gender,
            created_at: user.created_at,
            updated_at: user.updated_at
            });

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: {token: jwt_token,},
            DESCRIPTION: "User created successfully",
        });

    } catch (error) {

        if (error.code === 11000) { // MongoDB duplicate key error code
            // Extracting the field that caused the duplicate error
            const field = Object.keys(error.keyValue)[0];
            const value = error.keyValue[field];
    
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: `The ${field} '${value}' is already in use. Please use a different ${field}.`,
                // ERROR_LOCK: error.message, // Optional: include original error for debugging
            });
        } else {
            // For other types of errors, you can send a generic or specific error response
            return res.status(500).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "An unexpected error occurred. Please try again later.",
                // ERROR_LOCK: error.message, // Optional: include original error for debugging
            });
        }
    }
};



const getArenaUser = async (req, res) => {

    try {

        const user = await ArenaUser.find();

        if (!user) {
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "User not found"
            });
        }

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: user,
            DESCRIPTION: "User fetched successfully",
        });

    } catch (err) {
        
        return res.status(500).json({
            STATUS: "ERROR",
            DESCRIPTION: "Technical error occurred. Please try again later.",
        });

    }

};




const deleteArenaUser = async (req, res) => {

    try {

        const user_id = req.params.id;

        const user = await ArenaUser.deleteOne({ _id: user_id });
        if (!user) {
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "User not deleted"
            });
        }

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: user,
            DESCRIPTION: "User deleted successfully",
        });

    } catch (err) {
        
        return res.status(500).json({
            STATUS: "ERROR",
            DESCRIPTION: "Technical error occurred. Please try again later.",
        });

    }

};
const createArenaUser = async (req, res, next) => {

    const {user_name,user_email, password, gender} = req.body;

    if (!user_name) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "User name is required"
        })
    }

    if (!user_email) {

        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "User email is required"
        })
    }

    if (!password) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Password is required"
        })
    }

    if(!gender) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Gender is required"
        })
    }


    // if( req.arena_user != true){

    //     return res.status(401).json({
    //         STATUS: "ERROR",
    //         ERROR_DESCRIPTION: "You are not authorized to perform this action"
    //     })
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user_object = {
        user_name,
        user_email,
        password: hashedPassword,
        gender
    };

    try {

        const response = await user_services.arenaUser(user_object);

        if(response.STATUS == "ERROR") {
            return res.status(400).json({
                STATUS: response.STATUS,
                ERROR_DESCRIPTION: response.ERROR_DESCRIPTION
            });
        }

        // let jwt_token = jwt_services.generateToken({
            // _id: response.DB_DATA._id,
            // user_name:  response.DB_DATA.user_name,
            // user_email: response.DB_DATA.user_email,
            // arena_user:true,
            // online_status:response.DB_DATA.online_status,
            // gender:response.DB_DATA.gender,
            // created_at: response.DB_DATA.created_at,
            // updated_at: response.DB_DATA.updated_at
            // });

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: response.DB_DATA,
            DESCRIPTION: "User created successfully",
        });

    } catch (error) {

        if (error.code === 11000) { // MongoDB duplicate key error code
            // Extracting the field that caused the duplicate error
            const field = Object.keys(error.keyValue)[0];
            const value = error.keyValue[field];
    
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: `The ${field} '${value}' is already in use. Please use a different ${field}.`,
                // ERROR_LOCK: error.message, // Optional: include original error for debugging
            });
        } else {
            // For other types of errors, you can send a generic or specific error response
            return res.status(500).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "An unexpected error occurred. Please try again later.",
                // ERROR_LOCK: error.message, // Optional: include original error for debugging
            });
        }
    }
};



const login = async (req, res, next) => {

    const { password, user_email } = req.body;

    try {

        const user = await User.findOne({ user_email });

        if (!user) {
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "User Not Found.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "Invalid credentials.",
            });
        }

        // Store user data in session
        let jwt_token = jwt_services.generateToken({
            _id: user._id,
            user_name:  user.user_name,
            user_email: user.user_email,
            online_status:user.online_status,
            gender:user.gender,
            created_at: user.created_at,
            updated_at: user.updated_at
            });

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: {token: jwt_token,},
            DESCRIPTION: "User login successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Technical Error"
        });
    }

}



const arenaLogin = async (req, res, next) => {

    const { password, user_email } = req.body;

    try {

        const user = await ArenaUser.findOne({ user_email });

        if (!user) {
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "User Not Found.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "Invalid credentials.",
            });
        }

        // Store user data in session
        let jwt_token = jwt_services.generateToken({
            _id: user._id,
            user_name:  user.user_name,
            user_email: user.user_email,
            arena_user:true,
            online_status:user.online_status,
            gender:user.gender,
            created_at: user.created_at,
            updated_at: user.updated_at
            });

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: {token: jwt_token,},
            DESCRIPTION: "User login successfully",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Technical Error"
        });
    }

}


module.exports = {
    createUser,
    createArenaUser,
    getArenaUser,
    arenaLogin,
    login,
    deleteArenaUser
};
