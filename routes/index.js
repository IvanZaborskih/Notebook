const Router = require('express');
const router = new Router();
const userRouter = require('./user.router');
const notebookRouter = require('./notebook.router');

router.use('/users', userRouter);
router.use('/notebooks', notebookRouter);

module.exports = router;

