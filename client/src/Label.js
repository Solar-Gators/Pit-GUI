import React, {Component} from 'react';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import { Button, Card, Row, Col, Route } from 'react-materialize';

class Label extends Component
{
    render()
    {
        var {svgSrc, label, value} = this.props;
        return (
        <Col s={4}>
            <Row>
                <Col s={3}>
                    <object data={svgSrc} height="65px" type="image/svg+xml"></object>
                </Col>

                <Col s={9}>
                    <h5 style={{marginTop: "0px"}}>{label}</h5>
                    <h4 style={{marginTop: "0px"}}>{value}</h4>
                </Col>
            </Row>
        </Col>);
    }
}

export default Label;
