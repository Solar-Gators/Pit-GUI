import React from "react"
import * as telemetry from "../shared/sdk/telemetry"
import { TelemetryTabbed } from "./TelemetryCan";

export const bmsShape: TelemetryTabbed<telemetry.DataResponse["bms"]> = {
    title: "BMS",
    data: {
        rx0: {
            avg_cell_volt_: {
                label: "Average Cell Voltage",
                unit: "V"
            },
            high_cell_volt_: {
                label: "High Cell Voltage"
            },
            low_cell_volt_: {
                label: "Low Cell Voltage"
            },
            pack_sum_volt_: {
                label: "Pack Sum Voltage"
            }
        },
        rx1: {
            high_temp_: {
                label: "Cell High Temp",
                unit: "C"
            },
            low_temp_: {
                label: "Cell Low Temp",
                unit: "C"
            },
            avg_temp_: {
                label: "Cel Average Temp",
                unit: "C"
            },
            internal_temp_: {
                label: "Internal Temp",
                unit: "C"
            }
        },
        rx2: {
            pack_ccl_: {
                label: "Pack Charge Current Limit"
            },
            pack_current_: {
                label: "Pack Current"
            },
            pack_dcl_: {
                label: "Pack Discharge Current Limit"
            }
        },
        rx3: {
            low_cell_res_: {
                label: "Low Cell Resistance"
            },
            high_cell_res_: {
                label: "High Cell Resistance"
            },
            pack_res_: {
                label: "Pack Resistance"
            }
        },
        rx4: {

            internal_cell_communication_fault_: {
                label: "Internal CAN"
            },

            cell_balancing_stuck_off_fault_: {
                label: "Cell Balance"
            },

            weak_cell_fault_: {
                label: "Weak Cell"
            },


            low_cell_voltage_fault_: {
                label: "Low Cell"
            },

            cell_open_wiring_fault_: {
                label: "Open Wiring"
            },

            current_sensor_fault_: {
                label: "Current Sensor"
            },

            cell_voltage_over_5v_fault_: {
                label: "Over 5V"
            },

            cell_bank_fault_: {
                label: "Cell Bank"
            },

            weak_pack_fault_: {
                label: "Weak Pack"
            },

            fan_monitor_fault_: {
                label: "Fan Monitor"
            },

            thermistor_fault_: {
                label: "Thermistor"
            },


            can_communication_fault_: {
                label: "CAN"
            },

            redundant_power_supply_fault_: {
                label: "Redundant Power Supply"
            },


            high_voltage_isolation_fault_: {
                label: "High Voltage Isolation"
            },

            invalid_input_supply_voltage_fault_: {
                label: "Invalid Input Supply Voltage"
            },

            chargeenable_relay_fault_: {
                label: "Charge Enable Relay"
            },

            dischargeenable_relay_fault_: {
                label: "Discharge Enable"
            },

            charger_safety_relay_fault_: {
                label: "Charger Safety Relay"
            },

            internal_hardware_fault_: {
                label: "Internal Hardware"
            },


            internal_heatsink_thermistor_fault_: {
                label: "Internal Heat Sink Thermistor"
            },

            internal_logic_fault_: {
                label: "Internal Logic"
            },

            highest_cell_voltage_too_high_fault_: {
                label: "Highest Cell too High"
            },

            lowest_cell_voltage_too_low_fault_: {
                label: "Lowest Cell too Low"
            },

            pack_too_hot_fault_: {
                label: "Pack too Hot"
            }
        },
        rx5: {
            max_pack_ccl_: {
                label: "Max Charge Current Limit"
            },
            max_pack_dcl_: {
                label: "Max Pack Discharge Current Limit"
            },
            max_pack_volt_: {
                label: "Max Pack Voltage"
            }
        }
    }
}
