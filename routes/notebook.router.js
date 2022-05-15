const Router = require('express');
const router = new Router();
const notebookController = require('../controllers/notebook.controller');

router.post('/', notebookController.postNotebook);
router.get('/', notebookController.getAllNotebooks);
router.get('/:id', notebookController.getOneNotebook);
router.put('/:id', notebookController.updateNotebook);
router.delete('/:id', notebookController.deleteNotebook);

module.exports = router;