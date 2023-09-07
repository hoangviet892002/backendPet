const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Đảm bảo đường dẫn đúng đến kết nối Sequelize của bạn
const Customer = require('../Account/Customer'); // Import mô hình Customer nếu chưa có

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
  customer_id: {
    type: DataTypes.INTEGER,
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
  tableName: 'transaction',
  timestamps: false, // Tắt tự động tạo các cột createdAt và updatedAt
});

// Thiết lập quan hệ với mô hình Customer
Transaction.belongsTo(Customer, {
  foreignKey: 'customer_id',
  onDelete: 'CASCADE',
});

module.exports = Transaction;
