import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { MemoryRouter, Route, Link, Switch } from "react-router-dom"
import { count } from 'console'
// import ButtonGroup from 'react-bootstrap/ButtonGroup'

class CreateCar extends React.Component<{ updateCarName : (value: string) => void }> {
    render() {
        return (
            <Form>
                <p className="mt-4">
                    Setting up your car is simple, start by defining a unique name for your car, then click the next button below to define the unique telemetry items.
                </p>
                <Form.Group>
                    <Form.Label>Car Name</Form.Label>
                    <Form.Control type="input" placeholder="Enter car name" onChange={(event) => { this.props.updateCarName(event.target.value) }} />
                </Form.Group>
            </Form>
        )
    }
}

class Telemetry extends React.Component {
    state = {
        instanceName: "",
        decodeLogic: "",
        messages: []
    }
    render() {

        let { messages } = this.state

        return (
            <div className="border border-primary my-4 p-3">
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control type="input" placeholder="Enter Group Name" onChange={(event) => this.setState({ instanceName: event.target.value })} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Label>Message ID</Form.Label>
                            <Form.Control type="input" placeholder="Enter Message ID" onChange={(event) => this.setState({ instanceName: event.target.value })} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Label># of Telemetries</Form.Label>
                            <Form.Control type="number" placeholder="Enter Number of Messages" onChange={(event) => {
                                let numOfMessages = parseInt(event.target.value)
                                let _messages = messages
                                while (_messages.length < numOfMessages) {
                                    _messages.push({ name: '' })
                                }

                                this.setState({ messages: _messages })

                            }} />
                        </Form.Group>
                    </Col>
                </Row>

                {messages.map((message, index) => {
                    return <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>#{index + 1} Telemetry Name</Form.Label>
                                <Form.Control type="input" placeholder="Enter Instance Name" defaultValue={message.name} onChange={(event) => this.setState({ instanceName: event.target.value })} />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group>
                                <Form.Label>Data Type</Form.Label>
                                <Form.Control as="select" placeholder="Select decode logic" onChange={(event) => this.setState({ decodeLogic: event.target.value })}>
                                    <option value="1">uint_16</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                })}
            </div>
        )
    }
}

class CreateTelemetry extends React.Component<{ updateTelemetry : (value: string) => void }> {
    state = {
        count: 0
    }
    render() {
        let TelemetryItems = []
        for (let index = 0; index < this.state.count; index++) {
            TelemetryItems.push(<Telemetry />)
        }
        return (
            <React.Fragment>
                {TelemetryItems}
                <Button onClick={() => this.setState({ count: this.state.count + 1 })}>Add</Button>
            </React.Fragment>
        )
    }
}

class SectionLabel extends React.Component<{ value: string, url: string, disabled?: boolean}> {
    render() {
        return (
            <Col className="d-flex justify-content-center">
                <Button as={Link} to={this.props.url} disabled={this.props.disabled ?? false}>{ this.props.value }</Button>
            </Col>
        )
    }
}

export default class AddCar extends React.Component {
    state = {
        carName: "",
        telemetry: []
    }
    render() {
        return <React.Fragment>
                <Row>
                    <Col md={{ offset: 3, span: 6 }}>
                        <h1 className="text-center">Creating a Car</h1>
                        <MemoryRouter>
                            <Row aria-label="Basic example">
                                <SectionLabel url="/" value="Adding Car" />
                                <SectionLabel url="/telemetry" value="Creating Telemetry" disabled={false} />
                                <SectionLabel url="/finish" value="Finishing Up" disabled={true} />
                            </Row>
                            <Route exact path="/">
                                <CreateCar updateCarName={(name) => {
                                    this.setState({ name: name })
                                }} />
                            </Route>
                            <Route exact path="/telemetry">
                                <CreateTelemetry updateTelemetry={(telemetry) => {
                                    this.setState({telemetry: telemetry})
                                }} />
                            </Route>
                            <Route exact path="/finish">
                                <p>Car Name: {this.state.carName}</p>
                                <p># of Telemetry: {this.state.telemetry.length}</p>
                            </Route>
                        </MemoryRouter>
                        <Button className="float-right mt-4">Next</Button>
                    </Col>
                </Row>
            </React.Fragment>
    }
}
