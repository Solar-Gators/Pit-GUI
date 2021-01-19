'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class telemetry_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  telemetry_data.init({
    instance_name: DataTypes.STRING,
    data: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'telemetry_data',
  });
  return telemetry_data;
};