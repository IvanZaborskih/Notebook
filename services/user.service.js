const { User, Note, Notebook } = require('../models/index');

class UserService {
	async postUser(userBody) {
		const { name, email, password } = userBody;
		const user = await User.create({ name, email, password });

		if (!user) {
			return false;
		} else {
			return user;
		}
	}

	async getAllUsers() {
		const users = await User.findAll();

		if (!users) {
			return false;
		} else {
			return users;
		}
	}

	async getOneUser(userId) {
		const user = await User.findOne({
			where: { id: userId },
			include: [
				{
					model: Notebook,
					as: 'notebooks'
				},
				{
					model: Note,
					as: 'notes'
				}
			]
			// include: ['notes'] - only for one table
		});

		if (!user) {
			return false;
		} else {
			return user;
		}
	}

	async updateUser(userBody, userId) {
		const { name, email, password } = userBody;

		const user = await User.update(
			{ name, email, password },
			{ where: { id: userId } }
		);

		if (!user) {
			return false;
		} else {
			return await User.findByPk(userId);
		}
	}

	async deleteUser(userId) {
		const saveUserData = await User.findByPk(userId);
		const user = await User.destroy({ where: { id: userId } });

		if (!user) {
			return false;
		} else {
			return saveUserData;
		}
	}
}

module.exports = new UserService();