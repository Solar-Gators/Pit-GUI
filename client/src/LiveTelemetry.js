// /client/App.js
import React, { Component } from 'react';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import { Row, Col } from 'react-materialize';
import Label from './Label'
import ReactSpeedometer from 'react-d3-speedometer';
import Map from './Map'


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
        }
    }
    
	componentDidMount()
    {
        //let interval = setInterval(this.getDataFromDb, 100);
    }
    
    getDataFromDb = () =>
    {
        fetch('http://localhost:3001/api/live/getData')
        .then((data) => data.json())
        .then((res) => 
        {
            let newData = this.state.speed
            
            if (newData.length >= 20)
            {
                newData.shift();
            }

            
            newData.push(res.data.speed)
            

            this.setState(
            {
                speed: newData
            })
        });
    };
	
	render()
	{
		const { speed, voltage, duration, temperature, stateOfCharge, consumption, panelPower, carLocation, heading } = this.state;
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

                <h3>Battery Health</h3>
                <div class="center-align">
                    <Row>
                        <Label svgSrc="./voltage.svg" label="Battery" value={voltage + " V"} />
                        <Label svgSrc="./clock.svg" label="Duration" value={duration + " miles"} />
                        <Label svgSrc="./temperature.svg" label="Battery Temp" value={temperature + " C"} />
                    </Row>
                    <Row>
                        <Label svgSrc="./battery.svg" label="State of charge" value={stateOfCharge + " %"} />
                        <Label svgSrc="./consumption.svg" label="Consumption" value={consumption + " Ah"} />
                        <Label svgSrc="./solar-power.svg" label="Panel Power" value={panelPower + " W"} />
                    </Row>
                </div>
            </div>
		);
	}
}

export default LiveTelemetry;