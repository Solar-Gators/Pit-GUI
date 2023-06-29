import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Row, Col, Form } from "react-bootstrap";
import { getAllModuleItem } from '../shared/sdk/telemetry';
import { bmsShape } from '../component/BMS'
import { mitsubaShape } from '../component/Mitsuba'
import { mpptShape } from '../component/MPPT'
import * as moment from 'moment'
import { SimpleLinearRegression } from 'ml-regression';
import { useSearchParams } from "react-router-dom";

const allShape = {
  "bms": bmsShape,
  "mitsuba": mitsubaShape,
  "mppt": mpptShape,
}


function Strategy() {

  // options bc radio switches are hard
  const filterZeroes = true;
  const toExtrapolate = 7;
  const showRegression = true;
  const fancySOCEstimate = true;
  const useRegressionRange = true;
  
  // constants to change
  const overnightSocPerHour = 10;


  let localGraph = localStorage.getItem("graph") ?? "{}"
  // ensure that if JSON parse fails the app doesn't crash
  try {
    localGraph = JSON.parse(localGraph)
  }catch {}

  let [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([])
  const [telemetryType, setTelemetryType] = useState(searchParams.get("type") ?? localGraph["type"] ?? "bms")
  const [messageNumber, setMessageNumber] = useState(searchParams.get("number") ?? localGraph["number"] ?? "rx0")
  const [dataKey, setDataKey] = useState(searchParams.get("key") ?? localGraph["key"] ?? "pack_sum_volt_")
  const [startTime, setStartTime] = useState(searchParams.get("start") ?? localGraph["start"] ?? '2023-04-16 12:00')
  const [endTime, setEndTime] = useState(searchParams.get("end") ?? localGraph["end"] ?? '2023-04-16 12:10')
  const [regStartTime, setRegStartTime] = useState(searchParams.get("regstart") ?? localGraph["regstart"] ?? '2023-04-16 12:00')
  const [regEndTime, setRegEndTime] = useState(searchParams.get("regend") ?? localGraph["regend"] ?? '2023-04-16 12:10')
  
  
  useEffect(() => {
    const data = {
      key: dataKey,
      type: telemetryType,
      number: messageNumber,
      start: startTime,
      end: endTime,
      regstart: regStartTime,
      regend: regEndTime,
    }

    setSearchParams(data)
    localStorage.setItem("graph", JSON.stringify(data))

    getAllModuleItem(telemetryType as any, messageNumber, dataKey, {
        createdAt: {
            $gte: moment(startTime).utc().format("YYYY-MM-DD HH:mm"),
            $lte: moment(endTime).utc().format("YYYY-MM-DD HH:mm"),
        }
    })
.then(response => {
  const firstTimestamp = new Date(response[0]["createdAt"]).getTime();
  const filteredResponse = response
    .filter((dataPoint) => !filterZeroes || dataPoint[dataKey] !== 0)
    .map((dataPoint) => ({
      ...dataPoint,
      dateStamp: (new Date(dataPoint["createdAt"]).getTime() - firstTimestamp) / 1000,
    }));   
        
  
  const regStartStamp = (new Date(regStartTime).getTime() - firstTimestamp) / 1000 + 3600;
  const regEndStamp = (new Date(regEndTime).getTime() - firstTimestamp) / 1000 + 3600;

  //const filteredRegResponse = filteredResponse.filter((dataPoint) => dataPoint["dateStamp"] >= regStartStamp);
  
  const filteredRegResponse = filteredResponse.filter((dataPoint) => !useRegressionRange ||  ((dataPoint["dateStamp"] >= regStartStamp) && (dataPoint["dateStamp"] <= regEndStamp))  );
  console.log(filteredRegResponse);

  
  const regXValues = filteredRegResponse.map(dataPoint => dataPoint["dateStamp"]);
  const xValues = filteredResponse.map(dataPoint => dataPoint["dateStamp"]);
  const regYValues = filteredRegResponse.map(dataPoint => dataPoint[dataKey]);
  let regression = new SimpleLinearRegression(regXValues, regYValues);      
  const regStats = regression.score(regXValues, regYValues);

  console.log(regression);
  console.log(regStats);
  
  const intercept = regression["intercept"];
  
  const lastValue = filteredResponse[filteredResponse.length - 1][dataKey];
  
  const lastTimestamp = filteredResponse[filteredResponse.length - 1]["dateStamp"];
  
  const regOffset = regression.predict(lastTimestamp) - lastValue;  
    
  let scaledXAxis = Array.from({length: xValues.length * toExtrapolate}, (_, i) => i);
  
  const xValGap = filteredResponse[filteredResponse.length - 1]["dateStamp"] - xValues.length;
  
  // Map new x values to regression prediction
  let extendedRegression = scaledXAxis.map((xValue) => {
    let obj = {
      dateStamp: xValue,
      regression: regression.predict(xValue + xValGap),
      fancy_estimate: regression.predict(xValue + xValGap) - regOffset,
    };
    obj[dataKey] = filteredResponse[xValue] ? filteredResponse[xValue][dataKey] : null;
    return obj;
  });
  
  const extendedRegressionDates = extendedRegression
  .map((dataPoint) => ({
    ...dataPoint,
    createdAt: new Date((dataPoint["dateStamp"]) * 1000 + firstTimestamp).toISOString(),
    regRange: ((dataPoint["dateStamp"] >= regStartStamp - 3600) && (dataPoint["dateStamp"] <= regEndStamp - 3600)) ? 0 : null,
  }));
      
  setData(extendedRegressionDates as any);
  
	  })}, [dataKey, telemetryType, messageNumber, startTime, endTime, regEndTime, regStartTime])
  return <>
      <Row>
          <Col>
              <Form.Label>Type of Telemetry</Form.Label>
              <Form.Select
                value={telemetryType}
                onChange={(value) => {
                  setTelemetryType(value.target.value)
                  const newNum = Object.keys(allShape[value.target.value].data)[0]
                  setMessageNumber(newNum)
                  setDataKey(Object.keys(allShape[value.target.value].data[newNum])[0])
                }}
              >
                {Object.keys(allShape).map((type) => (
                  <option value={type}>{type}</option>
                ))}
              </Form.Select>
          </Col>
          <Col>
              <Form.Label>Message #</Form.Label>
              <Form.Select
                onChange={(value) => {
                  setMessageNumber(value.target.value)
                  setDataKey(Object.keys(allShape[telemetryType].data[value.target.value])[0])
                }}
                value={messageNumber}
              >
                {Object.keys(allShape[telemetryType].data).map((type) => (
                  <option value={type}>{type}</option>
                ))}
              </Form.Select>
          </Col>
          <Col>
              <Form.Label>Item</Form.Label>
              <Form.Select
                onChange={(event) => {
                  setDataKey(event.target.value)
                }}
                value={dataKey}
              >
                {Object.keys(allShape[telemetryType].data[messageNumber]).map((type) => (
                  <option value={type}>{type}</option>
                ))}
              </Form.Select>
          </Col>
      </Row>
      <Row>
        <Col>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={startTime}
              onChange={(event) => setStartTime(event.target.value)}
            />
        </Col>
        <Col>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={endTime}
              onChange={(event) => setEndTime(event.target.value)}
            />
        </Col>
        </Row>
      {useRegressionRange && <Row>
        <Col>
            <Form.Label>Regression Start</Form.Label>
            <Form.Control
              type="datetime-local"
              value={regStartTime}
              onChange={(event) => setRegStartTime(event.target.value)}
            />
        </Col>
        <Col>
            <Form.Label>Regression End</Form.Label>
            <Form.Control
              type="datetime-local"
              value={regEndTime}
              onChange={(event) => setRegEndTime(event.target.value)}
            />
        </Col>
        </Row>}
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="createdAt"
            tickFormatter={(value) => moment.utc(value).local().format("HH:mm")}
          />
          <YAxis
            label={{
              value: allShape[telemetryType].data[messageNumber][dataKey]?.label,
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip
            labelFormatter={(value) => moment.utc(value).local().format("YYYY-MM-DD HH:mm:ss")}
          />
          <Legend />
          <Line type="monotone" dataKey={dataKey} stroke="#8884d8" dot={false} />
          {dataKey != "pack_soc_" && showRegression && <Line type="monotone" dataKey="regression" stroke="#ff0000" dot={false} />}
          {useRegressionRange && <Line type="monotone" dataKey="regRange" stroke="#000000" dot={true} />}
          {dataKey == "pack_soc_" && fancySOCEstimate && <Line type="monotone" dataKey="fancy_estimate" stroke="#ff0000" dot={false} />}
          
        </LineChart>
      </ResponsiveContainer>
  </>
}

export default Strategy
