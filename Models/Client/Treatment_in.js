const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Đảm bảo đường dẫn đúng đến kết nối Sequelize của bạn
const Treatment = require('./Treatment'); // Import mô hình Treatment nếu chưa có
const Appointment = require('./Appointment'); // Import mô hình Appointment nếu chưa có
const Employee = require('../Account/Employee'); // Import mô hình Employee nếu chưa có

const TreatmentIn = sequelize.define('TreatmentIn', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  detail: {
    type: DataTypes.TEXT,
  },
  treatment_id: {
    type: DataTypes.INTEGER,
  },
  appointment_id: {
    type: DataTypes.INTEGER,
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
  tableName: 'treatment_in',
  timestamps: false, // Tắt tự động tạo các cột createdAt và updatedAt
});

// Thiết lập quan hệ với mô hình Treatment
TreatmentIn.belongsTo(Treatment, {
  foreignKey: 'treatment_id',
  onDelete: 'CASCADE',
});

// Thiết lập quan hệ với mô hình Appointment
TreatmentIn.belongsTo(Appointment, {
  foreignKey: 'appointment_id',
  onDelete: 'CASCADE',
});

// Thiết lập quan hệ với mô hình Employee
TreatmentIn.belongsTo(Employee, {
  foreignKey: 'employee_id',
  onDelete: 'CASCADE',
});

module.exports = TreatmentIn;
