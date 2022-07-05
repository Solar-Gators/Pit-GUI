import { Row } from 'react-materialize';
import Label from '../component/Label'

export interface TelemetryTabbed<
T extends { [key: string]: any }
> {
title: string
data: Partial<{ [Property in keyof T]:
        Partial<Record<keyof T[Property], {
            icon?: string
            label: string
            unit?: string
        }>>
    }>
}

export default function TelemetryCAN<T>({ config, data }: { config: TelemetryTabbed<T>, data: T }) {
    return (<>
        <h3>{config.title}</h3>
        <div className="center-align">
            {Object.keys(config.data).map((messageName: string) => {
                const message = config.data[messageName]

                if (!message) return

                return <Row>
                <h4 style={{ textAlign: "left" }}>{messageName.toUpperCase()}</h4>
                {Object.keys(message)
                .map((telemetryName) => {
                    const telemetry = message[telemetryName]

                    if (!telemetry) return
                    return <>
                        <Label
                            svgSrc={telemetry.icon}
                            label={telemetry.label}
                            unit={telemetry.unit}
                            value={data[messageName]?.[telemetryName] ?? "N/D"}
                        />
                    </>
                })}
                </Row>
            })}
        </div>
    </>)
}
