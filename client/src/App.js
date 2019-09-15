// /client/App.js
import React, { Component } from 'react';
import Graph from './Graph'

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
        let interval = setInterval(this.getDataFromDb, 100);
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
		<div>
			<Graph name="Speed" data={speed} maxY="30"/>
			<Graph name="Voltage" data={voltage} maxY="5"/>
		</div>
		
		);
	}
}

export default App;