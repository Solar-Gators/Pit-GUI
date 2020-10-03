import React, {Component} from 'react';
import {Nav} from "react-bootstrap";

class Sidebar extends Component {
    componentDidMount() {
        var elem = document.querySelector(".sidenav");
        // M.Sidenav.init(elem, {
        //     edge: "left"
        // });
    }

    render() {
        return (
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar pt-0"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <img className="m-auto d-block" width="160px" height="100px" src="./logo.png" />
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Live</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Analysis</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Raw Graphs</Nav.Link>
                </Nav.Item>
            </Nav>
        );
    }
}

export default Sidebar;