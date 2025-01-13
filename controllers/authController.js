const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.showLoginForm = (req, res) => {
    res.render('auth/login', { error: null });
};



exports.showRegisterForm = (req, res) => {
    res.render('auth/register', { errors: [] });
};

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    const errors = [];

    if (!username || username.length < 3 || username.length > 20) {
        errors.push('Username must be between 3 and 20 characters.');
    }


    if (!password || password.length < 8) {
        errors.push('Password must be at least 8 characters long.');
    }


    try {
        const existingUser = await User.getUserByUsername(username);
        if (existingUser) {
            errors.push('Username is already taken.');
        }
    } catch (err) {
        console.error('Error checking username:', err.message);
        errors.push('Internal server error.');
    }

    if (errors.length > 0) {
        return res.status(400).render('auth/register', { errors });
    }

    try {
        await User.createUser(username, password, 'user');
        res.redirect('/login');
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).render('auth/register', { errors: ['Internal server error.'] });
    }
};


exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).render('auth/login', { error: 'All fields are required!' });
    }

    try {
        const user = await User.getUserByUsername(username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).render('auth/login', { error: 'Invalid credentials!' });
        }


        res.cookie('user_id', user.id, { httpOnly: true });
        res.redirect('/main');
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).render('auth/login', { error: 'Something went wrong!' });
    }
};


exports.logoutUser = (req, res) => {
    res.clearCookie('user_id');
    res.redirect('/login');
};
