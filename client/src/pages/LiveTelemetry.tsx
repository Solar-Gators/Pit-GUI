import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { mitsubaShape } from "../component/Mitsuba";
import { mpptShape } from "../component/MPPT";
import ReactSpeedometer from "react-d3-speedometer";
import Map from "../component/Map";
import CarStatus from "../component/CarStatus";
import * as telemetry from "../shared/sdk/telemetry";
import { bmsShape } from "../component/BMS";
import TelemetryCAN from "../component/TelemetryCan";
import Nav from "react-bootstrap/Nav";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import Label from "../component/Label";
import { stateOfCharge } from "./Strategy";
import { powerBoardShape } from "../component/PowerBoard";

function LiveTelemetry() {
  const [data, setData] = React.useState<telemetry.DataResponse>();
  const [speed, setSpeed] = React.useState(0);

  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash !== "") {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]); // do this on route change

  React.useEffect(() => {
    setInterval(() => {
      if (
        !localStorage.getItem("username")?.trim() ||
        !localStorage.getItem("password")?.trim()
      )
        return;

      telemetry
        .getAll()
        .then((response) => {
          setData(response);

          //Calculate speed
          const rpm = response?.mitsuba?.rx0?.motorRPM ?? 0;
          setSpeed(rpm * 60 * telemetry.WHEEL_RADIUS_MI);
        })
        .catch((reason) => {
          if (reason.request.status == 403) {
            window.location.reload();
          }
        });
    }, 1000);
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  // adjusting for tlm we have a 2024 ASC

  // tends to be a voltage drop before BMS

  const packVoltage = data?.mitsuba?.rx0?.battVoltage + 3
  const totalArrayPower = calcArrayPower(data?.mppt?.[1])+ calcArrayPower(data?.mppt?.[2]) + calcArrayPower(data?.mppt?.[3])

  return (
    <>
      <h2>Live Telemetry</h2>
      <Row>
        <Col>
          <Map gps={data.gps} zoom={16} />
        </Col>
        <Col className="flex-center">
          <ReactSpeedometer
            maxValue={60}
            value={speed}
            needleColor="black"
            startColor="white"
            segments={4}
            endColor="white"
            height={180}
            currentValueText={"${value} MPH"}
            valueFormat={"d"}
          />
        </Col>
      </Row>
      <Row>
        <CarStatus
          bmsFault={
            data.bms.rx3
              ? Object.keys(data.bms.rx3).some((key) => {
                  return (
                    data?.bms?.rx3[key] === true &&
                    bmsShape?.data?.rx3?.[key as any]?.["booleanError"]
                  );
                })
              : false
          }
          mitsubaFault={
            data.mitsuba.rx2
              ? Object.keys(data.mitsuba.rx2).some((key) => {
                  return data?.mitsuba?.rx2[key] === true;
                })
              : false
          }
          mppt1Fault={
            data?.mppt?.["1"]?.rx5
              ? Object.keys(data.mppt["1"].rx5).some((key) => {
                  return (
                    data.mppt["1"].rx5[key] === true &&
                    mpptShape?.data?.rx5?.[key as any]?.["booleanError"]
                  );
                })
              : false
          }
          mppt2Fault={
            data?.mppt?.["2"]?.rx5
              ? Object.keys(data.mppt["2"].rx5 ?? {}).some((key) => {
                  return (
                    data.mppt["2"].rx5[key] === true &&
                    mpptShape?.data?.rx5?.[key as any]?.["booleanError"]
                  );
                })
              : false
          }
          mppt3Fault={
            data?.mppt?.["3"]?.rx5
              ? Object.keys(data.mppt["3"].rx5 ?? {}).some((key) => {
                  return (
                    data.mppt["3"].rx5[key] === true &&
                    mpptShape?.data?.rx5?.[key as any]?.["booleanError"]
                  );
                })
              : false
          }
        />
      </Row>

      <h3>Quick Facts</h3>
      <Row>
        <Label label="Pack Voltage" value={packVoltage} unit="V" />
        <Label
          label="Consumption"
          value={
            data?.mitsuba?.rx0?.battVoltage * data?.mitsuba?.rx0?.battCurrent -
            totalArrayPower
          }
          unit="W"
        />
        <Label label="Custom SOC" value={stateOfCharge(packVoltage)} unit="%" />
        <Label
          label="High Cell Temp"
          value={data?.bms?.rx1?.high_temp_}
          unit="C"
        />
      </Row>
      <Row>
        <Label label="Total Array Power" value={totalArrayPower} unit="W" />
        <Label
          label="Sup Bat Volt"
          value={data?.powerBoard?.rx1?.SupBatVoltage_ ?? "N/A"}
          unit="V"
        />
        <Label
          label="Array Power #1"
          value={calcArrayPower(data?.mppt?.[1])}
          unit="W"
        />
        <Label
          label="Array Power #2"
          value={calcArrayPower(data?.mppt?.[2])}
          unit="W"
        />
        <Label
          label="Array Power #3"
          value={calcArrayPower(data?.mppt?.[3])}
          unit="W"
        />
      </Row>
      <Row>
        <Label label="Lap Count" value={data?.laps?.rx0?.lap ?? 0} />
        <Label
          label="Power Draw"
          value={
            (data?.mitsuba?.rx0?.battVoltage ?? 0) *
            (data?.mitsuba?.rx0?.battCurrent ?? 0)
          }
          unit="W"
        />
      </Row>

      <h3>Raw Messages</h3>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link as={NavLink} to="/">
            Motor Controller
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/bms">
            BMS
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/mppt_1">
            MPPT #1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/mppt_2">
            MPPT #2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/mppt_3">
            MPPT #3
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/stats">
            Stats
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/powerBoard">
            Power Board
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/collector-health">
            Collector Health
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Routes>
        <Route
          path="/"
          element={<TelemetryCAN config={mitsubaShape} data={data?.mitsuba} />}
        />
        <Route
          path="/bms"
          element={<TelemetryCAN config={bmsShape} data={data?.bms} />}
        />
        <Route
          path="/mppt_1"
          element={<TelemetryCAN config={mpptShape} data={data?.mppt?.["1"]} />}
        />
        <Route
          path="/mppt_2"
          element={<TelemetryCAN config={mpptShape} data={data?.mppt?.["2"]} />}
        />
        <Route
          path="/mppt_3"
          element={<TelemetryCAN config={mpptShape} data={data?.mppt?.["3"]} />}
        />
        <Route
          path="/stats"
          element={
            <>
              <h3>Stats</h3>
              <Label
                label="Distance Traveled"
                value={data?.mitsuba?.distance_traveled?.distance?.toFixed(1)}
                unit="Mi"
              />
            </>
          }
        />
        <Route
          path="/powerBoard"
          element={
            <TelemetryCAN config={powerBoardShape} data={data?.powerBoard} />
          }
        />
        <Route
          path="/collector-health"
          element={
            <>
              <br />
              <p>
                Last heard from the PI on {String(data?.pi?.alive?.createdAt)}
              </p>
              <br />
            </>
          }
        />
      </Routes>
    </>
  );
}

function calcArrayPower(mppt: telemetry.MPPT_Group) {
  return (mppt?.rx0?.inputCurrent ?? 0) * (mppt?.rx0?.inputVoltage ?? 0);
}

export default LiveTelemetry;
