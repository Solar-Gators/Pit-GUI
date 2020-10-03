import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Sidebar from './Sidebar'
import LiveTelemtry from './LiveTelemetry'
import Analysis from './Analysis'
import {Container, Row, Col, Card, Form, Button } from "react-bootstrap";

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
                            <Route exact path="/" component={LiveTelemtry} />
                            <Route exact path="/analysis" />
                        </Col> 
                    </Row>

                </Container>
            </Router>
        );
    }
}

export default App;