const { User } = require('../models/index');
const bcrypt = require('bcryptjs');

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
}

module.exports = new AuthService();