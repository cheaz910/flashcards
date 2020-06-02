import React from 'react';
import {Fragment} from 'react';
import { userService, authenticationService } from '../../_services';
import {TableRow} from '../TableRow';
import styles from './setPage.module.css';


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
                <h1>
                    {
                        this.state.setProperties.title ? `Набор - ${this.state.setProperties.title}` : 'Новый набор'
                    }
                </h1>
                <table>
                    <tbody>
                    {
                        this.state.set.map(card => <TableRow card={card}/>)
                    }
                    </tbody>
                </table>
                <button type="button" onClick={() => this.addRow()}>+</button>
            </Fragment>
        );
    }

    addRow() {
        let card = {
            id:null,
            isMutable: true,
            text:"",
            translation:""
        };
        let newState = this.state;
        newState.set.push(card);
        this.setState(newState);
    }

    getSet(set=null) {
        let cards = [];
        for (let i = 0; i < set.length; i++) {
            let item = set[i];
            item['isMutable'] = false;
            cards.push(item);
        }
        return cards;
    }
}
