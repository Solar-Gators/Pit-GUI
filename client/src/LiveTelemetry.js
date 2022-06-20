// /client/App.js
import React, { Component } from 'react';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import { Row, Col } from 'react-materialize';
import Label from './Label'
import ReactSpeedometer from 'react-d3-speedometer';
import Map from './Map'
import axios from 'axios'


class LiveTelemetry extends Component {
    state =
        {
            mitsuba: {
                rx0: {
                    battVoltage: 0,
                    battCurrent: 0,
                    motorCurrentPkAvg: 0,
                    FETtemp: 0,
                    motorRPM: 0,
                    PWMDuty: 0,
                    LeadAngle: 0,
                }
            },
            speed: 0,
            lowCellVoltage: 0,
            highCellVoltage: 0,
            avgCellVoltage: 0,
            packSumVoltage: 0,
            duration: 0,
            temperature: 0,
            stateOfCharge: 0,
            consumption: 0,
            panelPower: 0,
            heading: 90,
            carLocation: {
                lat: 29.651979, lng: -82.325020
            },
            loading: true,
            status: "Disconnected"
        }

    componentDidMount() {
        setInterval(this.getDataFromDb, 1000);
    }

    getDataFromDb = () => {
        axios.get('/api/live/data')
            .then((res) => {
                var { voltage, gps, mitsuba } = res.data
                
                if (mitsuba) {
                    this.setState({ mitsuba })
                }

                if (gps) {//[0] && gps[0]) {
                    this.setState({
                        // lowCellVoltage: voltage.lowCellVoltage,
                        // highCellVoltage: voltage.highCellVoltage,
                        // avgCellVoltage: voltage.avgCellVoltage,
                        // packSumVoltage: voltage.packSumVoltage,
                        // voltage: voltage[0].Voltage,
                        heading: gps.heading,
                        speed: gps.speed,
                        carLocation: {
                            lat: parseFloat(gps.latitude),
                            lng: parseFloat(gps.longitude)
                        },
                        status: "Online",
                        loading: false
                    })
                }
                else {
                    this.setState({
                        status: "ERROR!!!!!!",
                        loading: false
                    })
                }
            });
    };

    render() {
        const { speed, lowCellVoltage, highCellVoltage, avgCellVoltage, packSumVoltage, duration, temperature, stateOfCharge, consumption, panelPower, carLocation, heading, loading, status } = this.state;

        if (loading)
            return <p>Loading....</p>

        return (
            <div>
                <Row>
                    <h2>Live Telemetry</h2>
                    <p>{status}</p>
                    <Map center={carLocation} zoom={16} heading={heading} />
                </Row>
                <Row>
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
                <div class="center-align">
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
                <div class="center-align">
                    <Row>
                        <Label label="Motor RPM" value={this.state.mitsuba.rx0.motorRPM} />
                        <Label label="FET Temp" value={this.state.mitsuba.rx0.FETtemp + " C"} />
                        <Label label="PWM Duty Cycle" value={this.state.mitsuba.rx0.PWMDuty} />
                    </Row>
                    <Row>
                        <Label label="Battery Voltage" value={this.state.mitsuba.rx0.battVoltage + " V"} />
                        <Label label="Battery Current" value={this.state.mitsuba.rx0.battCurrent} />
                        <Label label="Average Current" value={this.state.mitsuba.rx0.motorCurrentPkAvg} />
                    </Row>
                    <Row>
                        <Label label="Lead Angle" value={this.state.mitsuba.rx0.LeadAngle} />
                    </Row>
                </div>
            </div>
        );
    }
}

export default LiveTelemetry;