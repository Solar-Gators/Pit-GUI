import React, { useEffect, useState } from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

const SETTINGS_CONFIG = {
  autoUpdate: {
    key: "toggleAutoUpdate",
    label: "Graph Auto Update",
    tooltipText:
      "When enabled, the Strategy graph will update automatically when changing a parameter. When disabled, the Strategy graph will only update when the Go button is pressed.",
    defaultValue: true,
  },

  multiAxis: {
    key: "toggleMultiAxis",
    label: "Multiple Axis",
    tooltipText:
      "When enabled, the Strategy graph will render a new y-axis for each statistic. When disabled, the Strategy graph will render all statistics on the same y-axis.",
    defaultValue: true,
  },
};

function SettingToggle({ config, value, onChange }) {
  const renderTooltip = (props) => (
    <Tooltip id={`${config.key}-tooltip`} {...props}>
      {config.tooltipText}
    </Tooltip>
  );

  return (
    <div className="switch d-flex align-items-center">
      <label className="me-2">
        {config.label}
        <input type="checkbox" checked={value} onChange={onChange} />
        <span className="lever"></span>
      </label>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <span className="info-icon">
          <FaInfoCircle className="text-secondary" />
        </span>
      </OverlayTrigger>
    </div>
  );
}

function Settings() {
  const [settings, setSettings] = useState(() => {
    return Object.keys(SETTINGS_CONFIG).reduce((acc, setting) => {
      const savedValue = localStorage.getItem(SETTINGS_CONFIG[setting].key);
      acc[setting] =
        savedValue !== null
          ? JSON.parse(savedValue)
          : SETTINGS_CONFIG[setting].defaultValue;
      return acc;
    }, {});
  });

  useEffect(() => {
    Object.keys(settings).forEach((setting) => {
      localStorage.setItem(
        SETTINGS_CONFIG[setting].key,
        JSON.stringify(settings[setting]),
      );
    });
  }, [settings]);

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <>
      <Row>
        <Col>
          {Object.keys(SETTINGS_CONFIG).map((setting) => (
            <SettingToggle
              key={setting}
              config={SETTINGS_CONFIG[setting]}
              value={settings[setting]}
              onChange={() => handleToggle(setting)}
            />
          ))}
        </Col>
      </Row>

      <style>
        {`
          .info-icon {
            cursor: pointer;
            display: inline-flex;
            align-items: center;
          }
          .switch {
            margin: 1rem 0;
          }
          .tooltip-inner {
            background-color: #f8f9fa;
            color: #212529;
            border: 1px solid #dee2e6;
          }
          .tooltip.bs-tooltip-end .tooltip-arrow::before {
            border-right-color: #dee2e6;
          }
        `}
      </style>
    </>
  );
}

export default Settings;
