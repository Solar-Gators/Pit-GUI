import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({heading}) => <img style={{ transform : `translate(-25px, -25px) rotate(${heading}deg)` }} width="50px" src="./car.png"></img>;

function Map({center, zoom, heading }) {
  return (
      // Important! Always set the container height explicitly
      <div style={{ height: '40vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
          center={center}
          defaultZoom={zoom}
        >
          <AnyReactComponent
            heading={heading}
          />
        </GoogleMapReact>
      </div>
  );
}

export default Map;
