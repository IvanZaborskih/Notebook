const userService = require('../services/user.service');

class UserController {
	async getOneUser(req, res) {
		try {
			const user = await userService.getOneUser(req.user.id);

			if (!user) {
				throw new Error;
			} else {
				return res.status(200).json(user);
			}
		} catch (err) {
			return res.status(500).send(err);
		}
	}

	async updateUser(req, res) {
		try {
			const user = await userService.updateUser(req.body, req.user.id);

			if (!user) {
				throw new Error;
			} else {
				return res.status(200).json(user);
			}
		} catch (err) {
			return res.status(500).send(err);
		}
	}

	async deleteUser(req, res) {
		try {
			const user = userService.deleteUser(req.user.id);

			if (!user) {
				throw new Error;
			} else {
				return res.status(200).json({ message: 'User deleted' });
			}
		} catch (err) {
			return res.status(500).send(err);
		}
	}
}

module.exports = new UserController();