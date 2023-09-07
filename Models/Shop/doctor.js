const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Đảm bảo đường dẫn đúng đến kết nối Sequelize của bạn
const Employee = require('../Account/Employee'); // Import mô hình Employee nếu chưa có

const Doctor = sequelize.define('Doctor', {
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
  tableName: 'doctor',
  timestamps: false, // Tắt tự động tạo các cột createdAt và updatedAt
});

// Thiết lập quan hệ với mô hình Employee
Doctor.belongsTo(Employee, {
  foreignKey: 'employee_id',
  onDelete: 'CASCADE',
});

module.exports = Doctor;
