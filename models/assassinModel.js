const db = require('../database.js');

class Assassin {

    static async getPaginated(page, limit) {
        const offset = (page - 1) * limit;

        const [rows] = await db.query(
            `SELECT * FROM assassin LIMIT ? OFFSET ?`,
            [limit, offset]
        );


        const [total] = await db.query(`SELECT COUNT(*) AS total FROM assassin`);

        return {
            assassins: rows,
            total: total[0].total,
        };
    }

    static async getAll() {
        const [rows] = await db.query('SELECT * FROM assassin');
        return rows;
    }


    static async getById(id) {
        const [rows] = await db.query(
            `
                SELECT
                    a.*,
                    o.name AS organization_name,
                    o.headquarters AS organization_headquarters,
                    o.founded_year AS organization_founded_year,
                    w.name AS weapon_name,
                    w.type AS weapon_type,
                    w.damage AS weapon_damage,
                    w.description AS weapon_description
                FROM assassin a
                         LEFT JOIN organization o ON a.organization_id = o.id
                         LEFT JOIN weapon w ON a.id = w.assassin_id
                WHERE a.id = ?
            `,
            [id]
        );
        if (rows.length > 0) {
            const assassin = rows[0];
            assassin.weapons = rows.map(row => ({
                name: row.weapon_name,
                type: row.weapon_type,
                damage: row.weapon_damage,
                description: row.weapon_description
            }));
            return assassin;
        }
        return null;
    }

    static async addAssassin({name, specialization, description, price, image_url}) {
        const [result] = await db.query('' +
            'insert into assassin( name, specialization, description, price, image_url) values(?,?,?,?,?)',
            [name, specialization, description, price, image_url]);
        return result.insertId;
    }

    static async updateAssassin(id, {name, specialization, description, price, image_url}) {
        await db.query(
            'Update assassin set name=?,specialization=?,description=?,price=?,image_url=? where id=?'
            , [name, specialization, description, price, image_url, id]
        );
    }

    static async deleteAssassin(id) {
        await db.query('delete from assassin where id = ?', [id]);
    }



}

module.exports = Assassin;