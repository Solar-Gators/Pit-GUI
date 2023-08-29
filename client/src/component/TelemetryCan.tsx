import React from "react";
import { Row } from "react-materialize";
import Label from "../component/Label";

export interface TelemetryTabbed<T extends { [key: string]: any }> {
  title: string;
  data: Partial<{
    [Property in keyof T]: Partial<
      Record<
        keyof T[Property],
        {
          icon?: string;
          label: string;
          unit?: string;
          booleanError?: boolean;
        }
      >
    >;
  }>;
}

export default function TelemetryCAN<T>({
  config,
  data,
}: {
  config: TelemetryTabbed<T>;
  data: T;
}) {
  return (
    <>
      <h3>{config.title}</h3>
      <div className="center-align">
        {Object.keys(config.data).map((messageName: string) => {
          const message = config.data?.[messageName];

          if (!message) return;
          const telemetryData = data?.[messageName];

          return (
            <Row id={messageName}>
              <h4 style={{ textAlign: "left" }}>{messageName.toUpperCase()}</h4>
              <p className="text-start">
                Received:{" "}
                {telemetryData?.["createdAt"]
                  ? new Date(telemetryData["createdAt"]).toString()
                  : "N/A"}
              </p>
              {Object.keys(message).map((telemetryName) => {
                const telemetryInfo = message[telemetryName];

                if (!telemetryInfo) return;
                return (
                  <>
                    <Label
                      svgSrc={telemetryInfo.icon}
                      label={telemetryInfo.label}
                      unit={telemetryInfo.unit}
                      booleanError={telemetryInfo.booleanError}
                      value={telemetryData?.[telemetryName] ?? "N/D"}
                    />
                  </>
                );
              })}
            </Row>
          );
        })}
      </div>
    </>
  );
}
