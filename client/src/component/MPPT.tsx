
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
        }
    }
}
