const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Order = sequelize.define('ORDER', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_account: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_accgame: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role_accgame: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'ORDER', // Specify the table name explicitly
});

module.exports = Order;
