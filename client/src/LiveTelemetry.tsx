// /client/App.js
import React, { Component } from "react"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Map from "./Map"
import axios from "axios"
import SessionButton from "./SessionButton"

function ThreeRow(item1, item2, item3) {
  return (
    <Row>
      <Col>
        {item1}
      </Col>
      <Col>
        {item2}
      </Col>
      <Col>
        {item3}
      </Col>
    </Row>
  )
}

interface TelemetryData {
  label : string
  value : string
}

function telemetryRow(data1: TelemetryData, data2: TelemetryData, data3: TelemetryData) {
  return (
    <React.Fragment>
      { ThreeRow(<strong>{data1.label}</strong>, <strong>{data2.label}</strong>, <strong>{data3.label}</strong>) }
      { ThreeRow(data1.value, data2.value, data3.value) }
    </React.Fragment>
  )
}


class LiveTelemetry extends Component {
  state = {
    speed: 0,
    voltage: 0,
    duration: 0,
    temperature: 0,
    stateOfCharge: 0,
    consumption: 0,
    panelPower: 0,
    heading: 90,
    carLocation: {
      lat: 29.651979,
      lng: -82.32502,
    },
    loading: true,
  };

  componentDidMount() {
    setInterval(this.getDataFromDb, 100);
  }

  getDataFromDb = () => {
    axios.get("/api/live/data").then((res) => {
      // var {voltage, gps} = res.data
      // if (voltage[0] && gps[0]) {
      //     this.setState({
      //         voltage: voltage[0].Voltage,
      //         heading: gps[0].heading,
      //         speed: gps[0].speed,
      //         carLocation: {
      //             lat: parseFloat(gps[0].coordinates.latitude),
      //             lng: parseFloat(gps[0].coordinates.longitude)
      //         },
      //         loading: false
      //     })
      // }
      // else {
      this.setState({ loading: false });
      // }
    });
  };

  render() {
    const {
      // speed,
      // voltage,
      // duration,
      // temperature,
      // stateOfCharge,
      // consumption,
      // panelPower,
      carLocation,
      heading,
      loading,
    } = this.state;

    if (loading) return <p>Loading....</p>;

    return (
      <div>
		<SessionButton />
        <Row>
          <h1>Live Telemetry</h1>
          <Map center={carLocation} zoom={16} heading={heading} />
        </Row>
        <Row>
            {/* BMS */}
            <Col className="rounded mt-5 pb-3 text-center" style={{ border: '4px solid #343a40' }}>
              <h3 style={{ marginTop: '-17px', background: 'white', display: 'table' }}>BMS</h3>
              {
                telemetryRow({
                  label: "State of Charge",
                  value: "0.00"
                },
                {
                  label: "Volt. (40-72V)",
                  value: "0.00 V"
                },
                {
                  label: "Curr.(0-480A)",
                  value: "0.00 A"
                })
              }

              {
                telemetryRow({
                  label: "State of Charge",
                  value: "0.00"
                },
                {
                  label: "Volt. (40-72V)",
                  value: "0.00 V"
                },
                {
                  label: "Curr.(0-480A)",
                  value: "0.00 A"
                })
              }

              {
                telemetryRow({
                  label: "State of Charge",
                  value: "0.00"
                },
                {
                  label: "Volt. (40-72V)",
                  value: "0.00 V"
                },
                {
                  label: "Curr.(0-480A)",
                  value: "0.00 A"
                })
              }

            </Col>
            <Col>
            </Col>
        </Row>
      </div>
    );
  }
}

export default LiveTelemetry;
