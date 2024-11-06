const https = require('https');

class EmailService {
    constructor() {
        this.options = {
            method: 'POST',
            hostname: 'mail-sender-api1.p.rapidapi.com',
            headers: {
                'x-rapidapi-key': 'ddf3e227d5msh1f9db5c54444b08p1671d2jsn5ba19bdda68e',
                'x-rapidapi-host': 'mail-sender-api1.p.rapidapi.com',
                'Content-Type': 'application/json'
            }
        };
    }

    async sendEmail(recipient, subject, message) {
        const postData = JSON.stringify({
            sendto: recipient,
            name: 'Zoom Invitation Link',
            replyTo: 'sulaimankhanvt@gmail.com',
            ishtml: 'false',
            title: subject,
            body: message
        });

        return new Promise((resolve, reject) => {
            const req = https.request(this.options, (res) => {
                let chunks = [];

                res.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                res.on('end', () => {
                    const responseBody = Buffer.concat(chunks).toString();
                    console.log('Response from mail API:', responseBody);
                    resolve(responseBody);
                });
            });

            req.on('error', (error) => {
                console.error('Error sending email:', error);
                reject(error);
            });

            req.write(postData);
            req.end();
        });
    }
}

module.exports = EmailService;
