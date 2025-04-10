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
import { validateHeaderValue } from "http";

function Strategy() {
  const [data, setData] = useState<any[]>([]);
  const [fullData, setFullData] = useState<telemetry.DataResponse>();
  const [dataPointCount, setDataPointCount] = useState(1000);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(0);
  const [mean, setMean] = useState(0);

  async function fetchData() {
    getAllModuleItem("bms" as any, "rx0", "pack_sum_volt_", {
      createdAt: {
        $gte: "2023-06-30 06:00",
        $lte: "2024-07-2 18:00",
      },
    }).then((initPull) => {
      let trimData;

      if (initPull.length < dataPointCount) {
        trimData = initPull;
      } else {
        trimData = initPull.filter(
          (_, index) =>
            index % Math.round(initPull.length / dataPointCount) == 0
        ) as any[];
      }
      setData(trimData);

      let min = trimData[0].pack_sum_volt_;
      let max = trimData[0].pack_sum_volt_;
      let total = 0;
      for (let i = 0; i < trimData.length; i++) {
        if (trimData[i].pack_sum_volt_ < min) {
          min = trimData[i].pack_sum_volt_;
        }
        if (trimData[i].pack_sum_volt_ > max) {
          max = trimData[i].pack_sum_volt_;
        }
        total += trimData[i].pack_sum_volt_;
      }
      setMean(total / trimData.length);
      setMinimum(min);
      setMaximum(max);
    });
  }

  useEffect(() => {
    fetchData();

    telemetry.getAll().then((response) => {
      setFullData(response);
    });
  }, []);
  const [choice1, setChoice1] = useState<string | null>(null);
  const [choice2, setChoice2] = useState<string | null>(null);
  const [choice3, setChoice3] = useState<string | null>(null);
  const [options1, setOptions1] = useState<any>(null);
  const [options2, setOptions2] = useState<any>(null);
  const [options3, setOptions3] = useState<any>(null);
  console.log(fullData);
  function update(choice, options, setFn) {
    let fatDict;

    if (options == null) return;

    if (choice == null) {
      fatDict = options;
    } else {
      if (choice == undefined) return;
      // iterate through options
      // check if current element has label == choice
      // for the one that does, set fatDict = to the current_element.value
      for (let i = 0; i < options.length; i++) {
        if (options[i].label === choice) {
          fatDict = options[i].value;
        }
      }
    }
    let newOptions: any = [];
    Object.entries(fatDict).map(([key, dictValue]) => {
      let element = { label: key, value: dictValue };
      console.log(element);

      newOptions.push(element);
    });

    setFn(newOptions);
  }
  // First useEffect --> null is passed as choice (b/c it's the first), then fullData is passed as options, then setOptions1 is passed to change options for the
  useEffect(() => {
    update(null, fullData, setOptions1);
  }, [fullData]);
  useEffect(() => {
    update(choice1, options1, setOptions2);
  }, [choice1]);
  useEffect(() => {
    update(choice2, options2, setOptions3);
  }, [choice2]);

  return fullData == undefined ? (
    <div>Loading...</div>
  ) : (
    <>
      <Select
        options={options1}
        onChange={(choice_select1) => setChoice1(choice_select1?.label)}
      />
      <Select
        options={options2}
        onChange={(choice_select2) => setChoice2(choice_select2?.label)}
      />
      <Select
        options={options3}
        onChange={(choice_select3) => setChoice3(choice_select3?.label)}
      />
      <div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
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
              tickFormatter={(value) =>
                moment.utc(value).local().format("HH:mm")
              }
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pack_sum_volt_"
              stroke="#8884d8"
              data={data}
              activeDot={{ r: 3 }}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div>
          <h6 className="form-label">Maximum: {maximum} </h6>
        </div>
        <div>
          <h6 className="form-label">Minimum: {minimum} </h6>
        </div>
        <div>
          <h6 className="form-label">Average: {mean}</h6>
        </div>
      </div>
    </>
  );
}
export default Strategy;
