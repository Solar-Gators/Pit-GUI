import React, {Component} from 'react';
import { Button, Card, Row, Col, Route } from 'react-bootstrap';

class Label extends Component
{
    render()
    {
        var {svgSrc, label, value} = this.props;
        return (
        <Col sm={svgSrc ? 4 : 2}>
            <Row>
                {svgSrc ? 
                <Col sm={3}>
                    <object data={svgSrc} height="65px" type="image/svg+xml"></object>
                </Col>
                : ""}

                <Col sm={svgSrc ? 9 : 12}>
                    <h5 style={{marginTop: "0px"}}>{label}</h5>
                    <h4 style={{marginTop: "0px"}}>{value}</h4>
                </Col>
            </Row>
        </Col>);
    }
}

export default Label;
