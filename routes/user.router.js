const Router = require('express');
const router = new Router();
const userController = require('../controllers/user.controller');

router.post('/', userController.postUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;