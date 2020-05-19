import React from 'react';
import {Fragment} from 'react';

import { userService, authenticationService } from '../../_services';
import config from "../../config";
import {authHeader, handleResponse, mergeClassNames} from "../../_helpers";
import styles from './setPage.module.css';

export class SetPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            set: [],
            loaded: false
        };
    }

    componentDidMount() {
        const requestOptions = { method: 'POST', headers: {...authHeader(), 'Content-Type': 'application/json'}, body: JSON.stringify({
                userId: this.state.currentUser.id,
                setId: this.props.match.params.setId
            })};
        fetch(`${config.apiUrl}/api/set/1`, requestOptions).then(handleResponse).then(data => this.setState({ set: data.set, loaded: true }));
    }

    render() {
        console.log(this.state);
        console.log(this.props);
        if (!this.state.loaded) {
            return <h1>loading...</h1>;
        }
        return (
            <Fragment>
                <h1>{this.props.match.params.setId ? `Набор - ${this.props.match.params.setId}` : `Новый набор`}</h1>
                <ul>
                    {this.state.set.cards.map(card =>
                        <li>
                            {card.wordEn}
                        </li>
                    )}
                </ul>
            </Fragment>
        );
    }
}