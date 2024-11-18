
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddlewares");

// These route use for join contest user.//
router.post('/', userController.createUser);
router.post('/login', userController.login);


// These route are use admin section //
router.post(
    '/arena/login',
    userController.arenaLogin
);
router.post(
    '/arena',
    // authMiddleware,
    userController.createArenaUser
);


router.get(
    '/arena',
    // authMiddleware,
    userController.getArenaUser
);

router.delete(
    '/arena/user_id/:id',
    // authMiddleware,
    userController.deleteArenaUser
);


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
