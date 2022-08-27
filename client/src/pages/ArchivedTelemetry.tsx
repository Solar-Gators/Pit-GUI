import React from 'react'
import { Row, Col, Form } from "react-bootstrap";


export default function ArchivedTelemetry(){
    return (<>
        <Row>
            <Col>
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" />
            </Col>
            <Col>
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" />
            </Col>
        </Row>
        <Row>
            {/* Show all messages and number of rows between those ranges */}
        </Row>
        <Row>
            {/* Download button */}
        </Row>
    </>)
}
