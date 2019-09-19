// /client/App.js
import React, { Component } from 'react';
import Graph from './Graph'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import { Button, Card, Row, Col, Route } from 'react-materialize';
import Sidebar from './Sidebar'
import Label from './Label'

import './style.css'

class App extends Component
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
	 // just a note, here, in the front end, we use the id key of our data object
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify
    // data base entries

    // our first get method that uses our backend api to
    // fetch data from our data base
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
		<div style = {{ paddingLeft : "300px" }}>
            <div style={{"width": "90%"}}class = "container">
                <Sidebar />
                <Row>
                    <h1>Overview</h1>
                    <iframe width="100%" height="500px"id="gmap_canvas" src="https://maps.google.com/maps?q=408%20W%20university%20ave%20gainesville%20FL&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                </Row>
                <Row>
                    <Col s={6}>
                        <h3 class="center-align">Speed</h3>
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
		</div>
		
		);
	}
}

export default App;