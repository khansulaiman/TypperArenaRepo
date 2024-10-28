const Leaderboard = require('../models/leaderboardModel'); // Ensure the path is correct
const TestResult  = require('../models/testResultModel'); // Ensure the path is correct
const TestType    = require('../models/testTypeModel'); // Ensure the path is correct
const Modules     = require('../models/modulesModel');
const PermissionModel     = require('../models/permissionModel');
const UserPermissionModel = require('../models/userPermissionModel');

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


const addModule = async (moduleData) =>{

   /*************  ✨ Codeium Command 🌟  *************/
    const existingModule = await Modules.findOne({name: moduleData.name});
    if(existingModule) return { STATUS: "ERROR", ERROR_DESCRIPTION: "Module already exists"}
    const moduleResponse = await Modules.create(moduleData);
    return { STATUS: "SUCCESSFUL", DESCRIPTION: "Module created successfully", DB_DATA: moduleResponse }

}


const addPermission = async (permissionData) =>{


    const existingPermission = await PermissionModel.findOne({name: permissionData.name});
    if(existingPermission) return { STATUS: "ERROR", ERROR_DESCRIPTION: "Permission already exists"}
    const permissionResponse = await PermissionModel.create(permissionData);
    return { STATUS: "SUCCESSFUL", DESCRIPTION: "Permission created successfully", DB_DATA: permissionResponse }

}

const assignPermission = async (updatePermission) => {

   try {

    const permissionResponse = await UserPermissionModel.bulkWrite(
        updatePermission.map(permission => ({
            updateOne: {
                filter: {
                    user_id: permission.user_id,
                    module_id: permission.module_id
                },
                update: {
                    $set: {
                        permission_id: permission.permission_id
                    }
                },
                upsert: true
            }
        }))
    );

   if(permissionResponse.modifiedCount > 0 || permissionResponse.upsertedCount > 0 || permissionResponse.insertedCount > 0)
    {
        return { STATUS: "SUCCESSFUL", DESCRIPTION: "Permission assigned successfully"}
    }
    return { STATUS: "ERROR", ERROR_DESCRIPTION: "Permission not assigned"}

   } catch (error) {
    console.error("Error fetching timetable:", error)
   }
}

const getUserPermission = async (userId) => {


    try {
        const permissionRespoonse = await UserPermissionModel.find({user_id:userId})
            .populate('user_id', '_id user_name user_email') // Populate teacher with specific fields
            .populate('module_id', '_id name description')// Populate class with specific fields
            .populate('permission_id', '_id name description'); // Populate class with specific fields
        return permissionRespoonse;
    } catch (error) {
        console.error("Error fetching timetable:", error)
    }
}

const getAllModules = async () => {

    try{

        const modules = await Modules.find();
        if(!modules) return { 
            STATUS: "ERROR", 
            ERROR_DESCRIPTION: "Modules not found"
        }
        return { 
            STATUS: "SUCCESSFUL", 
            DB_DATA: modules, 
            DESCRIPTION: "Modules found successfully!"
        }
    }
    catch(error){
        console.error("Error fetching modules:", error)
        return { STATUS: "ERROR", ERROR_DESCRIPTION: "Error fetching modules!"}
    }
    }


const getPermissions = async () => {
    try{

        const permissions = await PermissionModel.find();
        if(!permissions) return { 
            STATUS: "ERROR", 
            ERROR_DESCRIPTION: "Permissions not found"
        }
        return { 
            STATUS: "SUCCESSFUL", 
            DB_DATA: permissions, 
            DESCRIPTION: "Permissions found successfully!"
        }
    }
    catch(error){
        
        console.error("Error fetching permissions:", error)
        return { STATUS: "ERROR", ERROR_DESCRIPTION: "Error fetching permissions!"}
    }
    }

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
    addModule,
    addPermission,
    assignPermission,
    getUserPermission,
    getAllModules,
    getPermissions
    // updataClass,
    // getClasses,
    // singleClass,
    // addTimetable,
    // getTimetable
};