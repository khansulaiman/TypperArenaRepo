const fs = require('fs');
const path = require('path');

const handleFile = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "No file uploaded!"
        });
    }

    // Assuming req.file contains the file details
    const fileInfo = req.file;

    // Example: Save file to a specific directory
    const filePath = path.join(__dirname, '../../public/assets/upload_file', fileInfo.filename);

    // Move the uploaded file to the desired directory
    fs.rename(fileInfo.path, filePath, err => {
        if (err) {
            console.error('Error moving file:', err);
            return res.status(500).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "Failed to store the uploaded file."
            });
        }
        next();
    });
};

module.exports = handleFile;
