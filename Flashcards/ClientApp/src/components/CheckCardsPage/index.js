import React from 'react';
import {Fragment} from 'react';

import { userService, authenticationService } from '../../_services';
import config from "../../config";
import {authHeader, handleResponse, mergeClassNames} from "../../_helpers";
import styles from './checkCardsPage.module.css';
import { Loader } from '../Loader';

export class CheckCardsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            currentToken: localStorage.getItem('token'),
            set: [],
            mainQueue: [],
            secondQueue: [],
            setProperties: {},
            firstNextCard: 0,
            secondNextCard: 1,
            flipCard: false,
            knewCard: false,
            goodTries: 0,
            loaded: false,
            newCard: false,
            isFirstCard: true,
            mainQueueCounter: 0
        };
    }

    componentDidMount() {
        let fetchDeck = fetch(`api/decks/${this.props.match.params.setId}/cards`)
            .then(data=>data.json());
        let fetch2 = fetch(`api/decks/${this.props.match.params.setId}`)
            .then(data=>data.json());
        Promise.all([fetchDeck, fetch2]).then(values => {
            let mainQueue = Array.from(Array(values[0].length).keys());
            let firstNextCard = mainQueue.shift();
            this.setState({
                set: values[0],
                loaded: true,
                setProperties: values[1],
                mainQueue: mainQueue,
                firstNextCard: firstNextCard
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
        let mainQueue = this.state.mainQueue.slice();
        if (!isGuessed) {
            mainQueue.splice(Math.floor(mainQueue.length / 2), 0, this.state.isFirstCard ? this.state.firstNextCard : this.state.secondNextCard);
        } else {
            mainQueue.push(this.state.isFirstCard ? this.state.firstNextCard : this.state.secondNextCard);
        }
        let newFirstNextCard = this.state.firstNextCard;
        let newSecondNextCard = this.state.secondNextCard;
        console.log(newFirstNextCard, newSecondNextCard);
        if (this.state.isFirstCard) {
            newSecondNextCard = mainQueue.shift();
        } else {
            newFirstNextCard = mainQueue.shift();
        }


        this.setState({
            goodTries: this.state.goodTries + (isGuessed ? 1 : 0),
            firstNextCard: newFirstNextCard,
            secondNextCard: newSecondNextCard,
            flipCard: false,
            knewCard: false,
            newCard: !this.state.newCard,
            isFirstCard: !this.state.isFirstCard,
            mainQueue: mainQueue
        });
    }

    render() {
        console.log(this.state.set, this.state.firstNextCard, this.state.secondNextCard, this.state.mainQueue, this.state.secondQueue);
        const buttons = this.state.flipCard ? (this.state.knewCard ? this.approveButtons() : this.nextButtons()) : this.doKnowButtons();
        if (!this.state.loaded) {
            return <Loader />;
        }
        if (this.state.set.length === 0) {
            return <h1>В колоде нет карточек</h1>
        }
        return (
            <div className={styles.checkCards}>
                <span className={styles.checkCards__title}>Набор - {this.state.setProperties.title}</span>
                <span className={styles.checkCards__goodCount}>Количество верно угаданных - {this.state.goodTries}</span>
                <div className={styles.cardWrapper}>
                    <div className={mergeClassNames(styles.card, this.state.isFirstCard ? styles.card_show : '', this.state.newCard ? styles.card_throw : '')}>
                        <div className={mergeClassNames(styles.card__front, this.state.flipCard ? styles.card__front_flip : '')}>
                            <p className={styles.card__word}>
                                {this.state.set[this.state.firstNextCard].text}
                            </p>
                        </div>
                        <div className={mergeClassNames(styles.card__back, this.state.flipCard ? styles.card__back_flip : '')}>
                            <p className={styles.card__word}>
                                {this.state.set[this.state.firstNextCard].translation}
                            </p>
                        </div>
                    </div>
                    <div className={mergeClassNames(styles.card, !this.state.isFirstCard ? styles.card_show : '', !this.state.newCard ? styles.card_throw : '')}>
                        <div className={mergeClassNames(styles.card__front, this.state.flipCard ? styles.card__front_flip : '')}>
                            <p className={styles.card__word}>
                                {this.state.set[this.state.secondNextCard >= this.state.set.length ? this.state.set.length - 1 : this.state.secondNextCard].text}
                            </p>
                        </div>
                        <div className={mergeClassNames(styles.card__back, this.state.flipCard ? styles.card__back_flip : '')}>
                            <p className={styles.card__word}>
                                {this.state.set[this.state.secondNextCard >= this.state.set.length ? this.state.set.length - 1 : this.state.secondNextCard].translation}
                            </p>
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