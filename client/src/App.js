import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({heading}) => <img style={{ transform : `translate(-100px, -100px) rotate(${heading}deg)` }} src="./car.png"></img>;
 
class SimpleMap extends Component {
  state =
  {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    heading: 15,
    zoom: 11
  };

  componentDidMount()
  {
    
    let map  = this
    setInterval(() =>
    {
      var lat = this.state.center.lat;
      var lng = this.state.center.lng;
      var heading = this.state.heading;
      lat += 0.001;
      lng += 0.001;
      heading += 10;

      this.setState({
        center:
        {
          lat : lat, 
          lng : lng
        },
        heading : heading
      })
    }, 1000)
  }
 
  render() {
    var {center, zoom, heading } = this.state
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
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
 
export default SimpleMap;
