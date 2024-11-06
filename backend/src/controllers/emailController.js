const emailService = require('../services/emailService');

const EemailService = new emailService();

const sendMeetingInvitation = async (req, res, next) => {

    console.log('Hi email middleware',req.meeting_data);
    // const { recipientEmail, meetingLink } = req.body;
    const recipientEmail = 'sulaimankhanvt@gmail.com';
    const {start_url, join_url} = req.meeting_data;

    console.log("start_url", start_url);
    console.log("join_url", join_url);
    console.log('Metting data', req.meeting_data);
    const subject = 'Invitation to Zoom Meeting';
    const message = `You are invited to join a Zoom meeting. Click on the following link to join: ${join_url}`;

    try {
        
        // console.log("req.session.user_enrollement_data", req.session?.user_enrollement_data);
        if(req.session?.user_enrollement_data){
            
            const user_data = req.session?.user_enrollement_data;
            user_data.forEach(element => {
                let user_name = element.user_id?.user_name;
                let user_email = element.user_id?.user_email;
                console.log({user_name, user_email});
                EemailService.sendEmail(user_email, subject, message);

            });
        }
        // await EemailService.sendEmail(recipientEmail, subject, message);
        // console.log("Meeting invitation sent successfully!");
        // console.log('message', message);
        res.redirect(start_url);
        // res.status(200).send('Meeting invitation sent successfully!');
    } catch (error) {
        console.error('Error sending meeting invitation:', error);
        res.status(500).send('Failed to send meeting invitation');
    }
};

module.exports = {
    sendMeetingInvitation
};
