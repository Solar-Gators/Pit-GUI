'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voltage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Voltage.init({
    lowCellVoltage: DataTypes.INTEGER,
    highCellVoltage: DataTypes.INTEGER,
    avgCellVoltage: DataTypes.INTEGER,
    packSumVoltage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Voltage',
  });
  return Voltage;
};