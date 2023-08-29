import React from "react";
import GoogleMapReact from "google-map-react";
import * as telemetry from "../shared/sdk/telemetry";
import NoData from "./NoData";

interface Props {
  gps: telemetry.DataResponse["gps"];
  zoom: number;
}

function Map({ zoom, gps }: Props) {
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "40vh", width: "400px" }}>
      {!gps ? (
        <NoData />
      ) : (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
          defaultCenter={{
            lat: parseFloat(gps.latitude),
            lng: parseFloat(gps.longitude),
          }}
          defaultZoom={zoom}
        >
          <CarIcon heading={gps.heading} />
        </GoogleMapReact>
      )}
    </div>
  );
}

const CarIcon = ({ heading }) => (
  <img
    style={{ transform: `translate(-25px, -25px) rotate(${heading}deg)` }}
    width="50px"
    src="./car.png"
  ></img>
);

export default Map;
