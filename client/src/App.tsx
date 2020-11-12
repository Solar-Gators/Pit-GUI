import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Sidebar from './Sidebar'
import LiveTelemetry from './LiveTelemetry'
import Cars from './Cars'
import AddCar from './AddCar'
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'


import './style.css'

library.add(fab, faEdit)

function SideBarComponents() {
    return (
    <Row>
        <Col xs={2} id="sidebar-wrapper">
            <Sidebar />
        </Col>
        <Col xs={10} id="page-content-wrapper" style = {{ padding : "30px" }}>
            <Switch>
                <Route exact path="/:vehicle/car" component={LiveTelemetry} />
            </Switch>
        </Col>
    </Row>)
}

class App extends Component
{
    render()
    {
        return (
            <Router>
                <Container fluid>
                    <Switch>
                        <Route exact path="/" component={Cars} />
                        <Route exact path="/car/add" component={AddCar} />
                        <Route component={SideBarComponents} />
                    </Switch>
                </Container>
            </Router>
        );
    }
}

export default App;