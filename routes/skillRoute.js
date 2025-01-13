const express = require('express');
const router = express.Router();
const SkillController = require('../controllers/skillController');

router.get('/add', SkillController.showAddForm);
router.post('/add', SkillController.addSkill);

router.get('/', SkillController.getAllSkills);
router.get('/:id', SkillController.getById);
router.get('/edit/:id', SkillController.showEditForm);
router.post('/edit/:id', SkillController.updateSkill);
router.post('/delete/:id', SkillController.deleteSkill);


module.exports = router;
