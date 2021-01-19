import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Sidebar from './Sidebar'
import LiveTelemetry from './LiveTelemetry'
import History from './History'
import Analysis from './Analysis'
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import './style.css'


class App extends Component
{
    render()
    {
        return (
            <Router>
                <Container fluid>
                    <Row>
                        <Col xs={2} id="sidebar-wrapper">
                        <Sidebar />
                        </Col>
                        <Col  xs={10} id="page-content-wrapper" style = {{ padding : "30px" }}>
                            <Route exact path="/" component={LiveTelemetry} />
                            <Route exact path="/analysis" component={Analysis} />
                            <Route exact path="/history" component={History} />
                        </Col> 
                    </Row>

                </Container>
            </Router>
        );
    }
}

export default App;