import React, { Component } from 'react';
import Map from './Map'

class App extends Component {
  state =
  {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    heading: 15,
    zoom: 11
  };

  constructor(props)
  {
    super(props)
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

  render()
  {
    var {center, heading, zoom} = this.state
    return (
      <Map center={center} heading={heading} zoom={zoom}/>
    );
  }
}
 
export default App;
