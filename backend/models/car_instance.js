'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car_Instance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Car_Instance.init({
    car_name: DataTypes.STRING,
    instance_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Car_Instance',
  });
  return Car_Instance;
};