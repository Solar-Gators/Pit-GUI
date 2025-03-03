import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { getAllModuleItem, WHEEL_RADIUS_MI } from "../shared/sdk/telemetry";
import { bmsShape } from "../component/BMS";
import { mitsubaShape } from "../component/Mitsuba";
import { mpptShape } from "../component/MPPT";
import { calculatedShape } from "../component/Calculated";
import * as moment from "moment";
import { SimpleLinearRegression } from "ml-regression";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import * as telemetry from "../shared/sdk/telemetry";

const allShape = {
  bms: bmsShape,
  mitsuba: mitsubaShape,
  mppt: mpptShape,
  calculated: calculatedShape,
};

function Strategy() {
  let localGraph = localStorage.getItem("graph") ?? "{}";

  // ensure that if JSON parse fails the app doesn't crash
  try {
    localGraph = JSON.parse(localGraph);
  } catch {}

  let [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [telemetryType, setTelemetryType] = useState(localGraph["type"] ?? []);
  const [messageNumber, setMessageNumber] = useState(
    localGraph["number"] ?? []
  );
  const [dataKey, setDataKey] = useState(localGraph["key"] ?? []);
  const [startTime, setStartTime] = useState(
    localGraph["start"] ?? "2023-04-16 12:00"
  );
  const [endTime, setEndTime] = useState(
    localGraph["end"] ?? "2023-04-16 12:10"
  );
  const autoUpdate = JSON.parse(
    localStorage.getItem("toggleAutoUpdate") ?? "true"
  );
  const [regStartTime, setRegStartTime] = useState("2023-04-16 12:00");
  const [regEndTime, setRegEndTime] = useState("2023-04-16 12:10");
  const [showRegression, setShowRegression] = useState(false);
  const [fancySOCEstimate, setFancySOCEstimate] = useState(false);
  const [useRegressionRange, setUseRegressionRange] = useState(false);
  const [useTrim, setUseTrim] = useState(false);
  const [granularityMs, setGranularityMs] = useState(10000);
  const [maxTrimVal, setMaxTrimVal] = useState(999999);
  const [minTrimVal, setMinTrimVal] = useState(0);
  const [rangeAverage, setRangeAverage] = useState(0);
  const [integral, setIntegral] = useState(0);
  const [rangeMax, setRangeMax] = useState(0);
  const [rangeMin, setRangeMin] = useState(0);
  const [shouldExtrapolate, setShouldExtrapolate] = useState(false);
  const [regressionRSquared, setRegressionRSquared] = useState(0);
  const [derivedRegressionEnd, setDerivedRegressionEnd] = useState(0);
  const [selectedOption, setSelectedOption] = useState(
    telemetryType.map((t, index) => {
      const combinedString = `${t}.${messageNumber[index]}.${dataKey[index]}`;
      return {
        value: combinedString,
        label: combinedString,
      };
    })
  );
  const [rawData, setRawData] = useState<any[]>([]);
  const [rawData2, setRawData2] = useState<any[]>([]);
  const [isPressed, setIsPressed] = useState(false);
  const [latestStatChange, setLatestStatChange] = useState(0);
  const [selectionComplete, setSelectionComplete] = useState(false);
  const [lineColors] = useState([
    "#8884D8",
    "#D88884",
    "#84D888",
    "#884D88",
    "#88884D",
    "#4D8888",
  ]);
  var statIsUpdated = [false];

  async function fetchData(statIndex: number) {
    if (
      !localStorage.getItem("username")?.trim() ||
      !localStorage.getItem("password")?.trim() ||
      !messageNumber?.[0] ||
      !telemetryType?.[0] ||
      !dataKey?.[0]
    )
      return;

    let result;
    let result2;

    if (dataKey[statIndex] == "better_soc_") {
      result = await getAllModuleItem("bms" as any, "rx0", "pack_sum_volt_", {
        createdAt: {
          $gte: moment(startTime).utc().format("YYYY-MM-DD HH:mm"),
          $lte: moment(endTime).utc().format("YYYY-MM-DD HH:mm"),
        },
      });
    } else if (dataKey[statIndex] == "car_speed_mph_") {
      result = await getAllModuleItem("mitsuba" as any, "rx0", "motorRPM", {
        createdAt: {
          $gte: moment(startTime).utc().format("YYYY-MM-DD HH:mm"),
          $lte: moment(endTime).utc().format("YYYY-MM-DD HH:mm"),
        },
      });
    } else if (dataKey[statIndex] == "motor_power_consumption_") {
      result = await getAllModuleItem("mitsuba" as any, "rx0", "battVoltage", {
        createdAt: {
          $gte: moment(startTime).utc().format("YYYY-MM-DD HH:mm"),
          $lte: moment(endTime).utc().format("YYYY-MM-DD HH:mm"),
        },
      });
      result2 = await getAllModuleItem(
        "mitsuba" as any,
        "rx0",
        "motorCurrentPkAvg",
        {
          createdAt: {
            $gte: moment(startTime).utc().format("YYYY-MM-DD HH:mm"),
            $lte: moment(endTime).utc().format("YYYY-MM-DD HH:mm"),
          },
        }
      );
    } else {
      result = await getAllModuleItem(
        telemetryType[statIndex] as any,
        messageNumber[statIndex],
        dataKey[statIndex],
        {
          createdAt: {
            $gte: moment(startTime).utc().format("YYYY-MM-DD HH:mm"),
            $lte: moment(endTime).utc().format("YYYY-MM-DD HH:mm"),
          },
        }
      );
    }
    setRawData2(result2);
    setRawData(result);

    statIsUpdated[statIndex] = true;
  }

  async function modifyData() {
    const data = {
      key: dataKey,
      type: telemetryType,
      number: messageNumber,
      start: startTime,
      end: endTime,
    };

    if (
      !localStorage.getItem("username")?.trim() ||
      !localStorage.getItem("password")?.trim()
    )
      return;

    setSearchParams(data);

    localStorage.setItem("graph", JSON.stringify(data));

    const response = rawData;
    const response2 = rawData2;

    let toTransform;

    //custom values whose variables are manually defined to display
    if (dataKey[latestStatChange] == "car_speed_mph_") {
      toTransform = response.map((dataPoint) => ({
        ...dataPoint,
        [dataKey[latestStatChange]]:
          dataPoint["motorRPM"] * 60 * WHEEL_RADIUS_MI,
      }));
    } else if (dataKey[latestStatChange] == "better_soc_") {
      toTransform = response.map((dataPoint) => ({
        ...dataPoint,
        [dataKey[latestStatChange]]: stateOfCharge(dataPoint["pack_sum_volt_"]),
      }));
    } else if (dataKey[latestStatChange] == "distance_traveled_") {
      toTransform = response.map((dataPoint) => ({
        ...dataPoint,
        [dataKey[latestStatChange]]: dataPoint["motorRPM"] * WHEEL_RADIUS_MI,
      }));
    } else if (dataKey[latestStatChange] == "motor_power_consumption_") {
      toTransform = multiplyDataValues(
        response,
        "battVoltage",
        response2,
        "motorCurrentPkAvg",
        dataKey
      );
    } else {
      toTransform = response;
    }

    let filteredResponseTemp;

    if (useTrim) {
      filteredResponseTemp = toTransform
        .map((dataPoint) => ({
          ...dataPoint,
          dateStamp: Math.floor(
            new Date(dataPoint["createdAt"]).getTime() / granularityMs
          ),
        }))
        .filter(
          (dataPoint) =>
            dataPoint[dataKey[latestStatChange]] >= minTrimVal &&
            dataPoint[dataKey[latestStatChange]] <= maxTrimVal
        );
    } else {
      filteredResponseTemp = toTransform.map((dataPoint) => ({
        ...dataPoint,
        dateStamp: Math.floor(
          new Date(dataPoint["createdAt"]).getTime() / granularityMs
        ),
      }));
    }

    const filteredResponse = filteredResponseTemp.reduce(
      (accumulator, currentValue) => {
        const duplicateDateStamp = accumulator.find(
          (item) => item.dateStamp === currentValue.dateStamp
        );
        if (!duplicateDateStamp) {
          accumulator.push(currentValue);
        }
        return accumulator;
      },
      []
    );

    let sum = 0;
    let numGreater = 0;
    let numLess = 0;
    let maxValue = -Infinity;
    let minValue = Infinity;

    let dataList: number[] = [];

    filteredResponse.forEach((dataPoint) => {
      //sums all data points for average calculation
      sum += dataPoint[dataKey[latestStatChange]];
      dataList.push(dataPoint[dataKey[latestStatChange]] as number);
    });

    let average = sum / filteredResponse.length;

    setRangeAverage(average);
    setRangeMax(maxValue);
    setRangeMin(minValue);
    setIntegral(integrateData(filteredResponse, dataKey));

    const requestedTimespan =
      new Date(endTime).getTime() - new Date(startTime).getTime();

    let startTimestamp;

    try {
      startTimestamp = new Date(
        filteredResponse[0]["dateStamp"] * granularityMs
      ).getTime();
    } catch {
      return;
    }

    const endTimestamp = new Date(
      filteredResponse[filteredResponse.length - 1]["dateStamp"] * granularityMs
    ).getTime();

    const givenTimespan = endTimestamp - startTimestamp;

    const toExtrapolate =
      shouldExtrapolate && showRegression
        ? requestedTimespan / givenTimespan
        : 1;

    const oldRegStartStamp =
      (new Date(regStartTime).getTime() + 3600000) / granularityMs;

    const oldRegEndStamp =
      (new Date(regEndTime).getTime() + 3600000) / granularityMs;

    const regStartStamp = Math.max(
      oldRegStartStamp,
      (startTimestamp + 3600000) / granularityMs
    );

    const regEndStamp = Math.min(
      oldRegEndStamp,
      (endTimestamp + 3600000) / granularityMs
    );

    let filteredRegResponse;

    if (useRegressionRange) {
      filteredRegResponse = filteredResponse.filter(
        (dataPoint) =>
          dataPoint["dateStamp"] >= regStartStamp - 3600000 / granularityMs &&
          dataPoint["dateStamp"] <= regEndStamp - 3600000 / granularityMs
      );
    } else {
      filteredRegResponse = filteredResponse;
    }

    const regXValues = filteredRegResponse.map(
      (dataPoint) => dataPoint["dateStamp"]
    );

    const regYValues = filteredRegResponse.map(
      (dataPoint) => dataPoint[dataKey[latestStatChange]]
    );

    const lastValue =
      filteredResponse[filteredResponse.length - 1][dataKey[latestStatChange]];

    const lastTimestamp =
      filteredResponse[filteredResponse.length - 1]["dateStamp"];

    let regression;
    let regStats;
    let regOffset;

    if (showRegression) {
      regression = new SimpleLinearRegression(regXValues, regYValues);

      regStats = regression.score(regXValues, regYValues);

      setRegressionRSquared(regStats["r2"]);

      regOffset = regression.predict(lastTimestamp) - lastValue;
    }

    const xValues = filteredResponse.map((dataPoint) => dataPoint["dateStamp"]);

    let scaledXAxis = Array.from(
      { length: xValues.length * toExtrapolate },
      (_, i) => i
    );

    const xValGap =
      filteredResponse[filteredResponse.length - 1]["dateStamp"] -
      xValues.length;

    let extendedRegression;

    if (showRegression) {
      extendedRegression = scaledXAxis.map((xValue) => {
        let obj = {
          dateStamp: filteredResponse[xValue]
            ? filteredResponse[xValue]["dateStamp"]
            : lastTimestamp + (xValue - filteredResponse.length),
          regression:
            regression.predict(xValue + xValGap) -
            (fancySOCEstimate ? regOffset : 0),
        };
        obj[dataKey[latestStatChange]] = filteredResponse[xValue]
          ? filteredResponse[xValue][dataKey[latestStatChange]]
          : null;
        return obj;
      });
    } else {
      extendedRegression = scaledXAxis.map((xValue) => {
        let obj = {
          dateStamp: filteredResponse[xValue]
            ? filteredResponse[xValue]["dateStamp"]
            : lastTimestamp + (xValue - filteredResponse.length),
        };
        obj[dataKey[latestStatChange]] = filteredResponse[xValue]
          ? filteredResponse[xValue][dataKey[latestStatChange]]
          : null;
        return obj;
      });
    }

    if (toExtrapolate > 1) {
      setDerivedRegressionEnd(
        extendedRegression[extendedRegression.length - 1]["regression"]
      );
    } else {
      setDerivedRegressionEnd(0);
    }

    let finalToGraph;

    if (useRegressionRange) {
      finalToGraph = extendedRegression.map((dataPoint) => ({
        ...dataPoint,
        createdAt: new Date(
          dataPoint["dateStamp"] * granularityMs
        ).toISOString(),
        regRange:
          dataPoint["dateStamp"] >= regStartStamp - 3600000 / granularityMs &&
          dataPoint["dateStamp"] <= regEndStamp - 3600000 / granularityMs
            ? 0
            : null,
      }));
    } else {
      finalToGraph = extendedRegression.map((dataPoint) => ({
        ...dataPoint,
        createdAt: new Date(
          dataPoint["dateStamp"] * granularityMs
        ).toISOString(),
      }));
    }

    setData(finalToGraph as any);
    console.log(data);
    console.log(dataKey);
    setIsPressed(false);
  }

  // if no searchParams, autpopulate with latest data
  if (!searchParams.get("start") && !searchParams.get("end")) {
    telemetry
      .getAll()
      .then((response) => {
        const latestResponse = new Date(response.bms.rx0.createdAt);

        const endAtTime = latestResponse
          .toISOString()
          .replace(/\.\d+/, "")
          .replace("Z", "");

        latestResponse.setUTCDate(latestResponse.getUTCDate() - 2);

        const startAtTime = latestResponse
          .toISOString()
          .replace(/\.\d+/, "")
          .replace("Z", "");

        setEndTime(endAtTime);
        setStartTime(startAtTime);
      })
      .catch((reason) => {
        if (reason.request.status == 402) {
          window.location.reload();
        }
      });
  }

  const handleSelectChange = (selectedOptions, actionMeta) => {
    const telemetryTypes: string[] = [];
    const messageNumbers: string[] = [];
    const dataKeys: string[] = [];

    selectedOptions.forEach((option) => {
      const [type, num, key] = option.value.split(".");
      telemetryTypes.push(type);
      messageNumbers.push(num);
      dataKeys.push(key);
    });

    if (actionMeta.option) {
      const changedIndex = selectedOptions.findIndex(
        (option) => option.value === actionMeta.option.value
      );
      setLatestStatChange(changedIndex);
    } else {
      if (selectedOptions.size - 2 > 0) {
        setLatestStatChange(selectedOptions.size - 2);
      } else {
        setLatestStatChange(0);
      }
    }

    setSelectionComplete(false);
    setTelemetryType(telemetryTypes);
    setMessageNumber(messageNumbers);
    setDataKey(dataKeys);
    setSelectedOption(selectedOptions);

    setTimeout(() => setSelectionComplete(true), 0);
  };

  const buildOptions = () => {
    let options: { value: string; label: string }[] = [];
    Object.keys(allShape).forEach((type) => {
      Object.keys(allShape[type].data).forEach((num) => {
        Object.keys(allShape[type].data[num]).forEach((key) => {
          const value = `${type}.${num}.${key}`;
          options.push({ value, label: value });
        });
      });
    });
    return options;
  };

  const handleRegRangeRadio = (option) => {
    setUseRegressionRange(option);
    setRegEndTime(endTime);
    setRegStartTime(startTime);
  };

  useEffect(() => {
    if (
      dataKey[latestStatChange] == "high_temp_" ||
      dataKey[latestStatChange] == "pack_sum_volt_" ||
      dataKey[latestStatChange] == "pack_soc_"
    ) {
      setUseTrim(true);
    } else if (dataKey[latestStatChange] == "better_soc_") {
      setUseTrim(true);
      setMaxTrimVal(99);
      setMinTrimVal(1);
    } else {
      setUseTrim(false);
    }
  }, [dataKey]);

  useEffect(() => {
    if (selectionComplete && autoUpdate) {
      fetchData(latestStatChange);
    }
  }, [
    telemetryType,
    messageNumber,
    dataKey,
    startTime,
    endTime,
    selectionComplete,
  ]);

  useEffect(() => {
    if (selectionComplete && autoUpdate) {
      modifyData();
    }
  }, [
    regEndTime,
    regStartTime,
    granularityMs,
    maxTrimVal,
    minTrimVal,
    fancySOCEstimate,
    useTrim,
    showRegression,
    shouldExtrapolate,
    selectionComplete,
  ]);

  useEffect(() => {
    modifyData();
  }, [rawData]);

  //HTML response to website
  return (
    <>
      <Row>
        <Col>
          <Form.Label>Select Statistics</Form.Label>
          <Select
            isMulti={true}
            value={selectedOption}
            onChange={handleSelectChange}
            options={buildOptions() as any}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {!autoUpdate && (
            <Button
              disabled={isPressed}
              onClick={() => {
                setIsPressed(true);
                for (let i = 0; i < statIsUpdated.length; i++) {
                  if (statIsUpdated[i]) {
                    fetchData(i);
                  }
                }
              }}
            >
              {isPressed ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <p>Go</p>
              )}
            </Button>
          )}
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
      {useRegressionRange && (
        <Row>
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
        </Row>
      )}
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
              value:
                allShape[telemetryType?.[0] as string]?.data?.[
                  messageNumber?.[0] as string
                ]?.[dataKey?.[0] as string]?.label,
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <Tooltip
            labelFormatter={(value) =>
              moment.utc(value).local().format("YYYY-MM-DD HH:mm:ss")
            }
          />
          <Legend />
          {dataKey.map((currDataKey) => (
            <Line
              type="monotone"
              key={currDataKey}
              dataKey={currDataKey}
              stroke={lineColors[dataKey.indexOf(currDataKey) % 6]}
              dot={false}
            />
          ))}
          {showRegression && (
            <Line
              type="monotone"
              dataKey="regression"
              stroke="#ff0000"
              dot={false}
            />
          )}
          {useRegressionRange && (
            <Line
              type="monotone"
              dataKey="regRange"
              stroke="#000000"
              dot={true}
            />
          )}
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
        {showRegression && (
          <Col>
            <div className="switch">
              <label>
                Regression Range
                <input
                  type="checkbox"
                  checked={useRegressionRange}
                  onChange={(event) =>
                    handleRegRangeRadio(event.target.checked)
                  }
                />
                <span className="lever"></span>
              </label>
            </div>
          </Col>
        )}
        {showRegression && (
          <Col>
            <div className="switch">
              <label>
                Full Timescale
                <input
                  type="checkbox"
                  checked={shouldExtrapolate}
                  onChange={(event) =>
                    setShouldExtrapolate(event.target.checked)
                  }
                />
                <span className="lever"></span>
              </label>
            </div>
          </Col>
        )}
        {showRegression && shouldExtrapolate && (
          <Col>
            <div className="switch">
              <label>
                Offset Regression
                <input
                  type="checkbox"
                  checked={fancySOCEstimate}
                  onChange={(event) =>
                    setFancySOCEstimate(event.target.checked)
                  }
                />
                <span className="lever"></span>
              </label>
            </div>
          </Col>
        )}
        <Col>
          <div className="switch">
            <label>
              Use Trim
              <input
                type="checkbox"
                checked={useTrim}
                onChange={() => setUseTrim(!useTrim)}
              />
              <span className="lever"></span>
            </label>
          </div>
        </Col>
        <Col>
          <div className="form-outline" style={{ width: "6rem" }}>
            <label className="form-label" htmlFor="typeNumber">
              Resolution (ms)
            </label>
            <input
              min="0"
              type="text"
              id="typeNumber"
              className="form-control"
              defaultValue={granularityMs}
              onBlur={(event) =>
                setGranularityMs(
                  parseInt((event.target as HTMLInputElement).value)
                )
              }
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
        {useTrim && (
          <Col>
            <div className="form-outline" style={{ width: "6rem" }}>
              <label className="form-label" htmlFor="typeNumber">
                Max Trim
              </label>
              <input
                min="0"
                type="text"
                id="typeNumber"
                className="form-control"
                defaultValue={maxTrimVal}
                onFocus={(event) => event.target.select()}
                onBlur={(event) =>
                  setMaxTrimVal(
                    parseInt((event.target as HTMLInputElement).value)
                  )
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    (event.target as HTMLInputElement).blur();
                  }
                }}
              />
            </div>
          </Col>
        )}
        {useTrim && (
          <Col>
            <div className="form-outline" style={{ width: "6rem" }}>
              <label className="form-label" htmlFor="typeNumber">
                Min Trim
              </label>
              <input
                min="0"
                type="text"
                id="typeNumber"
                className="form-control"
                defaultValue={minTrimVal}
                onBlur={(event) =>
                  setMinTrimVal(
                    parseInt((event.target as HTMLInputElement).value)
                  )
                }
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
        )}
        <Col>
          <div>
            <h6 className="form-label">
              Average: {formatNumber(Number(rangeAverage))}
            </h6>
          </div>
          <div>
            <h6 className="form-label">
              Maximum: {formatNumber(Number(rangeMax))}
            </h6>
          </div>
          <div>
            <h6 className="form-label">
              Minimum: {formatNumber(Number(rangeMin))}
            </h6>
          </div>
          <div>
            <h6 className="form-label">
              Integral: {formatNumber(Number(integral))}
            </h6>
          </div>
          {showRegression && derivedRegressionEnd != 0 && (
            <div>
              <h6 className="form-label">
                Reg. End: {formatNumber(Number(derivedRegressionEnd))}
              </h6>
            </div>
          )}
          {showRegression && (
            <div>
              <h6 className="form-label">
                R²: {formatNumber(Number(regressionRSquared))}
              </h6>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}

//make number even function?
function formatNumber(num) {
  return num % 1 > 0 ? num.toFixed(2) : num;
}

function multiplyDataValues(data1, dataKey1, data2, dataKey2, combinedKey) {
  let combinedData: any[] = [];

  let counter1 = 0;
  let counter2 = 0;

  while (true) {
    if (counter1 >= data1.length || counter2 >= data2.length) {
      break;
    } else if (
      data1[counter1].createdAt.getTime > data2[counter2].createdAt.getTime
    ) {
      counter2++;
    } else if (
      data1[counter1].createdAt.getTime < data2[counter2].createdAt.getTime
    ) {
      counter1++;
    } else if (
      data1[counter1].createdAt.getTime == data2[counter2].createdAt.getTime
    ) {
      combinedData.push(data1[counter1]);
      combinedData[combinedData.length - 1][combinedKey] =
        data1[counter1][dataKey1] * data2[counter2][dataKey2];
      counter1++;
      counter2++;
    }
  }
  return combinedData;
}

function integrateData(data, dataKey) {
  let integral = 0;
  for (let i = data.length - 1; i > 0; i--) {
    let midValue = (data[i][dataKey] + data[i - 1][dataKey]) / 2;
    let date1 = new Date(data[i - 1].createdAt);
    let date2 = new Date(data[i].createdAt);
    let changeX = date2.getTime() - date1.getTime();

    integral += (midValue * changeX) / 1000;
  }
  return integral;
}

export default Strategy;

//custom soc definition
export const stateOfCharge = (packVoltage: any) => {
  const voltage = packVoltage / 26;

  const datasheetSoc =
    voltage > 4.05
      ? 100
      : voltage > 3.2
      ? ((voltage - 3.2) * (100 - 9.091)) / (4.05 - 3.2) + 9.091
      : voltage > 3.1
      ? ((voltage - 3.1) * (9.091 - 1.818)) / (3.2 - 3.1) + 1.818
      : ((voltage - 2.7) * (1.818 - 0)) / (3.1 - 2.7);

  // left to allow for easy offsetting
  return datasheetSoc;
};
