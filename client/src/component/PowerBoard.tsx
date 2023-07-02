
import * as telemetry from "../shared/sdk/telemetry"
import { TelemetryTabbed } from "./TelemetryCan";


export const mpptShape: TelemetryTabbed<telemetry.DataResponse["powerBoard"]> = {
    title: "MPPTs",
    data: {
        rx0: {
            SupBatVoltage_: {
                label: "Sup Bat Voltage"
            },
            SupBatPower_: {
                label: "Sup Bat Power"
            }
        }
    }
}
