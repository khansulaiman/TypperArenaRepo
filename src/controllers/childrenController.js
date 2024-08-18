const children_services   = require("../services/childrenService");
const { setTestResultSchema,setTestTypeSchema } = require("../validation/joiValidator");

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

module.exports = {
    setLeaderboards,
    setTestResult,
    setTestType
};
