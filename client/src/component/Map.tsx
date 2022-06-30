import React from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({heading}) => <img style={{ transform : `translate(-25px, -25px) rotate(${heading}deg)` }} width="50px" src="./car.png"></img>;

function Map({center, zoom, heading }: {
  center: {
    lat: number
    lng: number
  }
  zoom: number
  heading: number
}) {
  console.log( center)
  return (
      // Important! Always set the container height explicitly
      <div style={{ height: '40vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
          defaultCenter={center}
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
