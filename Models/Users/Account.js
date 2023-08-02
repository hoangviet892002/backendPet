const { DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Import kết nối cơ sở dữ liệu Sequelize của bạn

const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  role: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  balance: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'ACCOUNT', // Thay bằng tên bảng của bạn nếu không phải là 'ACCOUNT'
});

module.exports = Account;
