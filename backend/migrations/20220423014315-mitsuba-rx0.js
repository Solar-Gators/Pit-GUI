'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Mitsuba_RX0s", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      battVoltage: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null
      },
      
      battCurrent: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null
      },
    
      motorCurrentPkAvg: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null
      },
    
      FETtemp: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: null
      },
    
      motorRPM: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
    
      PWMDuty: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
    
      LeadAngle: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Mitsuba_RX0s")
  }
};
