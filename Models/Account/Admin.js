const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Thay thế bằng cách kết nối Sequelize thực tế của bạn

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
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
  tableName: 'admin',
  timestamps: false, // Tắt tự động tạo các cột createdAt và updatedAt
});

module.exports = Admin;
