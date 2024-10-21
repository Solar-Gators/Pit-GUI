import * as telemetry from "../shared/sdk/telemetry";
import { TelemetryTabbed } from "./TelemetryCan";

export const calculatedShape: TelemetryTabbed<
  telemetry.DataResponse["calculated"]
> = {
  title: "Calculated",
  data: {
    custom: {
      car_speed_mph_: {
        label: "Car Speed",
        unit: "mph",
      },
      car_speed_kph_: {
        label: "Car Speed (kph)",
        unit: "kph",
      },
      better_soc_: {
        label: "State of Charge (Voltage Derived)",
        unit: "%",
      },
      motor_power_consumption_: {
        label: "Motor Power Consumption",
        unit: "watt",
      }
    },
  },
};
