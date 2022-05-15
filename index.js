require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, User, Note, Notebook } = require('./models/index');
const router = require('./routes/index');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api', router);

app.post('/notes', async (req, res) => {
	const { user_id, title, text, is_important, notebook_id } = req.body;

	try {
		const user = await User.findOne({ where: { id: user_id } });
		const notebook = await Notebook.findOne({ where: { id: notebook_id } });
		const note = await Note.create({ title, text, is_important, user_id: user.id, notebook_id: notebook.id });

		return res.json(note);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ message: err.message });
	}
});
app.get('/notes', async (req, res) => {
	try {
		const notes = await Note.findAll({ include: ['user'] });

		return res.json(notes);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ message: err.message });
	}
});

sequelize.authenticate()
	.then(() => {
		console.log('Database connected');
		app.listen(PORT, () => {
			console.log(`SERVER STARTED ON PORT ${PORT}`);
		});
	})
	.catch(error => console.log(error));

