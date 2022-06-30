import React, {Component} from 'react';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css/dist/js/materialize.min.js";


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
                        <a href="/">Live</a>
                    </li>
                    <li>
                        <a href="/analysis">Analysis</a>
                    </li>
                    <li>
                        <a>Raw Graphs</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Sidebar;