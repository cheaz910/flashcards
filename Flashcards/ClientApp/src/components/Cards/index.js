import React from 'react';
import {CardItem} from "../CardItem";
import styles from './cards.module.css';
import {mergeClassNames} from "../../_helpers";

export class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: this.props.cards
        };
        this.handleDeleteElement = this.handleDeleteElement.bind(this);
    }

    handleDeleteElement(card) {
        let indexCard = this.state.cards.findIndex( el => el.text === card.text );
        this.state.cards.splice(indexCard, 1);
        this.setState({cards: this.state.cards});
    };
    
    render() {
        return (
            <div className={styles.cards}>
                {this.state.cards &&
                <ul className={styles.cards__list}>
                    
                    {this.state.cards.map(card =>
                        <li className={styles.cards__card}>
                            <CardItem key={card.text}
                                      card={card}
                                      currentToken={this.props.currentToken}
                                      setId={this.props.setId}
                                      onDelete={this.handleDeleteElement}
                            />
                        </li>
                    )}
                    <li className={mergeClassNames(styles.cards__card)}>
                        <button key={-1} className={styles.cards__new} onClick={() => this.addCard()}>
                            <span className={styles.card__new} />
                        </button>
                    </li>
                </ul>
                }
            </div>            
        );
    }
    
    addCard() {
        let card = {
            id: null,
            isNew: true,
            text:"",
            translation:""
        };
        this.state.cards.push(card);
        this.setState({cards: this.state.cards});
    }
}