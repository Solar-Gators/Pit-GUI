import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Row, Col, Form } from "react-bootstrap";
import regression from 'regression';
import { getAllModuleItem } from '../shared/sdk/telemetry';
import { bmsShape } from '../component/BMS'
import { mitsubaShape } from '../component/Mitsuba'
import { mpptShape } from '../component/MPPT'
import * as moment from 'moment'
import { useSearchParams } from "react-router-dom";

const allShape = {
  "bms": bmsShape,
  "mitsuba": mitsubaShape,
  "mppt": mpptShape,
}


function Strategy() {
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


  useEffect(() => {
    const data = {
      key: dataKey,
      type: telemetryType,
      number: messageNumber,
      start: startTime,
      end: endTime,
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
	  const filteredResponse = response.filter((dataPoint) => dataPoint[dataKey] !== 0);
	  setData(filteredResponse as any);

	  const baseTime = new Date(startTime).getTime();

	  const dataWithTimeAsNumber = filteredResponse.map((dataPoint) => {
		return { ...dataPoint, timeAsNumber: (new Date(dataPoint.createdAt).getTime() - baseTime) / 1000 };
	  });
	  
	  console.log(dataWithTimeAsNumber);

	  const result = regression.linear(dataWithTimeAsNumber.map((dataPoint) => [dataPoint.timeAsNumber, dataPoint[dataKey]]));
	  
	  console.log(result);

	  const gradient = result.equation[0];
	  const yIntercept = result.equation[1];
	  //const gradient = -0.0000013;
	  //const yIntercept = 85;

	  console.log("gradient: " + gradient);
	  console.log("yIntercept: " + yIntercept);

	  const lineOfBestFit = dataWithTimeAsNumber.map((dataPoint) => ({ ...dataPoint, lineOfBestFit: gradient * dataPoint.timeAsNumber + yIntercept }));

	  setData(lineOfBestFit);
	});	
	}, [dataKey, telemetryType, messageNumber, startTime, endTime]);
  
  
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
          <Line type="monotone" dataKey="lineOfBestFit" stroke="#ff0000" dot={false} />
        </LineChart>
      </ResponsiveContainer>
  </>
}

export default Strategy
