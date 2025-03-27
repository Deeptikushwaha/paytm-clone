const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

const authmware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "Authorization header missing or invalid"
        });
    }

    const token = authHeader.split(' ')[1];
    console.log("Extracted token:", token);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded token:", decoded);
        console.log("Decoded userId type:", typeof decoded.userId);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        return res.status(403).json({
            message: "Invalid token"
        });
    }
};

module.exports = {
    authmware
}