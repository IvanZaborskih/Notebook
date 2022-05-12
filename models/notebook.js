'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notebook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Note, User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
      this.hasMany(Note, { foreignKey: 'notebook_id', as: 'notes' });
    }
  }
  Notebook.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'notebooks',
    modelName: 'Notebook',
  });
  return Notebook;
};