const Organization = require('../models/organizationModel');
const db = require("express");
const Assassin = require("../models/assassinModel");
const Weapon = require("../models/weaponModel");


exports.getAllOrganizations = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5;

        const { organizations, total } = await Organization.getPaginated(page, limit);
        const totalPages = Math.ceil(total / limit);

        res.render('organizations/list', {
            organizations,
            page,
            totalPages,
            user: req.user
        });
    } catch (error) {
        console.error('Error fetching all organizations:', error.message);
        res.status(500).send('Failed to fetch organizations.');
    }
};

exports.getOrganizationById = async (req, res) => {
    try {
        const organization = await Organization.getById(req.params.id);
        if (!organization) {
            return res.status(404).send('Assassin not found.');
        }
        res.render('organizations/detail', {organization});
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch assassins.');
    }
}

exports.showAddForm = (req, res) => {

    try {
        res.render('organizations/add', {
            errors: [],
            name: '',
            headquarters: '',
            founded_year: ''
        });
    } catch (error) {
        console.error("Error displaying add form:", error.message);
        res.status(500).send('Failed to load form.');
    }


};

exports.addOrganization = async (req, res) => {
    const {name, headquarters, founded_year} = req.body;
    const errors = [];

    if (!name) {
        errors.push('Please enter name');
    }

    if (!headquarters || !/^[A-Za-z\s]+$/.test(headquarters)) {
        errors.push('Please enter name of headquarter [HeadQuarter must contain only letters]');
    }

    if (!founded_year || !/^[0-9]+$/.test(founded_year) || parseInt(founded_year) < 1901) {
        errors.push("Please enter year bigger than 1600 [only numbers]");
    }

    if (errors.length > 0) {
        console.log('Validation Error', errors);

        return res.status(400).render('organizations/add', {
            errors,
            name,
            headquarters,
            founded_year
        });
    }

    try {
        await Organization.addOrganization({name, headquarters, founded_year});
        res.redirect("/organizations");
    } catch (error) {
        console.error("Error with adding organization", error.message);
        res.status(500).send('Failed to add organization');
    }


};

exports.showEditForm = async (req, res) => {
    try {
        const organization = await Organization.getById(req.params.id);

        if (!organization) {
            return res.status(404).send('Organization not found.');
        }

        res.render('organizations/edit', {
            organization,
            errors: [],
        });
    } catch (error) {
        console.error('Error fetching organization for edit:', error.message);
        res.status(500).send('Failed to fetch organization.');
    }
};

exports.updateOrganization = async (req, res) => {

    const {name, headquarters, founded_year} = req.body;
    const errors = [];

    if (!name || name.trim() === '') errors.push('Please enter a name.');
    if (!headquarters || !/^[A-Za-z\s]+$/.test(headquarters.trim())) {
        errors.push('Headquarter must contain only letters.');
    }
    if (!headquarters||headquarters.trim()==='') {
        errors.push('Please enter headquarter');
    }
    if (!founded_year || isNaN(founded_year) || founded_year < 1901) {
        errors.push('Founded year must be greater than 1900.');
    }

    if (errors.length > 0) {
        console.log('Validation errors:', errors);
        return res.status(400).render('organizations/edit', {
            organization: {
                id: req.params.id,
                name: name || '',
                headquarters: headquarters || '',
                founded_year: founded_year || '',
            },
            errors,
        });
    }

    try {
        await Organization.updateOrganization(req.params.id, {
            name: name.trim(),
            headquarters: headquarters.trim(),
            founded_year: founded_year.trim()
        });
        res.redirect('/organizations');
    } catch (error) {
        console.error('Error updating organizations:', error.message);
        res.status(500).send('Failed to update organization:.');
    }
};


exports.deleteOrganization = async (req, res) => {
    try {
        await Organization.deleteOrganization(req.params.id);
        res.redirect('/organizations');
    } catch (error) {
        console.error('Error deleting organizations:', error.message);
        res.status(500).send('Failed to delete organization:.');
    }
};
