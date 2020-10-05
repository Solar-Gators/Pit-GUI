import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

//var socket = io.connect('http://localhost:3000');

class SessionButton extends Component
{
    constructor(props) {
        super(props);
        this.state = {clicked: true};
        this.handleClick = this.handleClick.bind(this);
    }

    /*Button.addEventListener('click', function(){
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
        message.value = "";
    });*/

    handleClick() {
        this.setState(state => ({
            clicked: !state.clicked
        }));
    }

    /*componentDidUpdate() {
        if(this.state.clicked == true) {
            
        }
    }*/

    state
    render()
    {
        return (
            <Button onClick={this.handleClick}>
                {this.state.clicked ? 'START' : 'STOP'}
            </Button>
        );
    }
}

export default SessionButton;