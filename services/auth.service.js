const { User } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateAccessToken = (id, email) => {
	const payload = { id, email };
	return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
}

class AuthService {
	async registration(registrationBody) {
		const { name, email, password } = registrationBody;
		const candidate = await User.findOne({ where: { email: email } });

		if (candidate) {
			return 'exists';
		}
		const hashPassword = bcrypt.hashSync(password, 7);

		const user = await User.create({ name, email, password: hashPassword });

		if (!user) {
			return false;
		} else {
			return user;
		}
	}

	async login(loginBody) {
		const { email, password } = loginBody;
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return 'user';
		}

		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return 'password';
		}

		const token = generateAccessToken(user.id, user.email);
		return token;
	}

	async getAllUsers() {
		const users = await User.findAll();

		if (!users) {
			return false;
		} else {
			return users;
		}
	}
}

module.exports = new AuthService();