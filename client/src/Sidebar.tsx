import React, {Component} from 'react';
import Nav from "react-bootstrap/Nav"

class Sidebar extends Component {
    render() {
        return (
            <Nav className="col-md-12 d-none d-md-block bg-light sidebar p-0"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <img className="m-auto d-block" alt="logo" width="160px" height="100px" src="./logo.png" />
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <Nav.Link className="sidebar-item active">Live</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="sidebar-item">Analysis</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="sidebar-item">Raw Graphs</Nav.Link>
                </Nav.Item>
            </Nav>
        );
    }
}

export default Sidebar;