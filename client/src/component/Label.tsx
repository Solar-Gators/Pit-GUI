import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

interface Props {
  svgSrc?: string;
  label: string;
  value: any;
  booleanError?: boolean;
  unit?: string;
}

function Label({ svgSrc, label, value, unit, booleanError }: Props) {
  let finalValue = value;
  let rowColor = "";
  let fontColor = "black";
  if (typeof value === "boolean") {
    finalValue = value ? "Yes" : "No";

    if (booleanError) {
      rowColor = value ? "red" : "";
      fontColor = value ? "white" : fontColor;
    }
  }
  // Default fix to 1 decimal point for all floats
  else if (
    !isNaN(Number(finalValue)) &&
    String(finalValue).indexOf(".") != -1
  ) {
    finalValue = Number(finalValue).toFixed(1);
  }

  return (
    <Col sm={svgSrc ? 4 : 2}>
      <Row style={{ backgroundColor: rowColor }}>
        {svgSrc && (
          <Col sm={3}>
            <object data={svgSrc} height="65px" type="image/svg+xml"></object>
          </Col>
        )}

        <Col sm={svgSrc ? 9 : 12} style={{ color: fontColor }}>
          <h5 style={{ marginTop: "0px" }}>{label}</h5>
          <h4 style={{ marginTop: "0px" }}>
            {finalValue} {unit}
          </h4>
        </Col>
      </Row>
    </Col>
  );
}

export default Label;
