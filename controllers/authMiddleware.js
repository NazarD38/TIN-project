const User = require('../models/userModel');

exports.checkAuth = async (req, res, next) => {
    try {
        const userId = req.cookies?.user_id;
        if (!userId) {
            return res.redirect('/login');
        }

        const user = await User.getUserById(userId);

        if (!user) {
            return res.redirect('/login');
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(500).send('Internal Server Error');
    }
};



exports.checkRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (roles.includes(userRole) || userRole === 'admin') {
            return next();
        }

        return res.status(403).send('Access denied.');
    };
};


