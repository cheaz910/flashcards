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
            currentToken: localStorage.getItem('token'),
            set: [],
            setProperties: {},
            firstNextCard: 0,
            secondNextCard: 1,
            flipCard: false,
            knewCard: false,
            goodTries: 0,
            loaded: false,
            newCard: false,
            isFirstCard: false
        };
    }

    componentDidMount() {
        let fetchDeck = fetch(`api/users/${this.state.currentToken}/decks/${this.props.match.params.setId}/cards`, {'headers':{'Authorization':'no'}})
            .then(data=>data.json());
        let fetch2 = fetch(`api/users/${this.state.currentToken}/decks/${this.props.match.params.setId}`, {'headers':{'Authorization':'no'}})
            .then(data=>data.json());
        Promise.all([fetchDeck, fetch2]).then(values => {
            this.setState({
                set: values[0],
                loaded: true,
                setProperties: values[1]
            });
        });
    }

    doKnowButtons() {
        return (
            <div className={styles.buttons}>
                <button className={styles.agreeButton} onClick={() =>this.setState({flipCard: true, knewCard: true})}>Знаю</button>
                <button className={styles.declineButton} onClick={() =>this.setState({flipCard: true})}>Не знаю</button>
            </div>
        );
    }

    approveButtons() {
        return (
            <div className={styles.buttons}>
                <button className={styles.agreeButton} onClick={() => this.nextCard(true)}>Да</button>
                <button className={styles.declineButton} onClick={() => this.nextCard(false)}>Нет :(</button>
            </div>
        );
    }

    nextButtons() {
        return <button className={styles.neutralButton} onClick={() => this.nextCard(false)}>Далее</button>;
    }

    nextCard(isGuessed) {
        let newFirstNextCard = this.state.firstNextCard;
        let newSecondNextCard = this.state.secondNextCard;
        if (this.state.isFirstCard) {
            newSecondNextCard = (this.state.secondNextCard + 2) % this.state.set.length;
        } else {
            newFirstNextCard = (this.state.firstNextCard + 2) % this.state.set.length;
        }
        this.setState({
            goodTries: this.state.goodTries + (isGuessed ? 1 : 0),
            firstNextCard: newFirstNextCard,
            secondNextCard: newSecondNextCard,
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
            <div className={styles.checkCards}>
                <span className={styles.checkCards__title}>Набор - {this.state.setProperties.title}</span>
                <span className={styles.checkCards__goodCount}>Количество верно угаданных - {this.state.goodTries}</span>
                <div className={styles.cardWrapper}>
                    <div className={mergeClassNames(styles.card, this.state.isFirstCard ? styles.card_show : '', this.state.newCard ? styles.card_throw : '')}>
                        <div className={mergeClassNames(styles.card__front, this.state.flipCard ? styles.card__front_flip : '')}>
                            <div className={styles.card__word}>
                                {this.state.set[this.state.firstNextCard].text}
                            </div>
                        </div>
                        <div className={mergeClassNames(styles.card__back, this.state.flipCard ? styles.card__back_flip : '')}>
                            <div className={styles.card__word}>
                                {this.state.set[this.state.firstNextCard].translation}
                            </div>
                        </div>
                    </div>
                    <div className={mergeClassNames(styles.card, !this.state.isFirstCard ? styles.card_show : '', !this.state.newCard ? styles.card_throw : '')}>
                        <div className={mergeClassNames(styles.card__front, this.state.flipCard ? styles.card__front_flip : '')}>
                            <div className={styles.card__word}>
                                {this.state.set[this.state.secondNextCard].text}
                            </div>
                        </div>
                        <div className={mergeClassNames(styles.card__back, this.state.flipCard ? styles.card__back_flip : '')}>
                            <div className={styles.card__word}>
                                {this.state.set[this.state.secondNextCard].translation}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.card__result}>
                    <span className={mergeClassNames(styles.result__title, this.state.flipCard && this.state.knewCard ? '' : styles.result__title_hidden)}>
                        Верно?
                    </span>
                    {buttons}
                </div>
            </div>
        );
    }
}