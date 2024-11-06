const verifyToken = require("../services/jwtTokenService");
const authMiddleware = (req, res, next) => {

    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            STATUS: "ERROR",
            ERROR_DESCRIPTION: "No access token, authorization denied",
        });
    }

    // Verify token (simplified)
    try {

        console.log({token});
        const response = verifyToken.verifyToken(token);
        if (!response) {
            return res.status(401).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "Access denied for this token",
            });
        }
        const decoded = verifyToken.decodeToken(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (currentTime > decoded.exp) {
            return res.status(401).json({
                STATUS: "ERROR",
                ERROR_DESCRIPTION: "Access token expired",
            })
        }

        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
