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
      LowCellVoltage: {
        type: Sequelize.INTEGER
      },
      highCellVoltage: {
        type: Sequelize.INTEGER
      },
      avgCellVoltage: {
        type: Sequelize.INTEGER
      },
      packSumVoltage: {
        type: Sequelize.INTEGER
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