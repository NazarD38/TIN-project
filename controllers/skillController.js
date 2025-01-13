const Skill = require('../models/skillModel.js');
const Assassin = require("../models/assassinModel");

exports.getAllSkills = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;

        const { skills, total } = await Skill.getPaginated(page, limit);
        const totalPages = Math.ceil(total / limit);

        res.render('skills/list', {
            skills,
            page,
            totalPages,
            user: req.user,
        });
    } catch (error) {
        console.error('Error fetching skills:', error.message);
        res.status(500).send('Failed to fetch skills.');
    }
};


exports.getById = async (req, res) => {
    try {
        const skill = await Skill.getById(req.params.id);
        if (!skill) {
            res.status(404).send('No skills found');
        }
        res.render('skills/detail', {skill});
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch skills.');
    }
};

exports.showAddForm = async (req, res) => {
    try {
        const assassins = await Assassin.getAll();
        res.render("skills/add", {
            errors: [],
            name: '',
            description: '',
            assassins,
            notes: '',
        });
    } catch (error) {
        console.error("Error displaying add form:", error.message);
        res.status(500).send('Failed to load form.');
    }
};

exports.addSkill = async (req, res) => {
    const { name, description, assassins = [], notes } = req.body;
    const errors = [];


    if (!name || !name.trim()) {
        errors.push('Please enter a name.');
    }


    if (!description || !/^[A-Za-z\s]+$/.test(description)) {
        errors.push('Please enter a description. [only letters]');
    }


    if (!Array.isArray(assassins) || assassins.length === 0) {
        errors.push('Please assign at least one assassin.');
    }


    if (!notes || notes.trim().length < 5) {
        errors.push('Notes must be at least 5 characters long.');
    }

    if (errors.length > 0) {
        console.log("Validation errors", errors);
        const allAssassins = await Assassin.getAll();
        return res.status(400).render('skills/add', {
            errors,
            name,
            description,
            assassins: allAssassins,
            notes,
        });
    }

    try {

        await Skill.addSkill({ name, description, notes });
        res.redirect('/skills');
    } catch (error) {
        console.error("Error with adding skill", error);
        res.status(500).send('Failed to add skill.');
    }
};




exports.showEditForm = async (req, res) => {
    try {
        const skill = await Skill.getById(req.params.id);

        if (!skill) {
            return res.status(404).send('Skill not found.');
        }

        res.render('skills/edit', {
            skill,
            errors: []
        });
    } catch (error) {
        console.error('Error fetching skill for edit:', error.message);
        res.status(500).send('Failed to fetch skills.');
    }
};


exports.updateSkill = async (req, res) => {
    const { name, description } = req.body;
    const errors = [];

    // Валидация имени
    if (!name || name.trim() === '') {
        errors.push('Please enter a name.');
    }

    // Валидация описания
    if (!description || !/^[A-Za-z\s]+$/.test(description.trim())) {
        errors.push('Description must contain only letters.');
    }

    if (description && description.trim().length < 10) {
        errors.push('Description must be at least 10 characters long.');
    }


    if (errors.length > 0) {
        console.log('Validation errors:', errors);

        const skill = await Skill.getById(req.params.id);
        return res.status(400).render('skills/edit', {
            skill: {
                id: req.params.id,
                name: name || skill?.name || '',
                description: description || skill?.description || ''
            },
            errors,
        });
    }

    try {

        await Skill.updateSkill(req.params.id, {
            name: name.trim(),
            description: description.trim(),
        });
        res.redirect('/skills');
    } catch (error) {
        console.error('Error updating skills:', error.message);
        res.status(500).send('Failed to update skill.');
    }
};

exports.deleteSkill = async (req, res) => {
    try {
        await Skill.deleteSkill(req.params.id);
        res.redirect('/skills');
    } catch (error) {
        console.error('Error deleting skills:', error.message);
        res.status(500).send('Failed to delete skills:.');
    }
};



