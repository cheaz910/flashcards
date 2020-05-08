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
            users: null,
            sets: []
        };
    }

    componentDidMount() {
        const requestOptions = { method: 'POST', headers: {...authHeader(), 'Content-Type': 'application/json'}, body: JSON.stringify({
                userId: this.state.currentUser.id
            })};
        fetch(`${config.apiUrl}/api/sets`, requestOptions).then(handleResponse).then(data => this.setState({ sets: data.sets.sets }));
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        console.log(this.state.sets);
        const { currentUser, users, sets } = this.state;
        return (
            <Fragment>
                <Sets sets={sets} />
                }
                <h1>Hi {currentUser.firstName}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {users &&
                <ul>
                    {users.map(user =>
                        <li key={user.id}>{user.firstName} {user.lastName}</li>
                    )}
                </ul>
                }
            </Fragment>
        );
    }
}

export { HomePage };