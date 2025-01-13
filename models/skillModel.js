const db=require('../database.js');


class Skill {

    static async getPaginated(page, limit) {
        const offset = (page - 1) * limit;
        const [rows] = await db.query(
            `SELECT * FROM skill LIMIT ? OFFSET ?`,
            [limit, offset]
        );
        const [total] = await db.query(`SELECT COUNT(*) AS total FROM skill`);
        return { skills: rows, total: total[0].total };
    }

    static async getAll() {
        const [rows] = await db.query(
            `select *
             from skill`
        );
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query(
            `
                select *
                from skill
                where id = ?`, [id]
        );
        return rows[0];
    }

    static async addSkill({name, description}) {
        const [result] = await db.query(
            `insert into skill(name, description)
             values (?, ?)`, [name, description]
        );
        return result.insertId;
    }

    static async updateSkill(id, {name, description}) {
        await db.query(
            `
                update skill
                set name=?,
                    description=?
                where id = ?`, [name, description, id]
        );
    }

    static async deleteSkill(id) {
        await db.query(
            `delete
             from skill
             where id = ?`, [id]
        );
    }

    static async assignToAssassin(assassinId, skillId, notes = '') {
        const proficiencyLevel = Math.floor(Math.random() * 10) + 1;
        const acquiredDate = new Date();

        console.log(`Assigning: assassinId=${assassinId}, skillId=${skillId}, proficiencyLevel=${proficiencyLevel}, acquiredDate=${acquiredDate}, notes=${notes}`);

        try {
            await db.query(
                `INSERT INTO assassin_skill (assassin_id, skill_id, proficiency_level, acquired_date, notes)
                 VALUES (?, ?, ?, ?, ?)`,
                [assassinId, skillId, proficiencyLevel, acquiredDate, notes]
            );
            console.log('Skill successfully assigned.');
        } catch (error) {
            console.error('Error in assignToAssassin:', error.message);
            throw error;
        }
    }


    static async getSkillsByAssassinId(assassinId) {
        const [rows] = await db.query(
            `SELECT skill.name,
                    skill.description,
                    assassin_skill.proficiency_level,
                    assassin_skill.acquired_date,
                    assassin_skill.notes
             FROM skill
                      JOIN assassin_skill ON skill.id = assassin_skill.skill_id
             WHERE assassin_skill.assassin_id = ?`,
            [assassinId]
        );
        return rows;

    }
}
module.exports = Skill;
