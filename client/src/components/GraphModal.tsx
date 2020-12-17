import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
const instances = [
  {
    _id: "1",
    name: "Orion2",
    data: [
      { label: "Low Cell", value: 10 },
      { label: "High Cell", value: 10 },
      { label: "Avg Temp", value: 10 },
      { label: "High Temp", value: 10 },
      { label: "Current", value: 10 },
    ],
  },
  {
    _id: "2",
    name: "MPPT",
    data: [
      { label: "Voltage In", value: 10 },
      { label: "Voltage Out", value: 10 },
      { label: "Current Out", value: 10 },
      { label: "Temperature", value: 10 },
    ],
  },
  {
    _id: "3",
    name: "Mitsuba",
    data: [
      { label: "RPM", value: 10 },
      { label: "Fet Temp", value: 10 },
      { label: "Avg Temp", value: 10 },
      { label: "High Temp", value: 10 },
      { label: "Current", value: 10 },
    ],
  },
];
export default function GraphModal(createGraph) {
  const [show, setShow] = useState(false);
  const [selectedInstances, setSelectedInstances] = useState([]);
  
  const handleClose = () => {
    setSelectedInstances([]);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleAdd = (list, item) => {
    setSelectedInstances([...selectedInstances, item]);
  };
  const handleRemove = (list, item) => {
    setSelectedInstances([...list]);
  };
  const handleAddData = (list, item) => {
    console.log(item);
  };
  const handleRemoveData = (list, item) => {
    console.log(item);
  };
  const handleCreate = () => {
    console.log(selectedInstances);
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow} >
        Create new graph
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Graph</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="graph-name">
              <Form.Label>Graph Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Graph Name" />
            </Form.Group>
            <Form.Group controlId="graph-type">
              <Form.Label>Graph Type Select</Form.Label>
              <Form.Control as="select">
                <option>Line Graph</option>
                <option>Scatter Plot</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="instance">
              <Form.Label>Instance Select</Form.Label>
              <Multiselect
                options={instances}
                displayValue="name"
                avoidHighlightFirstOption={true}
                onSelect={handleAdd}
                onRemove={handleRemove}
              />
            </Form.Group>
            {selectedInstances.map(({ _id, name, data }) => (
              <Form.Group controlId="data" key={_id}>
                <Form.Label>{name}</Form.Label>
                <Multiselect
                  options={data}
                  displayValue="label"
                  avoidHighlightFirstOption={true}
                  onSelect={handleAddData}
                  onRemove={handleRemoveData}
                />
              </Form.Group>
            ))}
            <Button onClick={handleCreate} color='primary'>Create Graph</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
