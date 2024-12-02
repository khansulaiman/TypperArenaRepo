const contest_services = require("../services/contestService");
 const {paragraphSchema}= require("../validation/joiValidator");

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

const getContestParticipant = async (req, res, next) => {

    const { contest_id, user_id } = req.params;

    // Validate the contest_id
    if (!contest_id) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Contest ID is required"
        });
    }

    // Validate the user_id
    if (!user_id) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "User ID is required"
        });
    }

    try {

        const contest = await contest_services.getContestParticipant({contest_id, user_id});

        if(!contest) {

            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "Contest Participants not found"
            });
        }

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: contest,
            DESCRIPTION: "Contest fetched successfully",
        });

    } catch (err) {

        return res.status(500).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "TECHNICAL ERROR",
            ERROR_LOCK: err.message
        });
    }
}


const getContestParticipantAll = async (req, res, next) => {

    const { contest_id } = req.params;

    // Validate the contest_id
    if (!contest_id) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Contest ID is required"
        });
    }

    try {

        const contest = await contest_services.getContestParticipant({contest_id});

        if(!contest) {

            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "Contest Participants not found"
            });
        }

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: contest,
            DESCRIPTION: "Contest fetched successfully",
        });

    } catch (err) {

        return res.status(500).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "TECHNICAL ERROR",
            ERROR_LOCK: err.message
        });
    }
}


const addParagraph = async (req, res, next) => {

    const { contest_id = null, content, difficulty_level, typing_duration = 0 } = req.body;

    const { error, value } = paragraphSchema.validate({
        contest_id, content, difficulty_level, typing_duration
    });

    if (error) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: error.details[0].message
        });
    }

    try {

        const paragraph = await contest_services.addParagraph({
                contest_id,
                content,
                difficulty_level,
                typing_duration
        });

        if (!paragraph) {
            return res.status(500).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "paragraph not added"
            });
        }

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: paragraph,
            DESCRIPTION: "Paragraph created successfully",
        });

    } catch (err) {

        return res.status(500).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "TECHNICAL ERROR",
            ERROR_LOCK: err.message
        });
    }

};

const getParagraph = async (req, res, next) => {

    const { contest_id } = req.params;

    console.log({ contest_id });
    // Validate the contest_id
    if (!contest_id) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "Contest ID is required"
        });
    }

    try {

        const paragraph = await contest_services.getParagraphs(contest_id);

        if (!paragraph) {
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "Paragraph not found"

            });
        }        

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: paragraph,
            DESCRIPTION: "Paragraph fetched successfully",
        });

    } catch (err) {

        return res.status(500).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "TECHNICAL ERROR",
            ERROR_LOCK: err.message
        });
    }
}

const getSampleParagraph = async (req, res, next) => {

    const  typing_duration  = req.params.duration;
    console.log({ typing_duration });

    try {

        const paragraph = await contest_services.getSampleParagraph(typing_duration);

        if (!paragraph) {
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "Paragraph not found"

            });
        }        

        return res.status(200).json({
            STATUS: "SUCCESSFUL", 
            DB_DATA: paragraph,
            DESCRIPTION: "Paragraph fetched successfully",
        });

    } catch (err) {

        return res.status(500).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "TECHNICAL ERROR",
            ERROR_LOCK: err.message
        });
    }
}


const deleteParagraph = async (req, res, next) => {
    const { paragraph_id } = req.params;

    if (!paragraph_id) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "paragraph_id is required"
        });
    }

    try {

        const paragraph = await contest_services.deleteParagraph(paragraph_id);

        if (!paragraph) {
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "Paragraph not found"

            });
        }

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: paragraph,
            DESCRIPTION: "Paragraph deleted successfully",
        });

    } catch (err) {

        return res.status(500).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "TECHNICAL ERROR",
            ERROR_LOCK: err.message

        });
    }
}

const deleteContest = async (req, res, next) => {

    const { contest_id } = req.params;

    if (!contest_id) {  
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "contest_id is required"
        });
    }

    try {

        const contest = await contest_services.deleteContest(contest_id);

        if (!contest) {
            return res.status(404).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "Contest not found"

            });


        }

        return res.status(200).json({
            STATUS: "SUCCESSFUL",
            DB_DATA: contest,
            DESCRIPTION: "Contest deleted successfully",
        });

    } catch (err) {

        return res.status(500).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "TECHNICAL ERROR",
            ERROR_LOCK: err.message

        });
    }

}

module.exports = {
    addContest,
    getContest,
    addContestParticipant,
    getContestParticipant,
    addParagraph,
    getParagraph,
    getContestParticipantAll,
    deleteParagraph,
    deleteContest,
    getSampleParagraph
};
