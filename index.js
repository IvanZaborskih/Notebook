require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, User, Note, Notebook } = require('./models/index');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/users', async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const user = await User.create({ name, email, password });

		return res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: err.message });
	}
});
app.get('/users', async (req, res) => {
	try {
		const users = await User.findAll();

		return res.send(users);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
});
app.get('/users/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const user = await User.findOne({
			where: { id },
			include: [
				{
					model: Note,
					as: 'notes'
				},
				{
					model: Notebook,
					as: 'notebooks'
				}
			]
			// include: ['notes'] - only for one table
		});
		return res.send(user);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
});
app.put('/users/:id', async (req, res) => {
	const id = req.params.id;
	const { name, email, password } = req.body;
	try {
		const user = await User.update(
			{ name, email, password },
			{ where: { id } }
		);

		return res.send(user);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
});
app.delete('/users/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const user = await User.findOne({ where: { id } });

		await user.destroy();
		return res.json({ message: 'User deleted' });
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
});


app.post('/notebooks', async (req, res) => {
	const { user_id, title } = req.body;

	try {
		const user = await User.findOne({ where: { id: user_id } });
		const notebook = await Notebook.create({ title, user_id: user.id });

		return res.json(notebook);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ message: err.message });
	}
});
app.get('/notebooks', async (req, res) => {
	try {
		const notebooks = await Notebook.findAll({ include: ['user'] });

		return res.json(notebooks);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ message: err.message });
	}
});
app.get('/notebooks/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const notebook = await Notebook.findOne({
			where: { id },
			include: [
				{
					model: User,
					as: 'user'
				},
				{
					model: Note,
					as: 'notes'
				}
			]
		});

		return res.json(notebook);
	} catch (err) {
		console.log(err);
		return res.status(500).send({ message: err.message });
	}
});


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

