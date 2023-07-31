const { DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Import kết nối cơ sở dữ liệu Sequelize của bạn

const Transaction_momo = sequelize.define('Transaction_momo', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  
  
}, {
  tableName: '',
});

module.exports = Transaction_momo;
