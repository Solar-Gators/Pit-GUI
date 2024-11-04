import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

function Settings() {
  const [toggleAuto, setToggleAuto] = useState(() => {
    const savedToggleAuto = localStorage.getItem("toggleAutoUpdate");
    return savedToggleAuto ? JSON.parse(savedToggleAuto) : null;
  });

  useEffect(() => {
    localStorage.setItem("toggleAutoUpdate", JSON.stringify(toggleAuto));
  }, [toggleAuto]);

  return (
    <>
      <Row>
        <Col>
          <div className="switch">
            <label>
              Auto Update
              <input
                type="checkbox"
                checked={toggleAuto}
                onChange={() => setToggleAuto(!toggleAuto)}
              />
              <span className="lever"></span>
            </label>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Settings;
