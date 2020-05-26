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
            currentToken: '81a130d2-502f-4cf1-a376-63edeb000e9f'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({currentToken: event.target.value});
        fetch(`api/users/${event.target.value}/decks`, {'headers':{'Authorization':'no'}})
            .then(data=>data.json())
            .then(data => this.setState({ sets: data }));
    }

    componentDidMount() {
        const requestOptions = { method: 'POST', headers: {...authHeader(), 'Content-Type': 'application/json'}, body: JSON.stringify({
                userId: this.state.currentUser.id
            })};
        fetch(`api/users/${this.state.currentToken}/decks`, {'headers':{'Authorization':'no'}})
            .then(data=>data.json())
            .then(data => this.setState({ sets: data }));
        //fetch(`${config.apiUrl}/api/sets`, requestOptions).then(handleResponse).then(data => this.setState({ sets: data.sets.sets }));
    }

    render() {
        const { sets } = this.state;
        return (
            <>
                <span>currentToken - {this.state.currentToken}</span>
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value="81a130d2-502f-4cf1-a376-63edeb000e9f">user0</option>
                    <option value="0f8fad5b-d9cb-469f-a165-70867728950e">user1</option>
                </select>
                <Sets sets={sets}/>
            </>
        );
    }
}

export { HomePage };