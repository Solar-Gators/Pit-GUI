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
import Select from 'react-select';


const allShape = {
  "bms": bmsShape,
  "mitsuba": mitsubaShape,
  "mppt": mpptShape,
}


function Strategy() {

  // options bc radio switches are hard
  const filterZeroes = true;
  const toExtrapolate = 3;
  const showRegression = true;
  const fancySOCEstimate = true;
  const useRegressionRange = true;
  const granularityMs = 1000 * 10;
  
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
  const filteredResponseTemp = response
    .filter((dataPoint) => !filterZeroes || dataPoint[dataKey] !== 0)
    .map((dataPoint) => ({
      ...dataPoint,
      dateStamp: Math.floor((new Date(dataPoint["createdAt"]).getTime()) / granularityMs),
    }));   
    
    console.log(filteredResponseTemp);
        
  const filteredResponse = filteredResponseTemp.reduce((accumulator, currentValue) => {
    const duplicateDateStamp = accumulator.find(item => item.dateStamp === currentValue.dateStamp);
    if (!duplicateDateStamp) {
      accumulator.push(currentValue);
    }
    return accumulator;
  }, []);

      console.log(filteredResponse);

  
  const regStartStamp = ((new Date(regStartTime).getTime())+ 3600000) / granularityMs;
  const regEndStamp = ((new Date(regEndTime).getTime()) + 3600000) / granularityMs;

  //const filteredRegResponse = filteredResponse.filter((dataPoint) => dataPoint["dateStamp"] >= regStartStamp);
  
  const filteredRegResponse = filteredResponse.filter((dataPoint) => !useRegressionRange ||  ((dataPoint["dateStamp"] >= regStartStamp - (3600000/granularityMs)) && (dataPoint["dateStamp"] <= regEndStamp - (3600000/granularityMs)))  );
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
      dateStamp: filteredResponse[xValue] ? filteredResponse[xValue]["dateStamp"] : lastTimestamp + (xValue - filteredResponse.length),
      regression: regression.predict(xValue + xValGap),
      estimate: regression.predict(xValue + xValGap) - regOffset,
    };
    obj[dataKey] = filteredResponse[xValue] ? filteredResponse[xValue][dataKey] : null;
    return obj;
  });
  
  const extendedRegressionDates = extendedRegression
  .map((dataPoint) => ({
    ...dataPoint,
    createdAt: new Date((dataPoint["dateStamp"]) * granularityMs).toISOString(),
    regRange: ((dataPoint["dateStamp"] >= regStartStamp - (3600000/granularityMs)) && (dataPoint["dateStamp"] <= regEndStamp - (3600000/granularityMs))) ? 0 : null,
  }));
      
  setData(extendedRegressionDates as any);
  
	  })}, [dataKey, telemetryType, messageNumber, startTime, endTime, regEndTime, regStartTime])
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
          {(dataKey != "pack_soc_" || !fancySOCEstimate) && showRegression && <Line type="monotone" dataKey="regression" stroke="#ff0000" dot={false} />}
          {useRegressionRange && <Line type="monotone" dataKey="regRange" stroke="#000000" dot={true} />}
          {dataKey == "pack_soc_" && fancySOCEstimate && <Line type="monotone" dataKey="estimate" stroke="#ff0000" dot={false} />}
          
        </LineChart>
      </ResponsiveContainer>
  </>
}

export default Strategy
