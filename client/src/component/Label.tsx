import React, {Component} from 'react';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import { Row, Col } from 'react-bootstrap';

interface Props {
    svgSrc?: string
    label: string
    value: any
    unit?: string
}

function Label({svgSrc, label, value, unit}: Props) {
    return (
    <Col sm={svgSrc ? 4 : 2}>
        <Row>
            {svgSrc &&
                <Col sm={3}>
                    <object data={svgSrc} height="65px" type="image/svg+xml"></object>
                </Col>
            }

            <Col sm={svgSrc ? 9 : 12}>
                <h5 style={{marginTop: "0px"}}>{label}</h5>
                <h4 style={{marginTop: "0px"}}>{
                typeof value !== "boolean" ? value
                : value ? "Yes" : "No"
                } {unit}</h4>
            </Col>
        </Row>
    </Col>);
}

export default Label;
