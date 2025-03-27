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

function Strategy() {
  const [data, setData] = useState<any[]>([]);

  async function fetchData() {
    let initPull = getAllModuleItem("bms" as any, "rx0", "pack_sum_volt_", {
      createdAt: {
        $gte: "2023-06-30 06:00",
        $lte: "2024-07-2 18:00",
      },
    }).then((initPull) => {
      let trimData = initPull.filter((_, index) => index % 55 == 0) as any[];

      console.log(trimData);
      setData(trimData);
    });
  }

  useEffect(() => {
    if (data.length == 0) {
      fetchData();
    }
  }, [data]);

  return (
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
            tickFormatter={(value) => moment.utc(value).local().format("HH:mm")}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pack_sum_volt_"
            stroke="#8884d8"
            data={data}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div>
        <h6 className="form-label">Maximum:</h6>
      </div>
      <div>
        <h6 className="form-label">Minimum:</h6>
      </div>
      <div>
        <h6 className="form-label">Average:</h6>
      </div>
    </div>
  );
}

export default Strategy;