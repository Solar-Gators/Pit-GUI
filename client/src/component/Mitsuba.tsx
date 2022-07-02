import React from "react"
import { Row } from 'react-materialize';
import Label from '../component/Label'
import * as telemetry from "../shared/sdk/telemetry"
import NoData from './NoData';


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
