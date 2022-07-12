const Router = require('express');
const router = new Router();
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const notebookRouter = require('./notebook.router');
const noteRouter = require('./note.router')

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/notebooks', notebookRouter);
router.use('/notes', noteRouter);

module.exports = router;

