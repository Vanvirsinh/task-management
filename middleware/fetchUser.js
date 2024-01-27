const jwt = require('jsonwebtoken');
const User = require('../models/user');

const fetchUser = async (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({ success: false, message: 'You are not authenticated, please login or register!' })
        }
        const userId = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(userId.id);
        if(!user) {
            return res.status(404).json({success: false, message: 'User not found!'});
        }
        req.user = userId;
        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Oops, Some Internal Error Occurred!' });
    }
}

module.exports = { fetchUser }