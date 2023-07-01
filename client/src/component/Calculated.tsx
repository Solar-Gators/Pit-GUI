
import * as telemetry from "../shared/sdk/telemetry"
import { TelemetryTabbed } from "./TelemetryCan";


export const calculatedShape: TelemetryTabbed<telemetry.DataResponse["calculated"]>  = {
    title: "Calculated",
    data: {
        custom: {
            car_speed_mph_: {
                label: "Car Speed",
                unit: "mph"
            },
            better_soc_: {
                label: "Estimated State of Charge",
                unit: "%"
            },
            power_consumption_watts_: {
                label: "Power Consumption",
                unit: "W",
            
            }
        }
      }
}
