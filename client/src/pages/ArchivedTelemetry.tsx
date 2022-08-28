import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { parse } from 'json2csv';
import { bmsShape } from '../component/BMS';
import { mitsubaShape } from '../component/Mitsuba';
import { countOne, getAllModule } from '../shared/sdk/telemetry';

export default function ArchivedTelemetry(){
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [countData, setCountData] = useState({})

    useEffect(() => {
        if (!!startDate) {
            const mitsubaMessages = Object.keys(mitsubaShape.data).map((d) => ["mitsuba", d])
            const bmsMessages = Object.keys(bmsShape.data).map((d) => ["bms", d])
            mitsubaMessages.concat(bmsMessages).reduce(async (acc, [telemetryType, message]) => {

                const count = await countOne(`${telemetryType}.${message}` as any, {
                    createdAt: {
                        $gte: startDate,
                        ...( endDate && { $lte: endDate })
                    }
                })
                const newAcc = await acc
                if (!newAcc[telemetryType]) {
                    newAcc[telemetryType] = {}
                }
                newAcc[telemetryType][message] = count
                return newAcc
            }, Promise.resolve({ }))
            .then(setCountData)
        }
    }, [startDate, endDate])


    return (<>
        <Row>
            <h2>Download Data</h2>
        </Row>
        <Row>
            <Col>
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" onChange={(e) => setStartDate(e.currentTarget.value)} />
            </Col>
            <Col>
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" disabled={!startDate} min={startDate} onChange={(e) => setEndDate(e.currentTarget.value)} />
            </Col>
        </Row>
        <Row>
            {
                Object.keys(countData).map((telemetryType) => {
                    return <>
                        <h3>{telemetryType}</h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Message Name</th>
                                    <th># of Data Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(countData[telemetryType]).map((key) => {
                                    return (
                                        <tr>
                                            <td>{key}</td>
                                            <td>{countData[telemetryType][key]}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </>
                })
            }
        </Row>
        <Row>
            <Button
                disabled={!startDate}
                onClick={async () => {
                    Object.keys(countData).forEach((telemetryType: any) => {
                        {Object.keys(countData[telemetryType]).forEach(async (message: any) => {
                            const module = await getAllModule(telemetryType, message)
                            const url = window.URL.createObjectURL(
                                new Blob([parse(module)]),
                            );
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute(
                            'download',
                            `${telemetryType} ${message} (${startDate}${endDate && ' - ' + endDate}).csv`,
                            );

                            // Append to html link element page
                            document.body.appendChild(link);

                            // Start download
                            link.click();

                            // Clean up and remove the link
                            link.remove()
                        })}
                    })
                }}
            >
                Download CSV
            </Button>
        </Row>
    </>)
}
