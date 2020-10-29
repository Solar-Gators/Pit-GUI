import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

class History extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            sessions: []
        };
    }

    componentDidMount() {
        axios.get('/api/history').then((res) => {
            let array = this.state.sessions;
            array.push(...res.data);
            this.setState({ sessions: array });
        });
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
                    {this.state.sessions.map(run => (
                        <tr>
                            <td style={{width:"33.33%"}}>{run.name}</td>
                            <td style={{width:"33.33%"}}>{run.start}</td>
                            <td style={{width:"33.33%"}}>{run.end}</td>
                        </tr>
                     ))}
                </tbody>
            </Table>
        );
    }
}

export default History;