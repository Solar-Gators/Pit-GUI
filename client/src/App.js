import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Sidebar from './Sidebar'
import LiveTelemtry from './LiveTelemetry'
import Analysis from './Analysis'

import './style.css'


class App extends Component
{	
	render()
	{
		return (
            <Router>
                <div style = {{ paddingLeft : "300px" }}>
                    <div style={{"width": "90%"}}class = "container">
                        <Sidebar/>
                        <Route exact path="/" component={LiveTelemtry} />
                        <Route exact path="/analysis" >
                            <p>HIIIIII</p>
                        </Route>
                    </div>
                </div>
            </Router>
		);
	}
}

export default App;