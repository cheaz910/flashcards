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

    getSet(set) {
        let cards = [];
        for (let i = 0; i < set.cards.length; i++) {
            let item = set.cards[i];
            item['number'] = i;
            item['isChange'] = false;
            cards.push(item);
        }
        set.cards = cards;
        return set;
    }

    componentDidMount() {
        const requestOptions = { method: 'POST', headers: {...authHeader(), 'Content-Type': 'application/json'}, body: JSON.stringify({
                userId: this.state.currentUser.id,
                setId: this.props.match.params.setId
            })};
        fetch(`${config.apiUrl}/api/set/1`, requestOptions).then(handleResponse).then(data => this.setState({ set: this.getSet(data.set), nRow: data.set.length, loaded: true }));
    }

    createMutableRow(card) {
        return (
            <tr key={card.number}>
                <th>
                    <input type="text" defaultValue={card.wordEn}/>
                </th>
                <th>
                    <input type="text" defaultValue={card.wordRu}/>
                </th>
                <th>
                    <button type="button" onClick={() => this.save(card.number)}>Сохранить</button>
                </th>
            </tr>
        );
    }

    createImmutableRow(card) {
        return (
            <tr key={card.number}>
                <th>{card.wordEn}</th>
                <th>{card.wordRu}</th>
                <th>
                    <button type="button" onClick={() => this.change(card.number)}>Изменить</button>
                </th>
            </tr>
        );
    }

    save(number) {
        let newState = this.state;
        let row = document.querySelectorAll('tr')[number].children;
        let wordEn = row[0].children[0];
        let wordRu = row[1].children[0];
        if (wordEn.value !== "" && wordRu.value !== "") {
            newState.set.cards[number].isChange = false;
            if (wordEn.value !== wordEn.defaultValue || wordRu.value !== wordRu.defaultValue) {
                newState.set.cards[number].wordEn = wordEn.value;
                newState.set.cards[number].wordRu = wordRu.value;
                //отправка слова на сервер cards[number]
            }
            this.setState(newState);
        }
    }

    change(number) {
        let newState = this.state;
        newState.set.cards[number].isChange = true;
        this.setState(newState);
    }

    addRow() {
        let card = {
            id:null,
            number: this.state.set.cards.length,
            isChange: true,
            wordEn:"",
            wordRu:""
        };
        let newState = this.state;
        newState.set.cards.push(card);
        this.setState(newState);
    }

    render() {
        if (!this.state.loaded) {
            return <h1>loading...</h1>;
        }
        return (
            <Fragment>
                <h1>{
                    this.props.match.params.setId ? `Набор - ${this.props.match.params.setId}` : `Новый набор`
                }</h1>
                <table id="table">
                    {
                        this.state.set.cards.map(card =>
                            (card.isChange) ? this.createMutableRow(card) : this.createImmutableRow(card)
                        )
                    }
                </table>
                <button type="button" onClick={this.addRow}>+</button>
            </Fragment>
        );
    }
}
