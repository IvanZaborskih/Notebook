const Router = require('express');
const router = new Router();
const authController = require('../controllers/auth.controller');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/registration', [
	check('password', 'Password must have more 4 symbols').isLength({ min: 4 })
], authController.registration);
router.post('/login', authController.login);
router.get('/auth', authMiddleware, authController.check);
router.get('/users', authMiddleware, authController.getAllUsers);

module.exports = router;