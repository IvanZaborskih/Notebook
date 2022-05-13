const { User, Note, Notebook } = require('../models/index');

class UserController {
	async postUser(req, res) {
		try {
			const { name, email, password } = req.body;
			const user = await User.create({ name, email, password });

			return res.status(200).json(user);
		} catch (err) {
			console.log(err);
			return res.status(400).json({ message: err.message });
		}
	}

	async getAllUsers(req, res) {
		try {
			const users = await User.findAll();

			return res.status(200).send(users);
		} catch (err) {
			console.log(err);
			return res.status(500).send(err);
		}
	}

	async getOneUser(req, res) {
		try {
			const id = req.params.id;

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
			return res.status(200).send(user);
		} catch (err) {
			console.log(err);
			return res.status(500).send(err);
		}
	}

	async updateUser(req, res) {
		try {
			const id = req.params.id;
			const { name, email, password } = req.body;

			const user = await User.update(
				{ name, email, password },
				{ where: { id } }
			);

			const updateUser = await User.findOne({ where: { id } });

			return res.status(200).send(updateUser);
		} catch (err) {
			console.log(err);
			return res.status(500).send(err);
		}
	}

	async deleteUser(req, res) {
		try {
			const id = req.params.id;

			const user = await User.findOne({ where: { id } });
			await user.destroy();

			return res.status(200).json({ message: 'User deleted' });
		} catch (err) {
			console.log(err);
			return res.status(500).send(err);
		}
	}
}

module.exports = new UserController();