const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Đảm bảo đường dẫn đúng đến kết nối Sequelize của bạn
const Employee = require('../Account/Employee'); // Import mô hình Employee nếu chưa có

const Trainer = sequelize.define('Trainer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  experience: {
    type: DataTypes.INTEGER,
  },
  certificate: {
    type: DataTypes.STRING(255),
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
  tableName: 'trainer',
  timestamps: false, // Tắt tự động tạo các cột createdAt và updatedAt
});

// Thiết lập quan hệ với mô hình Employee
Trainer.belongsTo(Employee, {
  foreignKey: 'employee_id',
  onDelete: 'CASCADE',
});

module.exports = Trainer;
