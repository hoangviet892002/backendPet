const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Đảm bảo đường dẫn đúng đến kết nối Sequelize của bạn
const Slot = require('../Shop/Slot'); // Import mô hình Slot nếu chưa có
const Treatment = require('./Treatment'); // Import mô hình Treatment nếu chưa có
const Service = require('../Shop/Service'); // Import mô hình Service nếu chưa có

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  slot_id: {
    type: DataTypes.INTEGER,
  },
  treatment_id: {
    type: DataTypes.INTEGER,
  },
  service_id: {
    type: DataTypes.INTEGER,
  },
  note: {
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
  tableName: 'appointment',
  timestamps: false, // Tắt tự động tạo các cột createdAt và updatedAt
});

// Thiết lập quan hệ với mô hình Slot
Appointment.belongsTo(Slot, {
  foreignKey: 'slot_id',
  onDelete: 'CASCADE',
});

// Thiết lập quan hệ với mô hình Treatment
Appointment.belongsTo(Treatment, {
  foreignKey: 'treatment_id',
  onDelete: 'CASCADE',
});

// Thiết lập quan hệ với mô hình Service
Appointment.belongsTo(Service, {
  foreignKey: 'service_id',
  onDelete: 'CASCADE',
});

module.exports = Appointment;
