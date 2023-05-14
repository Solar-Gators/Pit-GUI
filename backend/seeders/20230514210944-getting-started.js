'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const common = {
      'createdAt': new Date(),
      'updatedAt': new Date()
    }

    // BMS
    await queryInterface.bulkInsert('BMS_RX0s', [{
      'low_cell_volt_': 0,
      'high_cell_volt_': 0,
      'avg_cell_volt_': 0,
      'avg_cell_volt_': 0,
      ...common
    }])
    await queryInterface.bulkInsert('BMS_RX1s', [{
      high_temp_: 0,
      high_temp_id_: 0,
      low_temp_: 0,
      low_temp_id_: 0,
      avg_temp_: 0,
      internal_temp_: 0,
      constant_val_: 0,
      ...common
    }])
    await queryInterface.bulkInsert('BMS_RX2s', [{
      pack_dcl_: 0,
      pack_ccl_: 0,
      pack_current_: 0,
      constant_val_: 0,
      ...common
    }])
    await queryInterface.bulkInsert('BMS_RX3s', [{
      low_cell_res_: 0,
      high_cell_res_: 0,
      pack_res_: 0,
      ...common
    }])
    await queryInterface.bulkInsert('BMS_RX4s', [{
      internal_cell_communication_fault_: false,
      cell_balancing_stuck_off_fault_: false,
      weak_cell_fault_: false,
      low_cell_voltage_fault_: false,
      cell_open_wiring_fault_: false,
      current_sensor_fault_: false,
      cell_voltage_over_5v_fault_: false,
      cell_bank_fault_: false,
      weak_pack_fault_: false,
      fan_monitor_fault_: false,
      thermistor_fault_: false,
      can_communication_fault_: false,
      redundant_power_supply_fault_: false,
      high_voltage_isolation_fault_: false,
      invalid_input_supply_voltage_fault_: false,
      chargeenable_relay_fault_: false,
      dischargeenable_relay_fault_: false,
      charger_safety_relay_fault_: false,
      internal_hardware_fault_: false,
      internal_heatsink_thermistor_fault_: false,
      internal_logic_fault_: false,
      highest_cell_voltage_too_high_fault_: false,
      lowest_cell_voltage_too_low_fault_: false,
      pack_too_hot_fault_: false,
      pack_soc_: 0,
      ...common
    }])
    await queryInterface.bulkInsert('BMS_RX5s', [{
      max_pack_dcl_: 0,
      max_pack_ccl_: 0,
      max_pack_volt_: 0,
      min_pack_volt_: 0,
      ...common
    }])

    //Mitsuba
    await queryInterface.bulkInsert('Mitsuba_RX0s', [{
      battVoltage: 0,
      battCurrent: 0,
      motorCurrentPkAvg: 0,
      FETtemp: 0,
      motorRPM: 0,
      PWMDuty: 0,
      LeadAngle: 0,
      ...common
    }])
    await queryInterface.bulkInsert('Mitsuba_RX1s', [{
      powerMode: false,
      MCmode: false,
      acceleratorPosition: 0,
      regenVRposition: 0,
      digitSWposition: 0,
      outTargetVal: 0,
      driveActStat: 0,
      regenStat: false,
      ...common
    }])
    await queryInterface.bulkInsert('Mitsuba_RX2s', [{
      adSensorError : false,
      motorCurrSensorUError : false,
      motorCurrSensorWError: false,
      fetThermError: false,
      battVoltSensorError: false,
      battCurrSensorError: false,
      battCurrSensorAdjError: false,
      motorCurrSensorAdjError: false,
      accelPosError: false,
      contVoltSensorError: false,
      powerSystemError: false,
      overCurrError: false,
      overVoltError: false,
      overCurrLimit: false,
      motorSystemError: false,
      motorLock: false,
      hallSensorShort: false,
      hallSensorOpen: false,
      overHeatLevel: 0,
      ...common
    }])

    //GPS
    await queryInterface.bulkInsert('GPs', [{
      heading: 90,
      latitude: "29.6516",
      longitude: "-82.3248",
      speed: 0,
      ...common
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
