const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const ImagesHSO = sequelize.define('images_hso', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_accgame: {
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
  tableName: 'images_hso',
});

module.exports = ImagesHSO;
