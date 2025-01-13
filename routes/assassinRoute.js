const express = require('express');
const router = express.Router();
const assassinsController = require('../controllers/assassinController.js');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../controllers/authMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/photo');
    },
    filename: (req, file, cb) => {
        const fileName = `${req.body.name}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    },
});
const upload = multer({ storage: storage });


router.get('/add', authMiddleware.checkAuth, authMiddleware.checkRole(['admin']), assassinsController.showAddForm);
router.post('/add', authMiddleware.checkAuth, authMiddleware.checkRole(['admin']), upload.single('assassinPhoto'), assassinsController.addAssassin);

router.get('/edit/:id', authMiddleware.checkAuth, authMiddleware.checkRole(['admin']), assassinsController.showEditForm);
router.post('/edit/:id', authMiddleware.checkAuth, authMiddleware.checkRole(['admin']), upload.single('assassinPhoto'), assassinsController.updateAssassin);

router.post('/delete/:id', authMiddleware.checkAuth, authMiddleware.checkRole(['admin']), assassinsController.deleteAssassin);

router.get('/:id/weapons', authMiddleware.checkAuth, assassinsController.getAssassinWeapons);
router.get('/:id/skills', authMiddleware.checkAuth, assassinsController.getAssassinSkills);

router.get('/:id', authMiddleware.checkAuth, authMiddleware.checkRole(['admin', 'user']), assassinsController.getAssassinById);
router.get('/', authMiddleware.checkAuth, authMiddleware.checkRole(['admin', 'user']), assassinsController.getAllAssassins);



module.exports = router;
