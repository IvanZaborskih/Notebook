const authService = require('../services/auth.service');

class authController {
	async registration(req, res) {
		try {
			const user = await authService.registration(req.body);

			if (!user) {
				throw new Error;
			} if (user === 'exists') {
				return res.status(400).json({ message: 'User with email already exists' });
			} else {
				return res.status(200).json(user);
			}
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}

	async login(req, res) {
		try {

		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}

	async getUsers(req, res) {
		try {

		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
}

module.exports = new authController();