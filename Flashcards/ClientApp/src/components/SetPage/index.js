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
            loaded: false,
            isChanged: false
        };
    }

    componentDidMount() {
        const requestOptions = { method: 'POST', headers: {...authHeader(), 'Content-Type': 'application/json'}, body: JSON.stringify({
                userId: this.state.currentUser.id,
                setId: this.props.match.params.setId
            })};
        fetch(`${config.apiUrl}/api/set/1`, requestOptions).then(handleResponse).then(data => this.setState({ set: data.set, loaded: true }));
    }

    addInput() {
        let li1 = document.createElement('li');
        li1.innerHTML = '<input type="text">';
        document.getElementById("column1").appendChild(li1);
        let li2 = document.createElement('li');
        li2.innerHTML = '<input type="text">';
        document.getElementById("column2").appendChild(li2);
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
                <div>
                    <ul className={styles.columns} id="column1">
                        {this.state.set.cards.map(card =>
                            <li>
                                <input type="text" value={card.wordEn}/>
                            </li>
                        )}
                    </ul>
                    <ul className={styles.columns} id="column2">
                        {this.state.set.cards.map(card =>
                            <li>
                                <input type="text" value={card.wordRu}/>
                            </li>
                        )}
                    </ul>
                </div>
                <button type="button" onClick={() => this.addInput()}>+</button>
            </Fragment>
        );
    }
}
