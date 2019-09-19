// /client/App.js
import React, { Component } from 'react';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import { Row, Col } from 'react-materialize';
import Label from './Label'
import ReactSpeedometer from 'react-d3-speedometer';


class LiveTelemetry extends Component
{
	state = 
	{
		speed: [],
		voltage: [0]
	}
	componentDidMount()
    {
        //let interval = setInterval(this.getDataFromDb, 100);
    }
    
    getDataFromDb = () =>
    {
        fetch('http://localhost:3001/api/getData')
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
		const { speed, voltage } = this.state;
		return (
            <div>
                <Row>
                    <h2>Live Telemetry</h2>
                    <iframe width="100%" height="500px"id="gmap_canvas" src="https://maps.google.com/maps?q=408%20W%20university%20ave%20gainesville%20FL&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                </Row>
                <Row>
                    <Col className="center-align" s={6}>
                        <ReactSpeedometer
                            maxValue={40}
                            value={20.1}
                            needleColor="red"
                            startColor="black"
                            segments={4}
                            endColor="black"
                            height={180}
                            currentValueText={"${value} MPH"}
                            valueFormat={"d"}
                            />
                    </Col>
                    <Col s={6}>
                        <h3 class="center-align">Distance Traveled</h3>
                    </Col>
                </Row>

                <h3>Battery Health</h3>
                <div class="center-align">
                    <Row>
                        <Label svgSrc="./voltage.svg" label="Battery" value="5V" />
                        <Label svgSrc="./clock.svg" label="Duration" value="100 miles" />
                        <Label svgSrc="./temperature.svg" label="Battery Temp" value="50 C" />
                    </Row>
                    <Row>
                        <Label svgSrc="./battery.svg" label="State of charge" value="100%" />
                        <Label svgSrc="./consumption.svg" label="Consumption" value="-41.8 Ah" />
                        <Label svgSrc="./solar-power.svg" label="Panel Power" value="100 W" />
                    </Row>
                </div>
            </div>
		);
	}
}

export default LiveTelemetry;