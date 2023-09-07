const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Đảm bảo đường dẫn đúng đến kết nối Sequelize của bạn

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  detail: {
    type: DataTypes.TEXT,
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
  tableName: 'service',
  timestamps: false, // Tắt tự động tạo các cột createdAt và updatedAt
});

module.exports = Service;
