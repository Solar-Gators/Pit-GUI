'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GPS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  GPS.init({
    heading: DataTypes.INTEGER,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    speed: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'GPS',
  });
  return GPS;
};