import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Row, Col, Form } from "react-bootstrap";
import { getAllModuleItem } from '../shared/sdk/telemetry';
import { bmsShape } from '../component/BMS'
import { mitsubaShape } from '../component/Mitsuba'
import { mpptShape } from '../component/MPPT'
import * as moment from 'moment'
import { useSearchParams } from "react-router-dom";
import Select from 'react-select';


const allShape = {
  "bms": bmsShape,
  "mitsuba": mitsubaShape,
  "mppt": mpptShape,
}


function Charts() {
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

 const [selectedOption, setSelectedOption] = useState(`${telemetryType}.${messageNumber}.${dataKey}`);

  const handleSelectChange = (selectedOption) => {
    const { value } = selectedOption;
    const [type, num, key] = value.split('.');
    setTelemetryType(type);
    setMessageNumber(num);
    setDataKey(key);
    setSelectedOption(selectedOption);
  }

  const buildOptions = () => {
    let options = [];
    Object.keys(allShape).forEach((type) => {
      Object.keys(allShape[type].data).forEach((num) => {
        Object.keys(allShape[type].data[num]).forEach((key) => {
          const value = `${type}.${num}.${key}`;
          options.push({ value, label: value });
        });
      });
    });
    return options;
  }

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
    .then(setData as any)
  }, [dataKey, telemetryType, messageNumber, startTime, endTime])
  return <>
      <Row>
          <Col>
              <Form.Label>Select Statistics</Form.Label>
              <Select
                value={selectedOption}
                onChange={handleSelectChange}
                options={buildOptions()}
              />
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
        </LineChart>
      </ResponsiveContainer>
  </>
}

export default Charts
