'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


// await queryInterface.createTable('users', {
//   id: {
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: Sequelize.INTEGER
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   created_at: {
//     allowNull: false,
//     type: Sequelize.DATE
//   },
//   updated_at: {
//     allowNull: false,
//     type: Sequelize.DATE
//   }
// });

// await queryInterface.createTable('notebooks', {
//   id: {
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: Sequelize.INTEGER
//   },
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   user_id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'users',
//       key: 'id'
//     }
//   },
//   created_at: {
//     allowNull: false,
//     type: Sequelize.DATE
//   },
//   updated_at: {
//     allowNull: false,
//     type: Sequelize.DATE
//   }
// });

// await queryInterface.createTable('notes', {
//   id: {
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: Sequelize.INTEGER
//   },
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   text: {
//     type: Sequelize.TEXT
//   },
//   is_important: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false
//   },
//   notebook_id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'notebooks',
//       key: 'id'
//     }
//   },
//   user_id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'users',
//       key: 'id'
//     }
//   },
//   created_at: {
//     allowNull: false,
//     type: Sequelize.DATE
//   },
//   updated_at: {
//     allowNull: false,
//     type: Sequelize.DATE
//   }
// });
// },