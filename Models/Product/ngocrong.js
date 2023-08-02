const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Ngocrong = sequelize.define('Ngocrong', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_account: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  sever: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  hanh_tinh: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  bong_tai: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  de_tu: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  suc_manh: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER, // Thêm trường status là kiểu số nguyên
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
  tableName: 'NRO',
});

module.exports = Ngocrong;
