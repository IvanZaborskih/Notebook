'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING
      },
      is_important: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      notebook_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('notes');
  }
};