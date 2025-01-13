const User = require('../models/userModel');

exports.showUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;

        const { users, total } = await User.getPaginatedUsers(page, limit);
        const totalPages = Math.ceil(total / limit);

        res.render('users/list', {
            users,
            page,
            totalPages,
        });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).send('Failed to fetch users.');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await User.deleteUser(userId);
        res.redirect('/users');
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).send('Failed to delete user.');
    }
};


exports.updateUserRole = async (req, res) => {
    const { id, role } = req.body;
    try {
        await User.updateUserRole(id, role);
        res.redirect('/users');
    } catch (error) {
        console.error('Error updating user role:', error.message);
        res.status(500).send('Failed to update user role.');
    }
};
