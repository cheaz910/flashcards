import React from 'react';
import {Fragment} from 'react';

import { Sets } from '../Sets';
import { Loader } from '../Loader';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            sets: []
        };

        this.deleteDeck = this.deleteDeck.bind(this);
    }

    componentDidMount() {
        console.log('did mount');
        fetch(`api/decks`)
            .then(data => {console.log(data.body); return data.json()})
            .then(data => {
                this.setState({ sets: data, isLoaded: true })
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
        if (!this.state.isLoaded) {
            return <Loader />
        }
        return (<Sets sets={sets} deleteDeck={this.deleteDeck}/>);
    }
}

export { HomePage };