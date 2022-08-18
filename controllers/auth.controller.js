const authService = require('../services/auth.service');
const { validationResult } = require('express-validator');

class AuthController {
	async registration(req, res) {
		try {
			const errorsValidation = validationResult(req);
			if (!errorsValidation.isEmpty()) {
				return res.status(400).json({ message: 'Validation error', errorsValidation });
			}

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
			const token = await authService.login(req.body);

			if (!token) {
				throw new Error;
			} else if (token === 'user') {
				return res.status(400).json({ message: 'User not found' });
			} else if (token === 'password') {
				return res.status(400).json({ message: 'Wrong password' });
			} else {
				return res.status(200).json(token);
			}
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}

	async check(req, res) {
		try {
			const token = await authService.check(req.body);

			return res.json({ token });
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}

	async getAllUsers(req, res) {
		try {
			const users = await authService.getAllUsers();

			if (!users) {
				throw new Error;
			} else {
				return res.status(200).json(users);
			}
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}
}

module.exports = new AuthController();