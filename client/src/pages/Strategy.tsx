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
import {
  getAllModuleItem,
  getAllModule,
  getAll,
  WHEEL_RADIUS_MI,
} from "../shared/sdk/telemetry";
import { bmsShape } from "../component/BMS";
import { mitsubaShape } from "../component/Mitsuba";
import { mpptShape } from "../component/MPPT";
import { calculatedShape } from "../component/Calculated";
import * as moment from "moment";
import { SimpleLinearRegression } from "ml-regression";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import * as telemetry from "../shared/sdk/telemetry";

function Strategy() {
  const [data, setData] = useState<any[]>([]);
  const [dataPointCount, setDataPointCount] = useState(1000);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(0);
  const [mean, setMean] = useState(0);

  const [key1, setKey1] = useState("") as any;
  const [key2, setKey2] = useState("") as any;
  const [key3, setKey3] = useState("") as any;

  const [dictionary, setDictionary] = useState([] as any);
  const [selectOptions2, setSelectOptions2] = useState([] as any);
  const [selectOptions3, setSelectOptions3] = useState([] as any);

  async function fetchData() {
    getAllModuleItem(key1.value as any, key2.value, key3.value, {
      createdAt: {
        $gte: "2023-06-30 06:00",
        $lte: "2024-07-2 18:00",
      },
    }).then((initPull) => {
      let trimData;

      if (initPull.length <= dataPointCount) {
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
  }, [key3]);

  getAll().then((output) => {
    setDictionary(output);
  });

  const selectOptions1 = () => {
    let options: { value: string; label: string }[] = [];

    Object.keys(dictionary).forEach((key) => {
      options.push({ value: key, label: key });
    });
    return options;
  };

  const handleSelectChange1 = (option1) => {
    if (key1 != option1) {
      setKey2("");
      setKey3("");
      setKey1(option1);

      let options: { value: string; label: string }[] = [];

      Object.keys(dictionary[option1.value]).forEach((key) => {
        options.push({ value: key, label: key });
      });

      setSelectOptions2(options);
    }
  };

  const handleSelectChange2 = (option2) => {
    if (key2 != option2) {
      setKey3("");
      setKey2(option2);

      let options: { value: string; label: string }[] = [];

      Object.keys(dictionary[key1["value"]][option2.value]).forEach((key) => {
        options.push({ value: key, label: key });
      });

      setSelectOptions3(options);
    }
  };

  const handleSelectChange3 = (option3) => {
    setKey3(option3);
  };

  return (
    <div>
      <Select
        value={key1}
        options={selectOptions1() as any}
        onChange={handleSelectChange1}
      ></Select>
      <br></br>
      {key1 && (
        <Select
          value={key2}
          options={selectOptions2 as any}
          onChange={handleSelectChange2}
        ></Select>
      )}
      <br></br>
      {key2 && (
        <Select
          value={key3}
          options={selectOptions3 as any}
          onChange={handleSelectChange3}
        ></Select>
      )}

      <br></br>
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
            tickFormatter={(value) => moment.utc(value).local().format("HH:mm")}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={key3.value}
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
  );
}

export default Strategy;