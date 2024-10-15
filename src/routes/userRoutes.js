
const express = require('express');
const router  = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddlewares");

router.post('/',      userController.createUser);
router.post('/login', userController.login);

// Logout Route
router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('http://localhost:3000/login.html');
    // return res.status(200).json({
    //     STATUS: "SUCCESSFUL",
    //     DESCRIPTION: "Logged out successfully",
    // });
});

module.exports = router;
