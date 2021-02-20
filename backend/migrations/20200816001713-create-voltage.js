'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Voltages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lowCellVoltage: {
        type: Sequelize.FLOAT
      },
      highCellVoltage: {
        type: Sequelize.FLOAT
      },
      avgCellVoltage: {
        type: Sequelize.FLOAT
      },
      packSumVoltage: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Voltages');
  }
};