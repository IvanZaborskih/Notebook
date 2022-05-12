'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Note, Notebook }) {
      // define association here
      this.hasMany(Note, { foreignKey: 'user_id', as: 'notes' });
      this.hasMany(Notebook, { foreignKey: 'user_id', as: 'notebooks' });
    }

    toJSON() {
      return { ...this.get(), password: undefined };
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a name ' },
        notEmpty: { msg: 'Name must not be empty ' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: 'User must have a email ' },
        notEmpty: { msg: 'Email must not be empty ' },
        isEmail: { msg: 'Must be a valid email adress' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a password ' },
        notEmpty: { msg: 'Password must not be empty ' }
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};