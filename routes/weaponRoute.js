const express = require('express');
const router = express.Router();
const WeaponController = require('../controllers/weaponController');

router.get('/add', WeaponController.showAddForm);
router.post('/add', WeaponController.addWeapon);

router.get('/', WeaponController.getAllWeapons);
router.get('/:id', WeaponController.getWeaponById);
router.get('/edit/:id', WeaponController.showEditForm);
router.post('/edit/:id', WeaponController.updateWeapon);
router.post('/delete/:id', WeaponController.deleteWeapon);


module.exports = router;
