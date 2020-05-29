import React from 'react';
import {Fragment} from 'react';

import { userService, authenticationService } from '../../_services';
import config from "../../config";
import {authHeader, handleResponse} from "../../_helpers";
import {TableRow} from '../TableRow';
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
        fetch(`${config.apiUrl}/api/set/1`, requestOptions).then(handleResponse).then(data => this.setState({ set: this.getSet(data.set), nRow: data.set.length, loaded: true }));
    }

    render() {
        if (!this.state.loaded) {
            return <h1>loading...</h1>;
        }
        return (
            <Fragment>
                <h1>
                    {
                        this.props.match.params.setId ? `Набор - ${this.props.match.params.setId}` : `Новый набор`
                    }
                </h1>
                <table>
                    {
                        this.state.set.cards.map(card => <TableRow card={card}/>)
                    }
                </table>
                <button type="button" onClick={() => this.addRow()}>+</button>
            </Fragment>
        );
    }

    addRow() {
        let card = {
            id:null,
            isMutable: true,
            wordEn:"",
            wordRu:""
        };
        let newState = this.state;
        newState.set.cards.push(card);
        this.setState(newState);
    }

    getSet(set) {
        let cards = [];
        for (let i = 0; i < set.cards.length; i++) {
            let item = set.cards[i];
            item['isMutable'] = false;
            cards.push(item);
        }
        set.cards = cards;
        return set;
    }
}
