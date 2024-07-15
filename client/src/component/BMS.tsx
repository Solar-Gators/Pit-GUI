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
      low_cell_voltage_fault: {
        label: "Low Cell Voltage Fault",
      },
      high_cell_voltage_fault: {
        label: "High Cell Voltage Fault",
      },
      high_charge_current_fault: {
        label: "High Charge Current Fault"
      },
      high_discharge_current_fault: {
        label: "High Discharge Current Fault"
      },
      high_temp_fault: {
        label: "High Temp Fault"
      },
      thermistor_disconnected_fault: {
        label: "Thermistor Disconnected Fault"
      },
      current_sensor_disconnect_fault: {
        label: "Current Sensor Disconnect Fault"
      },
      kill_switch_pressed_fault: {
        label: "Kill Switch Pressed Fault"
      },
    },
  },
};
