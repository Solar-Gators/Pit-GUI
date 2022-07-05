import React from "react"
import { Row } from 'react-materialize';
import Label from '../component/Label'
import * as telemetry from "../shared/sdk/telemetry"
import NoData from './NoData';
import { TelemetryTabbed } from "./TelemetryCan";


export const mitsubaShape: TelemetryTabbed<telemetry.DataResponse["mitsuba"]> = {
    title: "Motor Controller",
    data: {
        rx0: {
            battVoltage: {
                label: "Battery Voltage",
                unit: "V"
            },
            battCurrent: {
                label: "Battery Current",
                unit: "A"
            },
            motorCurrentPkAvg: {
                label: "Motor Current Average",
                unit: "A"
            },
            FETtemp: {
                label: "FET Temp",
                unit: "C"
            },
            motorRPM: {
                label: "RPM"
            },
            LeadAngle: {
                label: "Lead Angle"
            }
        },
        rx1: {
            powerMode: {
                label: "Power Mode"
            },
            acceleratorPosition: {
                label: "Accelerator Position"
            },
            regenVRposition: {
                label: "Regen VR Position"
            },
            digitSWposition: {
                label: "Digital Switch Positon"
            },
            outTargetVal: {
                label: "Out Target Val"
            },
            driveActStat: {
                label: "Drive Act Stat"
            },
            regenStat: {
                label: "Regen Stat"
            }
        },
        rx2: {
            overHeatLevel: {
                label: "Over Heat Level"
            },
            adSensorError: {
                label: "Ad Sensor Error"
            },

            motorCurrSensorUError : {
                label: "motor Current Sensor U Error"
            },

            motorCurrSensorWError: {
                label: "Motor Current Sensor W Error"
            },

            fetThermError: {
                label: "FET Thermal Error"
            },

            battVoltSensorError: {
                label: "Battery Voltage Sensor Error"
            },

            battCurrSensorError: {
                label: "Battery current sensor error"
            },

            battCurrSensorAdjError: {
                label: "Current Sensor Adj Error"
            },

            motorCurrSensorAdjError: {
                label: "Motor Current Sensor Adj Error"
            },

            accelPosError: {
                label: "Accelerator Position Error"
            },

            contVoltSensorError: {
                label: "Cont Voltage Sensor Error"
            },

            powerSystemError: {
                label: "Power System Error"
            },

            overCurrError: {
                label: "Over Current Error"
            },

            overVoltError: {
                label: "Over Voltage Error"
            },

            overCurrLimit: {
                label: "Over current limit"
            },

            motorSystemError: {
                label: "Motor System Error"
            },

            motorLock: {
                label: "Motor Lock"
            },

            hallSensorShort: {
                label: "Hall Sensor Short"
            },

            hallSensorOpen: {
                label: "Hall Sensor Open"
            }
        }
    }
}

export default function Mitsuba({ mitsuba }: { mitsuba: telemetry.DataResponse["mitsuba"] }) {
    return (<>
        <h3>Motor Controllers</h3>
        {!mitsuba ? <NoData /> :
        <div className="center-align">
            <Row>
                <Label
                    label="Motor RPM"
                    value={mitsuba.rx0?.motorRPM}
                />
                <Label
                    label="FET Temp"
                    value={mitsuba.rx0?.FETtemp}
                    unit="C"
                />
                <Label
                    label="PWM Duty Cycle"
                    value={mitsuba.rx0?.PWMDuty}
                />
            </Row>
            <Row>
                <Label
                    label="Battery Voltage"
                    value={mitsuba.rx0?.battVoltage ? mitsuba.rx0?.battVoltage/2 : undefined}
                    unit="V"
                />
                <Label
                    label="Battery Current"
                    value={mitsuba.rx0?.battCurrent}
                    unit="A"
                />
                <Label
                    label="Average Current"
                    value={mitsuba.rx0?.motorCurrentPkAvg}
                    unit="A"
                />
            </Row>
            <Row>
                <Label
                    label="Lead Angle"
                    value={mitsuba.rx0?.LeadAngle}
                />
            </Row>
        </div>
        }
    </>)
}
