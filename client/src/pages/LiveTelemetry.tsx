import React, { useEffect } from "react";
import * as telemetry from "../shared/sdk/telemetry";

function LiveTelemetry() {
  const [data, setData] = React.useState<telemetry.DataResponse>();

  if (
    !localStorage.getItem("username")?.trim() ||
    !localStorage.getItem("password")?.trim()
  )
    return;

  useEffect(() => {
    telemetry
      .getAll()
      .then((response) => {
        setData(response);
        //Calculate speed
      })
      .catch((reason) => {
        if (reason.request.status == 403) {
          localStorage.setItem("username", "");
          localStorage.setItem("password", "");
          window.location.reload();
        }
      });
    console.log(data)

  }, []);

  useEffect(() => {
    console.log(data)
  }, [data])
  return (<p>HI</p>);
}

export default LiveTelemetry;
