import React, { Component } from "react";
import "materialize-css"; // It installs the JS asset only
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import { Button } from "react-materialize";
import { socket } from "./service/socket";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "ClickMe" };
  }
  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
      edge: "left",
    });
    socket.on("connect_error", (err) => {
      console.log(err);
      console.log("Client error.");
    });
    socket.on("connect", function () {
      console.log("connected!");
      socket.emit("greet", { message: "Hello Mr.Server!" });
    });

    socket.on("respond", function (data) {
      console.log(data);
    });
    socket.on("clicked", (msg) => {
      this.setState({
        text: msg,
      });
    });
  }
  componentWillUnmount() {
    socket.disconnect();
  }
  onClick = () => {
    socket.emit("clicked", "Clicked");
    this.setState({
      text: "Clicked",
    });
  };
  render() {
    return (
      <div>
        <ul
          id="slide-out"
          style={{ "font-size": "15px" }}
          className="sidenav sidenav-fixed"
        >
          <li style={{ textAlign: "center" }}>
            <img width="160px" height="100px" src="./logo.png" />
          </li>
          <li class="bold active">
            <a href="/">Live</a>
          </li>
          <li>
            <a href="/analysis">Analysis</a>
          </li>
          <li>
            <a>Raw Graphs</a>
          </li>
          <Button
            large
            node="a"
            style={{
              marginRight: "5px",
            }}
            waves="light"
            onClick={this.onClick}
          >
            {this.state.text}
          </Button>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
