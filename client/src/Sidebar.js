import React, {Component} from 'react';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css/dist/js/materialize.min.js";
import {Link} from "react-router-dom";


class Sidebar extends Component {
    componentDidMount() {
        var elem = document.querySelector(".sidenav");
        M.Sidenav.init(elem, {
            edge: "left"
        });
    }

    render() {
        return (
            <div>
                <ul id="slide-out" style={{"font-size": "15px"}} className="sidenav sidenav-fixed">
                    <li style={{textAlign: "center"}}>
                        <img width="160px" height="100px" src="./logo.png" />
                    </li>
                    <li class="bold active">
                        <Link to="/">Live</Link>
                    </li>
                    <li>
                        <Link to="/analysis">Analysis</Link>
                    </li>
                    <li>
                        <Link to="/raw-graphs">Raw Graphs</Link>
                    </li>
                    <li>
                        <Link to="/history">History</Link>
                    </li>
                </ul>
            </div>
        );
                    }
}

export default Sidebar;