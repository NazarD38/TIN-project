const db = require('../database.js');

class Weapon {

    static async getPaginated(page, limit) {
        const offset = (page - 1) * limit;
        const [rows] = await db.query(
            `SELECT * FROM weapon LIMIT ? OFFSET ?`,
            [limit, offset]
        );
        const [total] = await db.query(`SELECT COUNT(*) AS total FROM weapon`);
        return { weapons: rows, total: total[0].total };
    }


    static async getAll() {
        const [rows] = await db.query(
            `select *
             from weapon`
        );
        return rows;
    }


    static async getById(id) {
        const [rows] = await db.query(
            `SELECT weapon.*, assassin.name AS assassin_name
             FROM weapon
                      JOIN assassin ON weapon.assassin_id = assassin.id
             WHERE weapon.id = ?`,
            [id]
        );
        return rows[0];
    }



    static async getByAssassinId(assassinId) {
        const [rows] = await db.query(
            `select *
             from weapon
             where assassin_id = ?`, [assassinId]
        );
        return rows;
    }

    static async addWeaponToAssassin({ name, type, damage, description, assassinName }) {
        const [assassins] = await db.query('SELECT id FROM assassin WHERE name = ?', [assassinName]);
        const assassin = assassins[0];

        if (!assassin) {
            throw new Error(`Assassin with name "${assassinName}" not found`);
        }

        const [result] = await db.query(
            'INSERT INTO weapon (name, type, damage, description, assassin_id) VALUES (?, ?, ?, ?, ?)',
            [name, type, damage, description, assassin.id]
        );

        return result.insertId;
    }



    static async updateWeapon(id, { name, type, damage, description }) {
        await db.query(
            'UPDATE weapon SET name = ?, type = ?, damage = ?, description = ? WHERE id = ?',
            [name, type, damage, description, id]
        );
    }


    static async deleteWeapon(id) {
        await db.query('DELETE FROM weapon WHERE id = ?', [id]);
    }
}

module.exports = Weapon;