const Weapon = require('../models/weaponModel');


exports.getAllWeapons = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;

        const { weapons, total } = await Weapon.getPaginated(page, limit);
        const totalPages = Math.ceil(total / limit);

        res.render('weapons/list', {
            weapons,
            page,
            totalPages,
            user: req.user
        });
    } catch (error) {
        console.error('Error fetching all weapons:', error.message);
        res.status(500).send('Failed to fetch weapons.');
    }
};


exports.getWeaponById = async (req, res) => {
    try {
        const weapon = await Weapon.getById(req.params.id);

        if (!weapon) {
            return res.status(404).send('Weapon not found.');
        }

        res.render('weapons/detail', { weapon });
    } catch (error) {
        console.error('Error fetching weapon by ID:', error.message);
        res.status(500).send('Failed to fetch weapon.');
    }
};

exports.showAddForm = (req, res) => {
    res.render('weapons/add', {
        errors: [],
        name: '',
        type: '',
        damage: '',
        description: '',
        assassinName: '',
    });
};


exports.addWeapon = async (req, res) => {
    const { name, type, damage, description, assassinName } = req.body;
    const errors = [];


    if (!name || name.trim() === '') {
        errors.push('Please enter a weapon name.');
    }


    if (!type || !/^[A-Za-z\s]+$/.test(type)) {
        errors.push('Type is required and must contain only letters.');
    }


    if (!damage || isNaN(damage) || damage <= 0) {
        errors.push('Damage must be a positive number.');
    }


    if (description && description.trim().length < 10) {
        errors.push('Description must be at least 10 characters long.');
    }

    if (!assassinName || assassinName.trim() === '') {
        errors.push('Please assign this weapon to an assassin.');
    }

    if (errors.length > 0) {
        console.log('Validation errors:', errors);
        return res.status(400).render('weapons/add', {
            errors,
            name,
            type,
            damage,
            description,
            assassinName,
        });
    }

    try {
        await Weapon.addWeaponToAssassin({ name, type, damage, description, assassinName });
        res.redirect('/weapons');
    } catch (error) {
        console.error('Error adding weapon:', error.message);
        res.status(500).send('Failed to add weapon.');
    }
};


exports.showEditForm = async (req, res) => {
    try {
        const weapon = await Weapon.getById(req.params.id);

        if (!weapon) {
            return res.status(404).send('Weapon not found.');
        }

        res.render('weapons/edit', {
            weapon,
            errors: [],
        });
    } catch (error) {
        console.error('Error fetching weapon for edit:', error.message);
        res.status(500).send('Failed to fetch weapon.');
    }
};


exports.updateWeapon = async (req, res) => {
    const { name, type, damage, description } = req.body;
    const errors = [];


    if (!name || name.trim() === '') {
        errors.push('Please enter a weapon name.');
    }


    if (!type || !/^[A-Za-z\s]+$/.test(type)) {
        errors.push('Type is required and must contain only letters.');
    }


    if (!damage || isNaN(damage) || damage <= 0) {
        errors.push('Damage must be a positive number.');
    }


    if (description && description.trim().length < 10) {
        errors.push('Description must be at least 10 characters long.');
    }

    if (errors.length > 0) {
        const weapon = await Weapon.getById(req.params.id);
        console.log('Validation errors:', errors);
        return res.status(400).render('weapons/edit', {
            weapon: {
                id: req.params.id,
                name,
                type,
                damage,
                description,
            },
            errors,
        });
    }

    try {
        await Weapon.updateWeapon(req.params.id, { name, type, damage, description });
        res.redirect('/weapons');
    } catch (error) {
        console.error('Error updating weapon:', error.message);
        res.status(500).send('Failed to update weapon.');
    }
};

exports.deleteWeapon = async (req, res) => {
    try {
        await Weapon.deleteWeapon(req.params.id);
        res.redirect('/weapons');
    } catch (error) {
        console.error('Error deleting weapon:', error.message);
        res.status(500).send('Failed to delete weapon.');
    }
};
