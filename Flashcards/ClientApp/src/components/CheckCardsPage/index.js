import React from 'react';
import {Fragment} from 'react';

import { userService, authenticationService } from '../../_services';
import config from "../../config";
import {authHeader, handleResponse, mergeClassNames} from "../../_helpers";
import styles from './checkCardsPage.module.css';

export class CheckCardsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            set: [],
            nextCard: 0,
            flipCard: false,
            knewCard: false,
            goodTries: 0,
            loaded: false,
            newCard: false,
            isFirstCard: false
        };
    }

    componentDidMount() {
        console.log('helloworld', this.props);
        const requestOptions = { method: 'POST', headers: {...authHeader(), 'Content-Type': 'application/json'}, body: JSON.stringify({
                userId: this.state.currentUser.id,
                setId: this.props.match.params.setId
            })};
        fetch(`${config.apiUrl}/api/set/1`, requestOptions).then(handleResponse).then(data => this.setState({ set: data.set, loaded: true }));
    }

    doKnowButtons() {
        return (
            <>
                <button onClick={() =>this.setState({flipCard: true, knewCard: true})}>KNOW</button>
                <button onClick={() =>this.setState({flipCard: true})}>DON'T KNOW</button>
            </>
        );
    }

    approveButtons() {
        return (
            <>
                <button onClick={() => this.nextCard(true)}>YES</button>
                <button onClick={() => this.nextCard(false)}>NO</button>
                <div>Угадали?</div>
            </>
        );
    }

    nextButtons() {
        return <button onClick={() => this.nextCard(false)}>NEXT</button>;
    }

    nextCard(isGuessed) {
        this.setState({
            goodTries: this.state.goodTries + (isGuessed ? 1 : 0),
            nextCard: (this.state.nextCard + 1) % this.state.set.cards.length,
            flipCard: false,
            knewCard: false,
            newCard: !this.state.newCard,
            isFirstCard: !this.state.isFirstCard
        });
    }

    render() {
        console.log(this.state);
        const buttons = this.state.flipCard ? (this.state.knewCard ? this.approveButtons() : this.nextButtons()) : this.doKnowButtons();
        if (!this.state.loaded) {
            return <h1>loading...</h1>;
        }
        return (
            <Fragment>
                <h1>Набор - {this.props.match.params.setId}</h1>
                <h1>Количество верно угаданных - {this.state.goodTries}</h1>
                <div className={styles.cardWrapper}>
                    <div className={mergeClassNames(styles.card, this.state.isFirstCard ? styles.card_show : styles.card_hidden, this.state.newCard ? styles.card_throw : '')}>

                        <div className={mergeClassNames(styles.card__front, this.state.flipCard ? styles.card__front_flip : '')}>
                            <div className={styles.card__word}>
                                {this.state.set.cards[this.state.nextCard].wordEn}
                            </div>
                        </div>
                        <div className={mergeClassNames(styles.card__back, this.state.flipCard ? styles.card__back_flip : '')}>
                            <div className={styles.card__word}>
                                {this.state.set.cards[this.state.nextCard].wordRu}
                            </div>
                        </div>
                    </div>
                    <div className={mergeClassNames(styles.card, !this.state.isFirstCard ? styles.card_show : styles.card_hidden, !this.state.newCard ? styles.card_throw : '')}>
                        <div className={mergeClassNames(styles.card__front, this.state.flipCard ? styles.card__front_flip : '')}>
                            <div className={styles.card__word}>
                                {this.state.set.cards[this.state.nextCard].wordEn}
                            </div>
                        </div>
                        <div className={mergeClassNames(styles.card__back, this.state.flipCard ? styles.card__back_flip : '')}>
                            <div className={styles.card__word}>
                                {this.state.set.cards[this.state.nextCard].wordRu}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.card__buttons}>
                    {buttons}
                </div>
            </Fragment>
        );
    }
}