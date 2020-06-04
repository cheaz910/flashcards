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
            sets: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        fetch(`api/users/${event.target.value}/decks`)
            .then(data=>data.json())
            .then(data => this.setState({ sets: data }));
    }

    componentDidMount() {
        fetch(`api/decks`)
            .then(data => {console.log(data.body); return data.json()})
            .then(data => {
                this.setState({ sets: data })
            });
    }

    render() {
        const { sets } = this.state;
        return (<Sets sets={sets} />);
    }
}

export { HomePage };