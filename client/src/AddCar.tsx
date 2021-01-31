import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MemoryRouter, Route, Link, Switch } from "react-router-dom";
import { count } from "console";
// import ButtonGroup from 'react-bootstrap/ButtonGroup'
interface TelemItem {
  name: string;
  decode: number;
  id: number;
}
class CreateCar extends React.Component<{
  updateCarName: (value: string) => void;
  name: string;
}> {
  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Car Name</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter car name"
            onChange={(event) => {
              this.props.updateCarName(event.target.value);
            }}
            value={this.props.name}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

class Telemetry extends React.Component<{ item: TelemItem }> {
  state = {
    instanceName: "",
    decodeLogic: "",
    instanceID: "",
  };
  render() {
    return (
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Instance Name</Form.Label>
            <Form.Control
              type="input"
              placeholder="Enter Instance Name"
              onChange={(event) =>
                this.setState({ instanceName: event.target.value })
              }
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Label>Decode Logic</Form.Label>
            <Form.Control
              as="select"
              placeholder="Select decode logic"
              onChange={(event) =>
                this.setState({ decodeLogic: event.target.value })
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Label>Instance ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Instance ID"
              onChange={(event) =>
                this.setState({ instanceID: event.target.value })
              }
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Remove</Form.Label>
            <Form.Control type="button" />
          </Form.Group>
        </Col>
      </Row>
    );
  }
}

class CreateTelemetry extends React.Component<{
  telemItems: Array<TelemItem>;
  updateTelemetry: (value: TelemItem) => void;
}> {
  render() {
    let TelemetryItems = [];
    for (let index = 0; index < this.props.telemItems.length; index++) {
      TelemetryItems.push(<Telemetry item={this.props.telemItems[index]} />);
    }
    return (
      <React.Fragment>
        {TelemetryItems}
        <Button
          onClick={() =>
            this.props.updateTelemetry({ name: "", decode: 1, id: 0 })
          }
        >
          Add
        </Button>
      </React.Fragment>
    );
  }
}

class SectionLabel extends React.Component<{
  value: string;
  url: string;
  disabled?: boolean;
}> {
  render() {
    return (
      <Col className="d-flex justify-content-center">
        <Button
          as={Link}
          to={this.props.url}
          disabled={this.props.disabled ?? false}
        >
          {this.props.value}
        </Button>
      </Col>
    );
  }
}

class ConfirmationPage extends React.Component<{ name: string }> {
  createCar = () => {
    console.log(this.props.name);
    // console.log(items);
  };
  render() {
    return (
      <React.Fragment>
        <Row>
          <h1>Car Name: </h1>
          <h1>{this.props.name}</h1>
        </Row>
        <Row>
          <h1>Telemetry Items: </h1>
        </Row>
        <Button onClick={this.createCar} variant="success">
          Submit
        </Button>
      </React.Fragment>
    );
  }
}

export default class AddCar extends React.Component {
  state = {
    name: "",
    telemetryItems: [],
  };
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={{ offset: 3, span: 6 }}>
            <h1 className="text-center">Creating a Car</h1>
            <MemoryRouter>
              <Row aria-label="Basic example">
                <SectionLabel url="/" value="Adding Car" />
                <SectionLabel
                  url="/telemetry"
                  value="Creating Telemetry"
                  disabled={false}
                />
                <SectionLabel
                  url="/finish"
                  value="Finishing Up"
                  disabled={true}
                />
              </Row>
              <Route exact path="/">
                <CreateCar
                  name={this.state.name}
                  updateCarName={(name) => {
                    this.setState({ name: name });
                  }}
                />
              </Route>
              <Route exact path="/telemetry">
                <CreateTelemetry
                  telemItems={this.state.telemetryItems}
                  updateTelemetry={(item) => {
                    this.setState({
                      telemetryItems: [...this.state.telemetryItems, item],
                    });
                  }}
                />
              </Route>
              <Route exact path="/finish">
                <ConfirmationPage name={this.state.name} />
              </Route>
            </MemoryRouter>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
