const jwt = require("jsonwebtoken");
const UserModels = require("../models/userModel.js");

const extractToken = (req) => {
    return req.cookies?.token || req.headers?.authorization?.split(' ')[1];
  };

  module.exports.authUser = async (req, res, next) => {
    try {
        const token = extractToken(req);
        if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await UserModels.findById(decoded._id).select("-password -refreshToken");
        if (!user) return res.status(401).json({ message: 'Unauthorized: User not found' });
        req.user = user;
        next();
    } catch (err) {
        console.error('Auth User Error:', err.message);
        res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};

