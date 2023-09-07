const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Đảm bảo đường dẫn đúng đến kết nối Sequelize của bạn
const Customer = require('../Account/Customer'); // Import mô hình Customer nếu chưa có

const Pet = sequelize.define('Pet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(50),
  },
  age: {
    type: DataTypes.INTEGER,
  },
  special: {
    type: DataTypes.TEXT,
  },
  avatar: {
    type: DataTypes.STRING(255),
  },
  customer_id: {
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
  tableName: 'pet',
  timestamps: false, // Tắt tự động tạo các cột createdAt và updatedAt
});

// Thiết lập quan hệ với mô hình Customer
Pet.belongsTo(Customer, {
  foreignKey: 'customer_id',
  onDelete: 'CASCADE',
});

module.exports = Pet;
