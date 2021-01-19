'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Instance.init({
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Instance',
  });
  return Instance;
};