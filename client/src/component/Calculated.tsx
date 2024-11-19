import { TelemetryTabbed } from "./TelemetryCan";

interface Calculated_Data {
  custom: {
    [key: string]: {
      label: string;
      unit: string;
    };
  };
}

export const calculatedShape: TelemetryTabbed<Calculated_Data> = {
  title: "Calculated",
  data: {
    custom: {
      car_speed_mph_: {
        label: "Car Speed",
        unit: "mph",
      },
      better_soc_: {
        label: "State of Charge (Voltage Derived)",
        unit: "%",
      },
      motor_power_consumption_: {
        label: "Motor Power Consumption",
        unit: "watt",
      },
    },
  },
};
