const Router = require('express');
const router = new Router();
const userRouter = require('./user.router');
const notebookRouter = require('./notebook.router');
const noteRouter = require('./note.router')

router.use('/users', userRouter);
router.use('/notebooks', notebookRouter);
router.use('/notes', noteRouter);

module.exports = router;

