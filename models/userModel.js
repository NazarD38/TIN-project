const db = require('../database');
const bcrypt = require('bcryptjs');

class User {

    static async getPaginatedUsers(page, limit) {
        const offset = (page - 1) * limit;
        const [rows] = await db.query(
            'SELECT id, username, role FROM users LIMIT ? OFFSET ?',
            [limit, offset]
        );
        const [total] = await db.query('SELECT COUNT(*) AS total FROM users');
        return { users: rows, total: total[0].total };
    }

    static async deleteUser(id) {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
    }

    static async createUser(username, password, role) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.query(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, hashedPassword, role]
        );
        return result.insertId;
    }

    static async getUserByUsername(username) {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }

    static async getUserById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async getAllUsers() {
        const [rows] = await db.query('SELECT id, username, role FROM users');
        return rows;
    }

    static async updateUserRole(id, role) {
        await db.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
    }
}

module.exports = User;
