const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const ImagesLMHT = sequelize.define('images_lmht', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_account: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dataImage: {
    type: DataTypes.STRING(300000),
    allowNull: false,
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
  tableName: 'images_lmht',
});

module.exports = ImagesLMHT;
