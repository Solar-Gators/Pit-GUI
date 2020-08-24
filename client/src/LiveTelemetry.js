// /client/App.js
import React, { Component } from 'react';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import { Row, Col } from 'react-materialize';
import Label from './Label'
import ReactSpeedometer from 'react-d3-speedometer';
import Map from './Map'
import axios from 'axios'


class LiveTelemetry extends Component
{
	state = 
	{
		speed: 0,
        voltage: 0,
        duration: 0,
        temperature: 0,
        stateOfCharge: 0,
        consumption: 0,
        panelPower: 0,
        heading: 90,
        carLocation: {
            lat: 29.651979, lng: -82.325020
        },
        loading: true
    }
    
	componentDidMount()
    {
        setInterval(this.getDataFromDb, 100);
    }
    
    getDataFromDb = () =>
    {
        axios.get('/api/live/data')
        .then((res) => 
        {
            var {voltage, gps} = res.data
            if (voltage[0] && gps[0]) {
                this.setState({
                    voltage: voltage[0].Voltage,
                    heading: gps[0].heading,
                    speed: gps[0].speed,
                    carLocation: {
                        lat: parseFloat(gps[0].coordinates.latitude),
                        lng: parseFloat(gps[0].coordinates.longitude)
                    },
                    loading: false
                })
            }
            else {
                this.setState({ loading: false })
            }
        });
    };
	
	render()
	{
        const { speed, voltage, duration, temperature, stateOfCharge, consumption, panelPower, carLocation, heading, loading } = this.state;
        
        if (loading)
            return <p>Loading....</p>

		return (
            <div>
                <Row>
                    <h2>Live Telemetry</h2>
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
                        <Label svgSrc="./voltage.svg" label="Pack Sum" value={voltage + " V"} />
                        <Label label="Low" value={stateOfCharge + " V"} />
                        <Label label="High" value={duration + " V"} />
                        <Label label="Average" value={temperature + " V"} />
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
                        <Label svgSrc="./voltage.svg" label="RPM" value={voltage + " V"} />
                        <Label svgSrc="./clock.svg" label="Temperature" value={duration + " V"} />
                        <Label svgSrc="./temperature.svg" label="Duty Cycle" value={temperature + " V"} />
                    </Row>
                    <Row>
                        <Label svgSrc="./battery.svg" label="AD Sensor Error" value={stateOfCharge + " V"} />
                        <Label svgSrc="./consumption.svg" label="Power System Error" value={consumption + " V"} />
                        <Label svgSrc="./solar-power.svg" label="Motor System Error" value={panelPower + " V"} />
                    </Row>
                    <Row>
                        <Label svgSrc="./battery.svg" label="FET Over Heat Level" value={stateOfCharge + " V"} />
                    </Row>
                </div>
            </div>
		);
	}
}

export default LiveTelemetry;