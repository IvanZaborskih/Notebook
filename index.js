require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models/index');
const router = require('./routes/index');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api', router);

sequelize.authenticate()
	.then(() => {
		console.log('Database connected');
		app.listen(PORT, () => {
			console.log(`SERVER STARTED ON PORT ${PORT}`);
		});
	})
	.catch(error => console.log(error));

