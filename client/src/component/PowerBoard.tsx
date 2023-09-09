import * as telemetry from "../shared/sdk/telemetry";
import { TelemetryTabbed } from "./TelemetryCan";

export const powerBoardShape: TelemetryTabbed<
  telemetry.DataResponse["powerBoard"]
> = {
  title: "MPPTs",
  data: {
    rx1: {
      SupBatVoltage_: {
        label: "Sup Bat Voltage",
        unit: "V",
      },
      SupBatPower_: {
        label: "Sup Bat Power",
        unit: "W",
      },
      MainBatPower_: {
        label: "Main Bat Power",
        unit: "W",
      },
    },
  },
};
