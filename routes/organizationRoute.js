const express = require('express');
const router = express.Router();
const OrganizationController = require('../controllers/organizationController');

router.get('/add', OrganizationController.showAddForm);
router.post('/add', OrganizationController.addOrganization);

router.get('/', OrganizationController.getAllOrganizations);
router.get('/:id', OrganizationController.getOrganizationById);
router.get('/edit/:id', OrganizationController.showEditForm);
router.post('/edit/:id', OrganizationController.updateOrganization);
router.post('/delete/:id', OrganizationController.deleteOrganization);


module.exports = router;
