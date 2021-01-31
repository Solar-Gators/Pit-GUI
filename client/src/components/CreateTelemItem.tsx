import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
class CreateTelemItem extends React.Component {
  state = {
    modal: false,
    name: "",
    desc: "",
    decode: "",
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.toggle();
  };
  render() {
    return (
      <div>
        <Button
          color="success"
          style={{
            marginBottom: "1rem",
            marginLeft: "1rem",
          }}
          onClick={this.toggle}
        >
          Add Telemetry Item
        </Button>

        <Modal show={this.state.modal} onHide={this.toggle}>
          <Modal.Header closeButton>Add Telemetry Item</Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Telemetry Name"
                  onChange={this.onChange}
                />
                <Form.Text className="text-muted">
                  Be specific here (Ex. Proton 1)
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  type="textarea"
                  name="desc"
                  id="description"
                  placeholder="Description"
                  onChange={this.onChange}
                />
                <Form.Text className="text-muted">
                  Whats the purpose of the hardware?
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mt-2">Decode Logic</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  type="textarea"
                  name="decode"
                  id="decode"
                  placeholder="console.log('test')"
                  onChange={this.onChange}
                />
                <Form.Text className="text-muted">
                  How do we decode the properties of this hardware?
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Save
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
export default CreateTelemItem;
