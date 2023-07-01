import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Row, Col, Form } from "react-bootstrap";
import { getAllModuleItem, WHEEL_RADIUS_MI } from '../shared/sdk/telemetry';
import { bmsShape } from '../component/BMS'
import { mitsubaShape } from '../component/Mitsuba'
import { mpptShape } from '../component/MPPT'
import { calculatedShape } from '../component/Calculated'
import * as moment from 'moment'
import { SimpleLinearRegression } from 'ml-regression';
import { useSearchParams } from "react-router-dom";
import Select from 'react-select';

const allShape = {
  "bms": bmsShape,
  "mitsuba": mitsubaShape,
  "mppt": mpptShape,
  "calculated": calculatedShape,
}

function Strategy() {

  // constants to change
  const overnightSocPerHour = 10;

  let localGraph = localStorage.getItem("graph") ?? "{}"
  // ensure that if JSON parse fails the app doesn't crash
  try {
    localGraph = JSON.parse(localGraph)
  } catch { }

  let [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([])
  const [telemetryType, setTelemetryType] = useState(searchParams.get("type") ?? localGraph["type"] ?? "bms")
  const [messageNumber, setMessageNumber] = useState(searchParams.get("number") ?? localGraph["number"] ?? "rx0")
  const [dataKey, setDataKey] = useState(searchParams.get("key") ?? localGraph["key"] ?? "pack_sum_volt_")
  const [startTime, setStartTime] = useState(searchParams.get("start") ?? localGraph["start"] ?? '2023-04-16 12:00')
  const [endTime, setEndTime] = useState(searchParams.get("end") ?? localGraph["end"] ?? '2023-04-16 12:10')
  const [regStartTime, setRegStartTime] = useState(searchParams.get("regstart") ?? localGraph["regstart"] ?? '2023-04-16 12:00')
  const [regEndTime, setRegEndTime] = useState(searchParams.get("regend") ?? localGraph["regend"] ?? '2023-04-16 12:10')
  const [showRegression, setShowRegression] = useState(false)
  const [fancySOCEstimate, setFancySOCEstimate] = useState(false)
  const [useRegressionRange, setUseRegressionRange] = useState(false)
  const [useTrim, setUseTrim] = useState(false)
  const [granularityMs, setGranularityMs] = useState(searchParams.get("granularity") ?? localGraph["granularity"] ?? 10000)
  const [maxTrimVal, setMaxTrimVal] = useState(searchParams.get("maxtrim") ?? localGraph["maxtrim"] ?? 999999)
  const [minTrimVal, setMinTrimVal] = useState(searchParams.get("mintrim") ?? localGraph["mintrim"] ?? 0)
  const [rangeAverage, setRangeAverage] = useState(0)
  const [rangeMax, setRangeMax] = useState(0)
  const [rangeMin, setRangeMin] = useState(0)

  const [selectedOption, setSelectedOption] = useState(`${telemetryType}.${messageNumber}.${dataKey}`);

  const handleSelectChange = (selectedOption) => {
    const { value } = selectedOption;
    const [type, num, key] = value.split('.');
    setTelemetryType(type);
    setMessageNumber(num);
    setDataKey(key);
    setSelectedOption(selectedOption);

    if (key == "high_temp_" || key == "pack_sum_volt_" || key == "pack_soc_") {
      setUseTrim(true);
    } else {
      setUseTrim(false);
    }
  }

  const buildOptions = () => {
    let options: { value: string, label: string }[] = [];
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

  const stateOfCharge = (packVoltage: any) => {
    let voltage = packVoltage / 26;

    if (voltage >= 4.05) return 100;
    else if (voltage >= 3.2) return ((voltage - 3.2) * (100 - 10.714) / (4.05 - 3.2)) + 10.714;
    else if (voltage >= 3.1) return ((voltage - 3.1) * (10.714 - 5.36) / (3.2 - 3.1)) + 5.36;
    else if (voltage >= 2.7) return (voltage - 2.7) * (5.36 - 0) / (3.1 - 2.7);
    else return 0;
  };

  const handleRegRangeRadio = (selectedOption) => {
    setUseRegressionRange(selectedOption);
    setRegEndTime(endTime);
    setRegStartTime(startTime);
  }

  const handleTrimRadio = (selectedOption) => {
    setUseTrim(selectedOption);

    if (dataKey == "pack_sum_volt_") {
      setMaxTrimVal(110);
      setMinTrimVal(80);
    } else if (dataKey == "pack_soc_") {
      setMaxTrimVal(100);
      setMinTrimVal(1);
    } else if (dataKey == "high_temp_") {
      setMaxTrimVal(48);
      setMinTrimVal(20);
    } else {
      setMaxTrimVal(999999);
      setMinTrimVal(0);
    }
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
      granularity: granularityMs,
      maxtrim: maxTrimVal,
      mintrim: minTrimVal,
    }

    setSearchParams(data)
    
    localStorage.setItem("graph", JSON.stringify(data))

    let getAllModuleItemPromise: Promise<any> = Promise.resolve();

    let currentForWatts;

    if (dataKey == "power_consumption_watts_") {
      currentForWatts = getAllModuleItem("bms" as any, "rx2", "pack_current_", {
        createdAt: {
          $gte: moment(startTime).utc().format("YYYY-MM-DD HH:mm"),
          $lte: moment(endTime).utc().format("YYYY-MM-DD HH:mm"),
        }
      });

      getAllModuleItemPromise = getAllModuleItem("bms" as any, "rx0", "pack_sum_volt_", {
        createdAt: {
          $gte: moment(startTime).utc().format("YYYY-MM-DD HH:mm"),
          $lte: moment(endTime).utc().format("YYYY-MM-DD HH:mm"),
        }
      });

    } else if (dataKey == "better_soc_") {
      getAllModuleItemPromise = getAllModuleItem("bms" as any, "rx0", "pack_sum_volt_", {
        createdAt: {
          $gte: moment(startTime).utc().format("YYYY-MM-DD HH:mm"),
          $lte: moment(endTime).utc().format("YYYY-MM-DD HH:mm"),
        }
      });
    } else if (dataKey == "car_speed_mph_") {
      getAllModuleItemPromise = getAllModuleItem("mitsuba" as any, "rx0", "motorRPM", {
        createdAt: {
          $gte: moment(startTime).utc().format("YYYY-MM-DD HH:mm"),
          $lte: moment(endTime).utc().format("YYYY-MM-DD HH:mm"),
        }
      });
    } else {
      getAllModuleItemPromise = getAllModuleItem(telemetryType as any, messageNumber, dataKey, {
        createdAt: {
          $gte: moment(startTime).utc().format("YYYY-MM-DD HH:mm"),
          $lte: moment(endTime).utc().format("YYYY-MM-DD HH:mm"),
        }
      });
    }

    getAllModuleItemPromise.then(response => {

      let toTransform;

      if (dataKey == "car_speed_mph_") {

        toTransform = response.map((dataPoint) => ({
          ...dataPoint,
          [dataKey]: dataPoint["motorRPM"] * 60 * WHEEL_RADIUS_MI,
        }));

      } else if (dataKey == "better_soc_") {

        toTransform = response.map((dataPoint) => ({
          ...dataPoint,
          [dataKey]: stateOfCharge(dataPoint["pack_sum_volt_"]),
        }));

      } else {
        toTransform = response;
      }

      const filteredResponseTemp = toTransform.map((dataPoint) => ({
        ...dataPoint,
        dateStamp: Math.floor((new Date(dataPoint["createdAt"]).getTime()) / granularityMs),
      }))
        .filter((dataPoint) => !useTrim || (dataPoint[dataKey] >= minTrimVal && dataPoint[dataKey] <= maxTrimVal));

      let sum = 0;
      let maxValue = -Infinity;
      let minValue = Infinity;

      filteredResponseTemp.forEach(dataPoint => {
        sum += dataPoint[dataKey];

        if (dataPoint[dataKey] > maxValue) {
          maxValue = dataPoint[dataKey];
        }

        if (dataPoint[dataKey] < minValue) {
          minValue = dataPoint[dataKey];
        }
      });

      let average = sum / filteredResponseTemp.length;

      setRangeAverage(average);
      setRangeMax(maxValue);
      setRangeMin(minValue);

      const filteredResponse = filteredResponseTemp.reduce((accumulator, currentValue) => {
        const duplicateDateStamp = accumulator.find(item => item.dateStamp === currentValue.dateStamp);
        if (!duplicateDateStamp) {
          accumulator.push(currentValue);
        }
        return accumulator;
      }, []);

      console.log(filteredResponse);

      const requestedTimespan = new Date(endTime).getTime() - new Date(startTime).getTime();

      const startTimestamp = new Date(filteredResponse[0]["dateStamp"] * granularityMs).getTime();

      const endTimestamp = new Date(filteredResponse[filteredResponse.length - 1]["dateStamp"] * granularityMs).getTime();

      const givenTimespan = endTimestamp - startTimestamp;

      const toExtrapolate = requestedTimespan / givenTimespan;

      const oldRegStartStamp = ((new Date(regStartTime).getTime()) + 3600000) / granularityMs;

      const oldRegEndStamp = ((new Date(regEndTime).getTime()) + 3600000) / granularityMs;

      const regStartStamp = Math.max(oldRegStartStamp, (startTimestamp + 3600000) / granularityMs);

      const regEndStamp = Math.min(oldRegEndStamp, (endTimestamp + 3600000) / granularityMs);

      const filteredRegResponse = filteredResponse.filter((dataPoint) => !useRegressionRange || ((dataPoint["dateStamp"] >= regStartStamp - (3600000 / granularityMs)) && (dataPoint["dateStamp"] <= regEndStamp - (3600000 / granularityMs))));

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

      let scaledXAxis = Array.from({ length: xValues.length * toExtrapolate }, (_, i) => i);

      const xValGap = filteredResponse[filteredResponse.length - 1]["dateStamp"] - xValues.length;

      // Map new x values to regression prediction
      let extendedRegression = scaledXAxis.map((xValue) => {
        let obj = {
          dateStamp: filteredResponse[xValue] ? filteredResponse[xValue]["dateStamp"] : lastTimestamp + (xValue - filteredResponse.length),
          regression: regression.predict(xValue + xValGap) - (fancySOCEstimate ? regOffset : 0),
        };
        obj[dataKey] = filteredResponse[xValue] ? filteredResponse[xValue][dataKey] : null;
        return obj;
      });

      const extendedRegressionDates = extendedRegression
        .map((dataPoint) => ({
          ...dataPoint,
          createdAt: new Date((dataPoint["dateStamp"]) * granularityMs).toISOString(),
          regRange: ((dataPoint["dateStamp"] >= regStartStamp - (3600000 / granularityMs)) && (dataPoint["dateStamp"] <= regEndStamp - (3600000 / granularityMs))) ? 0 : null,
        }));

      setData(extendedRegressionDates as any);

    })
  }, [dataKey, telemetryType, messageNumber, startTime, endTime, regEndTime, regStartTime, granularityMs, maxTrimVal, minTrimVal, fancySOCEstimate, useTrim])
  return <>
    <Row>
      <Col>
        <Form.Label>Select Statistics</Form.Label>
        <Select
          value={selectedOption}
          onChange={handleSelectChange}
          options={buildOptions() as any}
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
        }}>
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
        {showRegression && <Line type="monotone" dataKey="regression" stroke="#ff0000" dot={false} />}
        {useRegressionRange && <Line type="monotone" dataKey="regRange" stroke="#000000" dot={true} />}
      </LineChart>
    </ResponsiveContainer>
    <Row />
    <Row>
      <Col>
        <div className="switch">
          <label>
            Show Regression
            <input
              type="checkbox"
              checked={showRegression}
              onChange={(event) => {
                setShowRegression(event.target.checked);
                setUseRegressionRange(false);
              }}
            />
            <span className="lever"></span>
          </label>
        </div>
      </Col>
      {showRegression && <Col>
        <div className="switch">
          <label>
            Regression Range
            <input
              type="checkbox"
              checked={useRegressionRange}
              onChange={(event) => handleRegRangeRadio(event.target.checked)}
            />
            <span className="lever"></span>
          </label>
        </div>
      </Col>}
      {showRegression && <Col>
        <div className="switch">
          <label>
            Offset Regression
            <input
              type="checkbox"
              checked={fancySOCEstimate}
              onChange={(event) => setFancySOCEstimate(event.target.checked)}
            />
            <span className="lever"></span>
          </label>
        </div>
      </Col>}
      <Col>
        <div className="switch">
          <label>
            Use Trim
            <input
              type="checkbox"
              checked={useTrim}
              onChange={(event) => handleTrimRadio(event.target.checked)}
            />
            <span className="lever"></span>
          </label>
        </div>
      </Col>
      <Col>
        <div className="form-outline" style={{ width: '6rem' }}>
          <label className="form-label" htmlFor="typeNumber">Resolution (ms)</label>
          <input
            min="0"
            type="text"
            id="typeNumber"
            className="form-control"
            defaultValue={granularityMs}
            onBlur={(event) => setGranularityMs((event.target as HTMLInputElement).value)}
            onFocus={(event) => event.target.select()}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                (event.target as HTMLInputElement).blur();
              }
            }}
          />
        </div>
      </Col>
      {useTrim && <Col>
        <div className="form-outline" style={{ width: '6rem' }}>
          <label className="form-label" htmlFor="typeNumber">Max Trim</label>
          <input
            min="0"
            type="text"
            id="typeNumber"
            className="form-control"
            defaultValue={maxTrimVal}
            onFocus={(event) => event.target.select()}
            onBlur={(event) => setMaxTrimVal(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                (event.target as HTMLInputElement).blur();
              }
            }}
          />
        </div>
      </Col>}
      {useTrim && <Col>
        <div className="form-outline" style={{ width: '6rem' }}>
          <label className="form-label" htmlFor="typeNumber">Min Trim</label>
          <input
            min="0"
            type="text"
            id="typeNumber"
            className="form-control"
            defaultValue={minTrimVal}
            onBlur={(event) => setMinTrimVal(event.target.value)}
            onFocus={(event) => event.target.select()}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                (event.target as HTMLInputElement).blur();
              }
            }}
          />
        </div>
      </Col>}
      <Col>
        <div>
          <h6 className="form-label">Average: {rangeAverage}</h6>
        </div>
        <div>
          <h6 className="form-label">Maximum: {rangeMax}</h6>
        </div>
        <div>
          <h6 className="form-label">Minimum: {rangeMin}</h6>
        </div>
      </Col>
    </Row>
  </>
}

export default Strategy
