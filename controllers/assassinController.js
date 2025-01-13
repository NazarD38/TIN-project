const Assassin = require('../models/assassinModel');
const Skill = require('../models/skillModel');
const Weapon = require('../models/weaponModel');

exports.getAllAssassins = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;

        const { assassins, total } = await Assassin.getPaginated(page, limit);
        const totalPages = Math.ceil(total / limit);

        res.render('assassins/list', {
            assassins,
            page,
            totalPages,
            user: req.user
        });
    } catch (error) {
        console.error('Error fetching assassins:', error.message);
        res.status(500).send('Failed to fetch assassins.');
    }
};


exports.getAssassinWeapons = async (req, res) => {
    try {
        const assassinId = req.params.id;


        const assassin = await Assassin.getById(assassinId);

        if (!assassin) {
            return res.status(404).send('Assassin not found.');
        }

        const weapons = await Weapon.getByAssassinId(assassinId);

        res.render("weapons/assassinWeapons", { assassin, weapons });
    } catch (error) {
        console.error("Error fetching assassin weapons:", error.message);
        res.status(500).send("Failed to fetch assassin weapons.");
    }
};

exports.getAssassinSkills = async (req, res) => {
    try {
        const assassinId = req.params.id;


        const assassin = await Assassin.getById(assassinId);

        if (!assassin) {
            return res.status(404).send('Assassin not found.');
        }


        const skills = await Skill.getSkillsByAssassinId(assassinId);

        // Отправляем данные в шаблон
        res.render('skills/assassinSkills', { assassin, skills });
    } catch (error) {
        console.error('Error fetching assassin skills:', error.message);
        res.status(500).send('Failed to fetch assassin skills.');
    }
};

exports.getAssassinById = async (req, res) => {
    try {
        const assassinId = req.params.id;
        const assassin = await Assassin.getById(req.params.id);
        const skills = await Skill.getSkillsByAssassinId(assassinId);
        if (!assassin) {
            return res.status(404).send('Assassin not found.');
        }
        res.render('assassins/detail', {assassin, skills});
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch assassin.');
    }
};


exports.showAddForm = async (req, res) => {
    try {

        res.render('assassins/add', {
            errors: [],
            name: '',
            specialization: '',
            description: '',
            price: ''
        });
    } catch (error) {
        console.error('Error displaying add form:', error.message);
        res.status(500).send('Failed to load form.');
    }
};


exports.addAssassin = async (req, res) => {
    const {name, specialization, description, price} = req.body;
    const photo = req.file;

    const errors = [];


    if (!name) {
        errors.push('Please enter a name.');
    }


    if (!specialization || !/^[A-Za-z\s]+$/.test(specialization)) {
        errors.push('Specialization must contain only letters.');
    }


    if (!description || description.length < 10) {
        errors.push('Description must be at least 10 characters long.');
    }


    if (!price || isNaN(price) || parseInt(price) < 100) {
        errors.push('Price must be at least 100.');
    }


    if (!photo) {
        errors.push('Please upload a photo.');
    }

    if (errors.length > 0) {
        console.log('Validation errors:', errors);
        return res.status(400).render('assassins/add', {
            errors,
            name,
            specialization,
            description,
            price,
        });
    }

    try {
        const imageUrl = photo.filename;
        await Assassin.addAssassin({name, specialization, description, price, image_url: imageUrl});
        res.redirect('/assassins');
    } catch (error) {
        console.error('Error adding assassin:', error.message);
        res.status(500).send('Failed to add assassin.');
    }
};


exports.showEditForm = async (req, res) => {
    try {
        const assassin = await Assassin.getById(req.params.id);
        if (!assassin) {
            return res.status(404).send('Assassin not found.');
        }
        res.render('assassins/edit', {
            assassin,
            errors: [],
        });
    } catch (error) {
        console.error('Error fetching assassin for edit:', error.message);
        res.status(500).send('Failed to load edit form.');
    }
};


exports.updateAssassin = async (req, res) => {
    const { name, specialization, description, price, image_url } = req.body;
    const errors = [];


    if (!name || name.trim() === '') errors.push('Please enter a name.');
    if (!specialization || !/^[A-Za-z\s]+$/.test(specialization.trim())) {
        errors.push('Specialization must contain only letters.');
    }
    if (!description || description.trim().length < 10) {
        errors.push('Description must be at least 10 characters long.');
    }
    if (!price || isNaN(price) || price < 100) {
        errors.push('Price must be at least 100.');
    }


    const photo = req.file;
    let updatedImageUrl = image_url;
    if (photo) {
        updatedImageUrl = photo.filename;
    }


    if (errors.length > 0) {
        console.log('Validation errors:', errors);
        return res.status(400).render('assassins/edit', {
            assassin: {
                id: req.params.id,
                name: name || '',
                specialization: specialization || '',
                description: description || '',
                price: price || '',
                image_url: updatedImageUrl || '',
            },
            errors,
        });
    }

    try {

        await Assassin.updateAssassin(req.params.id, {
            name: name.trim(),
            specialization: specialization.trim(),
            description: description.trim(),
            price: parseFloat(price),
            image_url: updatedImageUrl,
        });
        res.redirect('/assassins');
    } catch (error) {
        console.error('Error updating assassin:', error.message);
        res.status(500).send('Failed to update assassin.');
    }
};



exports.deleteAssassin = async (req, res) => {
    try {
        await Assassin.deleteAssassin(req.params.id);
        res.redirect('/assassins');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to delete assassin.');
    }
};
