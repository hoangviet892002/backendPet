const { DataTypes } = require('sequelize');
const sequelize = require('../../database'); // Import kết nối cơ sở dữ liệu Sequelize của bạn

const Hiepsi = sequelize.define('Hiepsi', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  
  
}, {
  tableName: '',
});

module.exports = Hiepsi;
