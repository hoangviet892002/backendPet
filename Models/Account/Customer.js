const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Thay thế bằng cách kết nối Sequelize thực tế của bạn

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),
  },
  address: {
    type: DataTypes.STRING(255),
  },
  account: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING(255),
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
  tableName: 'customer',
  timestamps: false, // Tắt tự động tạo các cột createdAt và updatedAt
});

module.exports = Customer;
