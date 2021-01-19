import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'
import Modal from 'react-bootstrap/Modal'
import { FaPowerOff } from 'react-icons/fa';
import io from 'socket.io-client';
var socket = io();


class SessionButton extends Component
{
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: null,
            inProgress: false,
            showModal: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Modal = this.Modal.bind(this);
    }

    handleClick() {
        if(this.state.inProgress){
            socket.emit("session-button-end", { name: this.state.name });
            this.setState({ name: null, inProgress: false, showModal: false });
        }
        else {
            socket.emit("session-button-start");
            socket.on("session-server-created", () => {
                this.setState({ inProgress: true, showModal: true });
            })
            socket.on("session-button-blocked", () => {
                alert("Session already in progress!");
            })
        }
    }

    handleChange(e) {
        this.setState({ name: e.target.value });
    }

    Modal() {
        return (
            <>
                <Button style={{padding: "10px 30px 10px",
                                position: "absolute",
                                top:15,
                                right:15,
                            }} variant="success" onClick={this.handleClick}>
                    <FaPowerOff size="35px"/>
                </Button>
                <Modal show={this.state.showModal}>
                    <Modal.Header>
                      <Modal.Title>Session Started</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl 
                            aria-describedby="basic-addon1"
                            type="text"
                            value={this.state.name}
                            placeholder="Enter a session name"
                            onChange={this.handleChange}/>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={this.handleClick}>
                        End Session
                      </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    render()
    {
        return (<div>{this.Modal()}</div>);
    }
}

export default SessionButton;