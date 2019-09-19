import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sidebar from './Sidebar'
import LiveTelemtry from './LiveTelemetry'
import './style.css'

class App extends Component
{	
	render()
	{
		return (
            <Router>
                <div style = {{ paddingLeft : "300px" }}>
                    <div style={{"width": "90%"}}class = "container">
                        <Sidebar link={Link}/>
                        <Route path="/" exact component={LiveTelemtry} />
                    </div>
                </div>
            </Router>
		);
	}
}

export default App;