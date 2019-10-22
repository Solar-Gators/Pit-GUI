import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({heading}) => <img style={{ transform : `translate(-25px, -25px) rotate(${heading}deg)` }} width="50px" src="./car.png"></img>;
 
class Map extends Component {
 
  render() {
    var {center, zoom, heading } = this.props
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '40vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAXbhJRwjC-e24IwENYq2vaB0C3WgVuBGw' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <AnyReactComponent
            lat={center.lat}
            lng={center.lng}
            heading={heading}
          />
          
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Map;
