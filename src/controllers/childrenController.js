const children_services   = require("../services/childrenService");
const { setTestResultSchema,setTestTypeSchema, addPermissionSchema,addModuleSchema } = require("../validation/joiValidator");

const setLeaderboards = async (req, res, next) => {

    // console.log("REQUEST BODY", req);
   const {user_id, position} = req.body;
 
 
    if (!user_id) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "leaderboards user  is required"
        })
    }

    if (!position) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "leaderboards position is required"
        })
    }

 
     try {
 
            const leaderboard = await children_services.setLeaderboard({user_id, position});

            if(!leaderboard){
                return res.status(404).json({
                    STATUS: "ERROR",
                    ERROR_DESCRIPTION: "leaderboards is not created"
                });
            }

            console.log("leaderboard", leaderboard);

            return res.status(200).json({
                STATUS: "SUCCESSFUL",
                DB_DATA: leaderboard,
                DESCRIPTION: "leaderboards created successfully",
            });

 
     } catch (err) {
 
         return res.status(500).json({
             STATUS: "ERROR",
             ERROR_DESCRIPTION: "TECHNICAL ERROR",
             ERROR_LOCK: err.message
         });
     }
}

const setTestResult = async (req, res, next) => {

    const { error, value } = setTestResultSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: error.details[0].message
        });
    }

    try {
        const result = await children_services.setTestResult(value);

        if (!result) {
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "Test result not created"
            });
        }

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: result,
            DESCRIPTION: "Test result recorded successfully"
        });

    } catch (err) {
        return res.status(500).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "TECHNICAL ERROR",
            ERROR_LOCK: err.message
        });
    }
};

const setTestType = async (req, res, next) => {

    const { error, value } = setTestTypeSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: error.details[0].message
        });
    }

    try {
        const result = await children_services.setTestType(value);

        if (!result) {
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "Test result not created"
            });
        }

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: result,
            DESCRIPTION: "Test result recorded successfully"
        });

    } catch (err) {
        return res.status(500).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "TECHNICAL ERROR",
            ERROR_LOCK: err.message
        });
    }
};


const addModule = async (req, res, next) => {

    const { error, value } = addModuleSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: error.details[0].message,
            // ERROR_LOCK: error
        });
    }

    try {
        const result = await children_services.addModule(value);

        if (result.STATUS === "ERROR") {
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: result.ERROR_DESCRIPTION
            });
        }

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: result.DB_DATA,
            DESCRIPTION: result.DESCRIPTION
        });

    } catch (err) {
        return res.status(500).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "TECHNICAL ERROR",
            ERROR_LOCK: err.message
        });
    }
};

const addPermission = async (req, res, next) =>{

    const { error, value } = addPermissionSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: error.details[0].message
        });
    }

    try {
        const result = await children_services.addPermission(value);

        if (result.STATUS === "ERROR") {
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: result.ERROR_DESCRIPTION
            });
        }

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: result.DB_DATA,
            DESCRIPTION: result.DESCRIPTION
        });

    } catch (err) {
        return res.status(500).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "TECHNICAL ERROR",
            ERROR_LOCK: err.message
        });
    }

}




const assignPermission = async (req, res, next) =>{

    try {


        const userPermissionArray = req.body;

        //For validation//
        userPermissionArray.forEach(element => {
            
            if(!element.user_id){

                return res.status(400).json({
                    STATUs:"ERROR",
                    ERROR_DESCRIPTION:"User ID is missing!",
                })
            }

            if(!element.module_id){

                return res.status(400).json({
                    STATUs:"ERROR",
                    ERROR_DESCRIPTION:"Module ID is missing!",
                })
            }

            if(!element.permission_id){

                return res.status(400).json({
                    STATUs:"ERROR",
                    ERROR_DESCRIPTION:"Permission ID is missing!",
                })
            }

        });

        const result = await children_services.assignPermission(userPermissionArray);

        if (result.STATUS === "ERROR") {
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: result.ERROR_DESCRIPTION
            });
        }

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DESCRIPTION: result.DESCRIPTION
        });

    } catch (err) {
        return res.status(500).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "TECHNICAL ERROR",
            ERROR_LOCK: err.message
        });
    }

}


const getUserPermission = async(req, res, next) =>{

    const user_id = req.params.user_id;

    if(!user_id){

        return res.status(400).json({
            STATUS : "ERROR",
            ERROR_DESCRIPTION:"User ID is required!"
        })
    }

    try{


        const result = await children_services.getUserPermission(user_id);

        if (!result) {
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "Permission not created"
            });
        }

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: result,
            DESCRIPTION: "Permission found successfully!"
        });

    }
    catch(err){

        return res.status(500).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "TECHNICAL ERROR",
            ERROR_LOCK: err.stack
        });

    }


}

module.exports = {
    setLeaderboards,
    setTestResult,
    setTestType,
    addModule,
    addPermission,
    assignPermission,
    getUserPermission
};
