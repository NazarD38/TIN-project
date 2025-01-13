const db=require('../database.js');

class Organization{

    static async getPaginated(page, limit) {
        const offset = (page - 1) * limit;
        const [rows] = await db.query(
            `SELECT * FROM organization LIMIT ? OFFSET ?`,
            [limit, offset]
        );
        const [total] = await db.query(`SELECT COUNT(*) AS total FROM organization`);
        return { organizations: rows, total: total[0].total };
    }


    static async getAll(){
        const [rows]=await db.query(
            `select * from organization`
        )
        return rows;
    }

    static async getById(id){
        const [rows]=await db.query(
            `select * from organization WHERE id=?`,[id]
        );
        return rows[0];
    }

    static async addOrganization({ name, headquarters, founded_year }) {
        const [result] = await db.query(
            `INSERT INTO organization (name, headquarters, founded_year) VALUES (?, ?, ?)`,
            [name, headquarters, founded_year]
        );
        return result.insertId;
    }

    static async updateOrganization(id, { name, headquarters, founded_year }) {
        await db.query(
            `UPDATE organization SET name = ?, headquarters = ?, founded_year = ? WHERE id = ?`,
            [name, headquarters, founded_year, id]
        );
    }


    static async deleteOrganization(id) {
        await db.query(
            `DELETE FROM organization WHERE id = ?`,
            [id]
        );
    }
}

module.exports = Organization;