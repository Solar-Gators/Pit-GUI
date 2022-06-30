import React, { Component } from 'react';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import { Row, Col } from 'react-materialize';
import Label from '../component/Label'
import ReactSpeedometer from 'react-d3-speedometer';
import Map from '../component/Map.tsx'
import axios from 'axios'
import CarStatus from '../component/CarStatus';

function LiveTelemetry() {
    return (
        <>
            <Row>
                <h2>Live Telemetry</h2>
                {/* <Map
                    center={carLocation}
                    zoom={16}
                    heading={heading}
                /> */}
            </Row>
            <Row>
                <CarStatus />
            </Row>
            {/* <Row>
                <Col className="center-align" s={6} offset="s3">
                    <ReactSpeedometer
                        maxValue={40}
                        value={speed}
                        needleColor="red"
                        startColor="black"
                        segments={4}
                        endColor="black"
                        height={180}
                        currentValueText={"${value} MPH"}
                        valueFormat={"d"}
                    />
                </Col>
            </Row>

            <h3>Battery Management System</h3>
            <div className="center-align">
                <div>
                    <p>State of Charge</p>

                </div>

                <Row>
                    <Label svgSrc="./voltage.svg" label="Pack Sum" value={packSumVoltage + " V"} />
                    <Label label="Low" value={lowCellVoltage + " V"} />
                    <Label label="High" value={highCellVoltage + " V"} />
                    <Label label="Average" value={avgCellVoltage + " V"} />
                </Row>
                <Row>
                    <Label svgSrc="./temperature.svg" label="High Temp" value={stateOfCharge + " V"} />
                    <Label label="Low Temp" value={consumption + " V"} />
                </Row>
                <Row>
                    <Label svgSrc="./battery.svg" label="State of Charge" value={stateOfCharge + " V"} />
                    <Label label="Amp Hours" value={consumption + " V"} />
                </Row>
                <Row>
                    <Label svgSrc="./battery.svg" label="Pack current" value={stateOfCharge + " V"} />
                    <Label label="Pack current charge limit" value={consumption + " V"} />
                    <Label label="Pack discharge current limit" value={panelPower + " V"} />
                </Row>
                <Row>
                    <Label svgSrc="./solar-power.svg" label="Fail Safe Status" value={panelPower + " V"} />
                </Row>
            </div>

            <h3>Motor Controllers</h3>
            <div className="center-align">
                <Row>
                    <Label label="Motor RPM" value={this.state.mitsuba.rx0.motorRPM} />
                    <Label label="FET Temp" value={this.state.mitsuba.rx0.FETtemp + " C"} />
                    <Label label="PWM Duty Cycle" value={this.state.mitsuba.rx0.PWMDuty} />
                </Row>
                <Row>
                    <Label label="Battery Voltage" value={this.state.mitsuba.rx0.battVoltage/2 + " V"} />
                    <Label label="Battery Current" value={this.state.mitsuba.rx0.battCurrent} />
                    <Label label="Average Current" value={this.state.mitsuba.rx0.motorCurrentPkAvg} />
                </Row>
                <Row>
                    <Label label="Lead Angle" value={this.state.mitsuba.rx0.LeadAngle} />
                </Row>
            </div> */}
        </>
    )
}

export default LiveTelemetry;
