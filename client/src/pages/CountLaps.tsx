import React, { useEffect, useState } from "react";
import { createModuleItem, getMostRecent } from "../shared/sdk/telemetry";

function CountLaps() {
  const [lap, setLap] = useState(null);

  const getLap = () => {
    getMostRecent("laps" as any, "rx0").then((response: any) => {
      setLap(response["lap"]);
    });
  };

  useEffect(() => {
    getLap();
  }, []);

  return (
    <>
      Current Lap: {lap || 0} <br />
      <button
        onClick={async () => {
          const r = await getMostRecent("laps" as any, "rx0");
          await createModuleItem("laps" as any, "rx0", {
            lap: (r?.["lap"] || 0) + 1,
          } as any);
          await getLap();
        }}
      >
        Increment Lap
      </button>
    </>
  );
}

export default CountLaps;
