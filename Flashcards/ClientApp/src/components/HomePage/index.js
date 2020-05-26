import React from 'react';
import {Fragment} from 'react';

import { userService, authenticationService } from '../../_services';
import config from "../../config";
import {authHeader, handleResponse} from "../../_helpers";
import { Sets } from '../Sets';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            sets: [],
            currentUserId: 0
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({currentUserId: event.target.value});
    }

    componentDidMount() {
        const requestOptions = { method: 'POST', headers: {...authHeader(), 'Content-Type': 'application/json'}, body: JSON.stringify({
                userId: this.state.currentUser.id
            })};
        fetch(`${config.apiUrl}/api/sets`, requestOptions).then(handleResponse).then(data => this.setState({ sets: data.sets.sets }));
    }

    render() {
        const { sets } = this.state;
        return (
            <>
                <span>currentUser - {this.state.currentUserId}</span>
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="0">user0</option>
                    <option value="1">user1</option>
                </select>
                <Sets sets={sets}/>
            </>
        );
    }
}

export { HomePage };