
import * as telemetry from "../shared/sdk/telemetry"
import { TelemetryTabbed } from "./TelemetryCan";


export const mpptShape: TelemetryTabbed<telemetry.MPPT_Group> = {
    title: "MPPTs",
    data: {
        rx0: {
            inputCurrent: {
                label: "Input Current",
                unit: "A"
            },
            inputVoltage: {
                label: "Input Voltage",
                unit: "V"
            }
        },
        rx1: {
            outputCurrent: {
                label: "Output Current",
                unit: "A"
            },
            outputVoltage: {
                label: "Output Voltage",
                unit: "V"
            }
        },
        rx2: {
            mosfetTemp: {
                label: "MOSFET Temp",
                unit: "C"
            },
            controllerTemp: {
                label: "Controller Temp",
                unit: "C"
            }
        },
        rx3: {
            aux12V: {
                label: "Aux 12V",
                unit: "V"
            },
            aux3V: {
                label: "Aux 3V",
                unit: "V"
            }
        },
        rx4: {
            maxInputCurrent: {
                label: "Max Input Current",
                unit: "A"
            },
            maxOutputVoltage: {
                label: "Max Output Voltage",
                unit: "V"
            }
        },
        rx5: {
            CANRXerr: {
                label: "CAN Receive Errors"
            },
            CANTXerr: {
                label: "CAN Transmit Errors"
            },
            CANTXoverflow: {
                label: "CAN TX Overflow Errors"
            },
            error_low_array_power: {
                label: "Low Array Power Error"
            },
            error_mosfet_overheat: {
                label: "Mosfet Overheating Error"
            },
            error_battery_low: {
                label: "Battery Low Error"
            },
            error_battery_full: {
                label: "Battery Full Error"
            },
            error_12v_undervolt: {
                label: "12v under-volt Error"
            },
            error_hw_overcurrent: {
                label: "HW over-current error"
            },
            error_hw_overvolt: {
                label: "HW over-volt Error"
            },

            flag_input_current_min: {
                label: "Input current min"
            },
            flag_input_current_max: {
                label: "input current max"
            },
            flag_output_voltage_max: {
                label: "output volt max"
            },
            flag_mosfet_temp: {
                label: "Mosfet temp"
            },
            flag_duty_cycle_min: {
                label: "Duty cycle min"
            },
            flag_duty_cycle_max: {
                label: "Duty cycle max"
            },
            flag_local_mppt: {
                label: "Local MPPT"
            },
            flag_global_mppt: {
                label: "Global MPPT"
            },
        }
    }
}
