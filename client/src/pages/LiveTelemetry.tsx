import React from 'react';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import { Row, Col } from 'react-bootstrap';
import { mitsubaShape } from "../component/Mitsuba"
import { mpptShape } from "../component/MPPT"
import ReactSpeedometer from 'react-d3-speedometer';
import Map from '../component/Map'
import CarStatus from '../component/CarStatus';
import * as telemetry from "../shared/sdk/telemetry"
import { bmsShape } from "../component/BMS"
import TelemetryCAN from '../component/TelemetryCan';
import Nav from 'react-bootstrap/Nav'
import { NavLink, Route, Routes } from "react-router-dom"
import Label from '../component/Label';

function LiveTelemetry() {
    const [data, setData] = React.useState<telemetry.DataResponse>()
    const [speed, setSpeed] = React.useState(0)

    React.useEffect(() => {
        setInterval(() => {
            telemetry.getAll()
            .then((response) => {
                setData(response)

                //Calculate speed
                const WHEEL_DIAM_IN = 23.071;
                const WHEEL_DIAM_MI = (WHEEL_DIAM_IN / 63360) * Math.PI;
                const rpm = response?.mitsuba?.rx0?.motorRPM ?? 0
                setSpeed(rpm * 60 * WHEEL_DIAM_MI)
            })
        }, 1000)
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
                            return data?.bms?.rx4[key] === true
                        }) : null
                    }
                    mitsubaFault={
                        data.mitsuba.rx2 ?
                        Object.keys(data.mitsuba.rx2).some((key) => {
                            return data?.mitsuba?.rx2[key] === true
                        }) : null
                    }
                />
            </Row>

            <h3>Quick Facts</h3>
            <Row>
                <Label
                    label="Pack Voltage"
                    value={data?.bms?.rx0?.pack_sum_volt_ ?? "N/D"}
                    unit="V"
                />
                <Label
                    label="Power"
                    value={
                        (data?.bms?.rx0?.pack_sum_volt_ ?? 0)
                        *
                        (data?.bms?.rx2?.pack_current_ ?? 0)
                    }
                    unit="W"
                />
                <Label
                    label="State of Charge"
                    value={
                        data?.bms?.rx4?.pack_soc_
                    }
                    unit="%"
                />
            </Row>

            <h3>Raw Messages</h3>
            <Nav variant="tabs">
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/">Motor Controller</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/bms">BMS</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/mppt_1">MPPT #1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/mppt_2">MPPT #2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={NavLink} to="/mppt_3">MPPT #3</Nav.Link>
                </Nav.Item>
            </Nav>

            <Routes>
                <Route
                    path="/"
                    element={
                        <TelemetryCAN
                            config={mitsubaShape}
                            data={data?.mitsuba}
                        />
                    }
                />
                <Route
                    path="/bms"
                    element={
                        <TelemetryCAN
                            config={bmsShape}
                            data={data?.bms}
                        />
                    }
                />
                <Route
                    path="/mppt_1"
                    element={
                        <TelemetryCAN
                            config={mpptShape}
                            data={data?.mppt?.['0']}
                        />
                    }
                />
                <Route
                    path="/mppt_2"
                    element={
                        <TelemetryCAN
                            config={mpptShape}
                            data={data?.mppt?.['1']}
                        />
                    }
                />
                <Route
                    path="/mppt_3"
                    element={
                        <TelemetryCAN
                            config={mpptShape}
                            data={data?.mppt?.['2']}
                        />
                    }
                />
            </Routes>

        </>
    )
}

export default LiveTelemetry;
