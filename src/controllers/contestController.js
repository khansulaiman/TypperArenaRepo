const contest_services = require("../services/contestService");


const getContest = async (req, res) => {

    try {

        const constest = await contest_services.getContest();
        if(!constest){
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "Contest not found"
            });

        }

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: constest,
            DESCRIPTION: "Contest fetched successfully",
        });

    } catch (err) {

        return res.status(500).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "TECHNICAL ERROR",
            ERROR_LOCK: err.message
        });
    }

};

const addContest = async (req, res, next) => {


    const {name, description, is_paid, fee, start_date, end_date} = req.body;


    if (!name) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Contest name is required"
        })
    }

    if (!description) {

        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Contest description is required"
        })
    }

    if (!is_paid) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Contest payment status is required"
        })
    }

    if (!fee) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Contest fee is required"
        })
    }

    if (!start_date) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Contest start date is required"
        })
    }

    if (!end_date) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Contest end date is required"
        })
    }

   

    const start_date_unix = Math.floor(new Date(start_date).getTime()/1000);
    const end_date_unix   = Math.floor(new Date(end_date).getTime()/1000);

    const contest_object = {
        name,
        description,
        is_paid,
        fee: Number(fee),
        start_date: start_date_unix,
        end_date: end_date_unix
    };

    console.log({contest_object});

    try {

        const contest = await contest_services.addContest(contest_object);
        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: contest,
            DESCRIPTION: "Contest created successfully",
        });

    } catch (err) {

        return res.status(500).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "TECHNICAL ERROR",
            ERROR_LOCK: err.message
        });
    }
};

const addContestParticipant = async (req, res, next) => {


    const {contest_id, user_id, refundable, status} = req.body;


    if (!contest_id) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Please select contest from the list"
        })
    }

    if (!user_id) {

        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Please select user from the list"
        })
    }

    if (refundable != true && refundable != false) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Contest refundable payment status is required"
        })
    }

    if (status != 0 && status != 1) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Contest payment status is required"
        })
    }

    const contest_object = {contest_id,user_id,refundable,status};

    try {

        const contest = await contest_services.addContestParticipant(contest_object);
        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: contest,
            DESCRIPTION: "Contest Participant created successfully",
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
    addContest,
    getContest,
    addContestParticipant,
};
