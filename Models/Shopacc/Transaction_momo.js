const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const TransactionMomo = sequelize.define('TRANSACTION_MOMO', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_account: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phone_account: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING(255),
    allowNull: true,
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
  tableName: 'TRANSACTION_MOMO', // Specify the table name explicitly
});

module.exports = TransactionMomo;
