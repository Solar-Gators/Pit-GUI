import * as telemetry from "../shared/sdk/telemetry";
import { TelemetryTabbed } from "./TelemetryCan";

export const bmsShape: TelemetryTabbed<telemetry.DataResponse["bms"]> = {
  title: "BMS",
  data: {
    rx0: {
      avg_cell_volt_: {
        label: "Average Cell Voltage",
        unit: "V",
      },
      high_cell_volt_: {
        label: "High Cell Voltage",
        unit: "V",
      },
      low_cell_volt_: {
        label: "Low Cell Voltage",
        unit: "V",
      },
      pack_sum_volt_: {
        label: "Pack Sum Voltage",
        unit: "V",
      },
    },
    rx1: {
      high_temp_: {
        label: "Cell High Temp",
        unit: "C",
      },
      low_temp_: {
        label: "Cell Low Temp",
        unit: "C",
      },
      avg_temp_: {
        label: "Cel Average Temp",
        unit: "C",
      },
      internal_temp_: {
        label: "Internal Temp",
        unit: "C",
      },
    },
    rx2: {
      pack_ccl_: {
        label: "Pack Charge Current Limit",
        unit: "A",
      },
      pack_current_: {
        label: "Pack Current",
        unit: "A",
      },
      pack_dcl_: {
        label: "Pack Discharge Current Limit",
        unit: "A",
      },
    },
    rx3: {
      low_cell_res_: {
        label: "Low Cell Resistance",
      },
      high_cell_res_: {
        label: "High Cell Resistance",
      },
      pack_res_: {
        label: "Pack Resistance",
      },
    },
    rx4: {
      internal_cell_communication_fault_: {
        label: "Internal CAN",
        booleanError: true,
      },

      cell_balancing_stuck_off_fault_: {
        label: "Cell Balance",
        booleanError: true,
      },

      weak_cell_fault_: {
        label: "Weak Cell",
      },

      low_cell_voltage_fault_: {
        label: "Low Cell",
        booleanError: true,
      },

      cell_open_wiring_fault_: {
        label: "Open Wiring",
        booleanError: true,
      },

      current_sensor_fault_: {
        label: "Current Sensor",
        booleanError: true,
      },

      cell_voltage_over_5v_fault_: {
        label: "Over 5V",
        booleanError: true,
      },

      cell_bank_fault_: {
        label: "Cell Bank",
        booleanError: true,
      },

      weak_pack_fault_: {
        label: "Weak Pack",
        booleanError: true,
      },

      fan_monitor_fault_: {
        label: "Fan Monitor",
        booleanError: true,
      },

      thermistor_fault_: {
        label: "Thermistor",
      },

      can_communication_fault_: {
        label: "CAN",
        booleanError: true,
      },

      redundant_power_supply_fault_: {
        label: "Redundant Power Supply",
        booleanError: true,
      },

      high_voltage_isolation_fault_: {
        label: "High Voltage Isolation",
        booleanError: true,
      },

      invalid_input_supply_voltage_fault_: {
        label: "Invalid Input Supply Voltage",
        booleanError: true,
      },

      chargeenable_relay_fault_: {
        label: "Charge Enable Relay",
        booleanError: true,
      },

      dischargeenable_relay_fault_: {
        label: "Discharge Enable",
        booleanError: true,
      },

      charger_safety_relay_fault_: {
        label: "Charger Safety Relay",
        booleanError: true,
      },

      internal_hardware_fault_: {
        label: "Internal Hardware",
        booleanError: true,
      },

      internal_heatsink_thermistor_fault_: {
        label: "Internal Heat Sink Thermistor",
        booleanError: true,
      },

      internal_logic_fault_: {
        label: "Internal Logic",
        booleanError: true,
      },

      highest_cell_voltage_too_high_fault_: {
        label: "Highest Cell too High",
        booleanError: true,
      },

      lowest_cell_voltage_too_low_fault_: {
        label: "Lowest Cell too Low",
        booleanError: true,
      },

      pack_too_hot_fault_: {
        label: "Pack too Hot",
        booleanError: true,
      },
      pack_soc_: {
        label: "Pack State of charge",
        unit: "%",
      },
    },
    rx5: {
      max_pack_ccl_: {
        label: "Max Charge Current Limit",
      },
      max_pack_dcl_: {
        label: "Max Pack Discharge Current Limit",
      },
      max_pack_volt_: {
        label: "Max Pack Voltage",
      },
    },
  },
};
