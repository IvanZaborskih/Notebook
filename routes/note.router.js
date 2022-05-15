const Router = require('express');
const router = new Router();
const noteController = require('../controllers/note.controller');

router.post('/', noteController.postNote);
router.get('/', noteController.getAllNotes);
router.get('/:id', noteController.getOneNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;