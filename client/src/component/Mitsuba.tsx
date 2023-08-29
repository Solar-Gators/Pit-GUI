import * as telemetry from "../shared/sdk/telemetry";
import { TelemetryTabbed } from "./TelemetryCan";

export const mitsubaShape: TelemetryTabbed<telemetry.DataResponse["mitsuba"]> =
  {
    title: "Motor Controller",
    data: {
      rx0: {
        battVoltage: {
          label: "Battery Voltage",
          unit: "V",
        },
        battCurrent: {
          label: "Battery Current",
          unit: "A",
        },
        motorCurrentPkAvg: {
          label: "Motor Current Average",
          unit: "A",
        },
        FETtemp: {
          label: "FET Temp",
          unit: "C",
        },
        motorRPM: {
          label: "RPM",
        },
        LeadAngle: {
          label: "Lead Angle",
        },
      },
      rx1: {
        powerMode: {
          label: "Power Mode",
        },
        acceleratorPosition: {
          label: "Accelerator Position",
        },
        regenVRposition: {
          label: "Regen VR Position",
        },
        digitSWposition: {
          label: "Digital Switch Positon",
        },
        outTargetVal: {
          label: "Out Target Val",
        },
        driveActStat: {
          label: "Drive Act Stat",
        },
        regenStat: {
          label: "Regen Stat",
        },
      },
      rx2: {
        overHeatLevel: {
          label: "Over Heat Level",
        },
        adSensorError: {
          label: "Ad Sensor Error",
          booleanError: true,
        },

        motorCurrSensorUError: {
          label: "motor Current Sensor U Error",
          booleanError: true,
        },

        motorCurrSensorWError: {
          label: "Motor Current Sensor W Error",
          booleanError: true,
        },

        fetThermError: {
          label: "FET Thermal Error",
          booleanError: true,
        },

        battVoltSensorError: {
          label: "Battery Voltage Sensor Error",
          booleanError: true,
        },

        battCurrSensorError: {
          label: "Battery current sensor error",
          booleanError: true,
        },

        battCurrSensorAdjError: {
          label: "Current Sensor Adj Error",
          booleanError: true,
        },

        motorCurrSensorAdjError: {
          label: "Motor Current Sensor Adj Error",
          booleanError: true,
        },

        accelPosError: {
          label: "Accelerator Position Error",
          booleanError: true,
        },

        contVoltSensorError: {
          label: "Cont Voltage Sensor Error",
          booleanError: true,
        },

        powerSystemError: {
          label: "Power System Error",
          booleanError: true,
        },

        overCurrError: {
          label: "Over Current Error",
          booleanError: true,
        },

        overVoltError: {
          label: "Over Voltage Error",
          booleanError: true,
        },

        overCurrLimit: {
          label: "Over current limit",
          booleanError: true,
        },

        motorSystemError: {
          label: "Motor System Error",
          booleanError: true,
        },

        motorLock: {
          label: "Motor Lock",
          booleanError: true,
        },

        hallSensorShort: {
          label: "Hall Sensor Short",
          booleanError: true,
        },

        hallSensorOpen: {
          label: "Hall Sensor Open",
          booleanError: true,
        },
      },
    },
  };
