import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Sidebar from './Sidebar'
import LiveTelemetry from './LiveTelemetry'
import Analysis from './Analysis'
import History from './History'

import './style.css'


class App extends Component
{	
    render()
	{
		return (
            <Router>
                <div style = {{ paddingLeft : "300px" }}>
                    <div style={{"width": "90%"}} class = "container">
                        <Sidebar/>
                        <Route exact path="/" component={LiveTelemetry}/>
                        <Route exact path="/analysis" component={Analysis}/>
                        <Route exact path="/history" component={History}/>
                    </div>
                </div>
            </Router>
		);
    }
}

export default App;