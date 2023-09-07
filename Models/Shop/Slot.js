const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Đảm bảo đường dẫn đúng đến kết nối Sequelize của bạn
const Employee = require('../Account/Employee'); // Import mô hình Employee nếu chưa có

const Slot = sequelize.define('Slot', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
  time: {
    type: DataTypes.TIME,
  },
  employee_id: {
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
  tableName: 'slot',
  timestamps: false, // Tắt tự động tạo các cột createdAt và updatedAt
});

// Thiết lập quan hệ với mô hình Employee
Slot.belongsTo(Employee, {
  foreignKey: 'employee_id',
  onDelete: 'CASCADE',
});

module.exports = Slot;
