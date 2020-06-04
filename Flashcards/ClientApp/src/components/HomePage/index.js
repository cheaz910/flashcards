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

        this.deleteDeck = this.deleteDeck.bind(this);
    }

    componentDidMount() {
        console.log('did mount');
        fetch(`api/decks`)
            .then(data => {console.log(data.body); return data.json()})
            .then(data => {
                this.setState({ sets: data })
            });
    }

    deleteDeck(id) {
        console.log(this.state);
        this.setState({
            sets: this.state.sets.filter(set => set.id !== id)
        });
    }

    render() {
        const { sets } = this.state;
        return (<Sets sets={sets} deleteDeck={this.deleteDeck}/>);
    }
}

export { HomePage };