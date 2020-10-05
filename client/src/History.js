import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';

//const socket = io.connect('ws://localhost:3000');

class History extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            sessions: [
                {name: "1", start: "start", end: "end"},
                {name: "2", start: "start", end: "end"},
                {name: "3", start: "start", end: "end"}
            ]
        };
    }

    // handle the event sent with socket.emit()
    /*socket.on('session', (data) => {
        this.setState(sessions.push({name: data.name, start: data.start, end: data.end}));
    });*/

    /*state = {
        run: {
            number: "",
            date: "",
            startTime: "",
            stopTime: ""
        },
        sessions: [],
        clicked: false
    }*/

    /*socket.on('button', function(data){
        this.setState({ clicked: !this.state.clicked })
        if(this.state.clicked == true){
            this.setState({
                run: {
                    number: data.number,
                    date: data.number,
                    startTime: data.startTime
                }
            })
        }
        else{
            this.setState({
                run: {
                    stopTime: data.stopTime
                },
                sessions: this.state.sessions.push(this.state.run)
            })
        }
    });*/

    /*handleClick = () => {
        var date = new Date();
        if(!this.state.clicked) {
            this.setState(
                    this.state.run.number = this.state.run.number++,
                    this.state.run.date = date.getMonth.toString + "/" + date.getDate.toString + "/" + date.getFullYear.toString,
                    this.state.run.startTime = date.getHours.toString + ":" + date.getMinutes.toString + ":" + date.getSeconds.toString,
                    this.state.run.stopTime = 0,
                    this.state.clicked = true
            );
        }
        else {
            this.setState(
                this.state.run.stopTime = date.getHours.toString + ":" + date.getMinutes.toString + ":" + date.getSeconds.toString,
                this.state.sessions.push(this.state.run),
                this.state.clicked = false,
            );
        }
    }*/

    generateCollection() {
        this.state.sessions.map((run) => {
            return (
                <tr>
                    <td>{run.name}</td>
                    <td>{run.start}</td>
                    <td>{run.end}</td>
                </tr>
            );
        })
    }
    
    render()
    {
        return (
            <Table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Start</th>
                    <th>End</th>
                </tr>
                </thead>
                <tbody>
                    {this.generateCollection()}
                </tbody>
            </Table>
        );
    }
}

export default History;