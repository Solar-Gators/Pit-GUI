import React, { Component } from 'react';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import { Row, Col } from 'react-materialize';
import Label from '../component/Label'
import ReactSpeedometer from 'react-d3-speedometer';
import Map from '../component/Map'
import CarStatus from '../component/CarStatus';
import * as telemetry from "../shared/sdk/telemetry"
import TelemetryCAN, { bmsShape } from "../component/BMS"

function LiveTelemetry() {
    const [data, setData] = React.useState<telemetry.DataResponse>()
    const [speed, setSpeed] = React.useState(0)

    React.useEffect(() => {
        telemetry.getAll()
        .then((response) => {
            setData(response)

            //Calculate speed
            const WHEEL_DIAM_IN = 23.071;
            const WHEEL_DIAM_MI = (WHEEL_DIAM_IN / 63360) * Math.PI;
            const rpm = response?.mitsuba?.rx0?.motorRPM ?? 0
            setSpeed(rpm * 60 * WHEEL_DIAM_MI)
        })
    }, [])


    if (!data) {
        return <p>Loading..</p>
    }


    return (
        <>
            <h2>Live Telemetry</h2>
            <Row>
                <Col>
                    <Map
                        gps={data.gps}
                        zoom={16}
                    />
                </Col>
                <Col className="flex-center">
                    <ReactSpeedometer
                        maxValue={40}
                        value={speed}
                        needleColor="black"
                        startColor="white"
                        segments={4}
                        endColor="white"
                        height={180}
                        currentValueText={"${value} MPH"}
                        valueFormat={"d"}
                    />
                </Col>
            </Row>
            <Row>
                <CarStatus
                    bmsFault={
                        data.bms.rx4 ?
                        Object.keys(data.bms.rx4).some((key) => {
                            return data.bms.rx4[key] === true
                        }) : null
                    }
                    mitsubaFault={
                        data.mitsuba.rx2 ?
                        Object.keys(data.mitsuba.rx2).some((key) => {
                            return data.mitsuba.rx2[key] === true
                        }) : null
                    }
                />
            </Row>

            <TelemetryCAN
                config={bmsShape}
                data={data.bms}
            />

        </>
    )
}

export default LiveTelemetry;
