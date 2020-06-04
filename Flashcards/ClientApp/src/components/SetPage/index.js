import React from 'react';
import {Fragment} from 'react';
import {authenticationService } from '../../_services';
import {Cards} from '../Cards';
import {SetDescription} from '../SetDescription';
import styles from "./setPage.module.css";


export class SetPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: authenticationService.currentUserValue,
            currentToken: localStorage.getItem('token'),
            set: [],
            setProperties: {},
            loaded: false
        };
    }

    componentDidMount() {
        let fetchDeck = fetch(`api/decks/${this.props.match.params.setId}/cards`, {'headers':{'Authorization':'no'}})
            .then(data=>data.json());
        let fetch2 = fetch(`api/decks/${this.props.match.params.setId}`, {'headers':{'Authorization':'no'}})
            .then(data=>data.json());
        Promise.all([fetchDeck, fetch2]).then(values => {
            this.setState({
                set: this.getSet(values[0]),
                loaded: true,
                setProperties: values[1]
            });
        });
    }

    render() {
        if (!this.state.loaded) {
            return <h1>loading...</h1>;
        }
        return (
            <div className={styles.set__page}>
                <SetDescription setProperties={this.state.setProperties}
                       currentToken={this.state.currentToken}
                       setId={this.props.match.params.setId}
                />
                <Cards cards={this.state.set}
                       currentToken={this.state.currentToken}
                       setId={this.props.match.params.setId}
                />
            </div>
        );
    }

    getSet(set=null) {
        let cards = [];
        for (let i = 0; i < set.length; i++) {
            let item = set[i];
            item['isNew'] = false;
            cards.push(item);
        }
        return cards;
    }


}
