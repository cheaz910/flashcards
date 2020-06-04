import React from 'react';
import {Fragment} from 'react';
import {authenticationService } from '../../_services';
import {Cards} from '../Cards';
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
        let fetchDeck = fetch(`api/users/${this.state.currentToken}/decks/${this.props.match.params.setId}/cards`, {'headers':{'Authorization':'no'}})
            .then(data=>data.json());
        let fetch2 = fetch(`api/users/${this.state.currentToken}/decks/${this.props.match.params.setId}`, {'headers':{'Authorization':'no'}})
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
            <Fragment>
                <span className={styles.set__title}>
                    {this.state.setProperties.title}
                </span>
                <span className={styles.set__description}> 
                    {this.state.setProperties.description}
                </span>
                <button className={styles.change__button} type="button"/>
                <Cards cards={this.state.set}
                       currentToken={this.state.currentToken}
                       setId={this.props.match.params.setId}
                />
            </Fragment>
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
