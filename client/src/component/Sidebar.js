import React, { useEffect } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  useEffect(() => {
    var elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
      edge: "left",
    });
  }, []);

  const location = useLocation();

  return (
    <div>
      <button
        style={{
          backgroundColor: "transparent",
          fontSize: "20px",
          marginLeft: "20px",
          marginTop: "20px",
          border: "0px",
        }}
        data-target="slide-out"
        className="sidenav-trigger"
      >
        <span className="fa fa-bars" />
      </button>
      <ul
        id="slide-out"
        style={{ fontSize: "15px" }}
        className="sidenav sidenav-fixed"
      >
        <li style={{ textAlign: "center" }}>
          <img width="160px" height="100px" src="./logo.png" />
        </li>
        <li className={location.pathname == "/" ? "bold active" : ""}>
          <Link to="/">Live</Link>
        </li>
        <li className={location.pathname == "/strategy" ? "bold active" : ""}>
          <Link to="/strategy">Strategy</Link>
        </li>
        <li className={location.pathname == "/history" ? "bold active" : ""}>
          <Link to="/history">Data Export</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
