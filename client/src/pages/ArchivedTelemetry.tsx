import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { parse } from "json2csv";
import { bmsShape } from "../component/BMS";
import { mitsubaShape } from "../component/Mitsuba";
import { mpptShape } from "../component/MPPT";

import { CanData, countOne, getAllModule } from "../shared/sdk/telemetry";

interface Filters {
  telemetryType: keyof CanData;
  message: string;
  label?: string;
  customWhere?: Object;
}

export default function ArchivedTelemetry() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [countData, setCountData] = useState({});
  const [filters, setFilters] = useState<Filters[]>([]);

  useEffect(() => {
    if (!!startDate) {
      const newFilters: Filters[] = [
        ...Object.keys(mitsubaShape.data).map<Filters>((message) => ({
          telemetryType: "mitsuba",
          message,
        })),
        ...Object.keys(bmsShape.data).map<Filters>((message) => ({
          telemetryType: "bms",
          message,
        })),
      ];
      for (let mpptNumber = 0; mpptNumber < 3; mpptNumber++) {
        newFilters.push(
          ...Object.keys(mpptShape.data).map<Filters>((message) => ({
            label: "mmpt #" + mpptNumber + 1,
            telemetryType: "mppt",
            message,
            customWhere: { mpptNumber: mpptNumber + 1 },
          })),
        );
      }
      setFilters(newFilters);
      newFilters
        .reduce(async (acc, { telemetryType, message, customWhere, label }) => {
          const count = await countOne(`${telemetryType}.${message}` as any, {
            ...customWhere,
            createdAt: {
              $gte: startDate,
              ...(endDate && { $lte: endDate }),
            },
          });
          const newAcc = await acc;
          if (!newAcc[label || telemetryType]) {
            newAcc[label || telemetryType] = {};
          }
          newAcc[label || telemetryType][message] = count;
          return newAcc;
        }, Promise.resolve({}))
        .then(setCountData);
    }
  }, [startDate, endDate]);

  return (
    <>
      <Row>
        <h2>Download Data</h2>
      </Row>
      <Row>
        <Col>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setStartDate(e.currentTarget.value)}
          />
        </Col>
        <Col>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            disabled={!startDate}
            min={startDate}
            onChange={(e) => setEndDate(e.currentTarget.value)}
          />
        </Col>
      </Row>
      <Row>
        {Object.keys(countData).map((telemetryType) => {
          return (
            <>
              <h3>{telemetryType}</h3>
              <Table>
                <thead>
                  <tr>
                    <th>Message Name</th>
                    <th># of Data Points</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(countData[telemetryType]).map((key) => {
                    return (
                      <tr>
                        <td>{key}</td>
                        <td>{countData[telemetryType][key]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </>
          );
        })}
      </Row>
      <Row>
        <Button
          disabled={!startDate}
          onClick={async () => {
            filters.forEach(
              async ({ telemetryType, message, customWhere, label }) => {
                const module = await getAllModule(
                  telemetryType,
                  message as never,
                  {
                    ...customWhere,
                    createdAt: {
                      $gte: startDate,
                      ...(endDate && { $lte: endDate }),
                    },
                  },
                );
                const url = window.URL.createObjectURL(
                  new Blob([parse(module)]),
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute(
                  "download",
                  `${label || telemetryType} ${message} (${startDate}${
                    endDate && " - " + endDate
                  }).csv`,
                );

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.remove();
              },
            );
          }}
        >
          Download CSV
        </Button>
      </Row>
    </>
  );
}
