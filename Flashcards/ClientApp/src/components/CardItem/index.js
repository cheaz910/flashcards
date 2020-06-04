import React from 'react';
import styles from './cardItem.module.css';

export class CardItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.card.id,
            text: this.props.card.text,
            translation: this.props.card.translation,
            isNew: this.props.card.isNew
        };
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            alert('enter press here! ')
        }
    }
    
    render() {
        if (this.state.isNew) {
            return (
                <div className={styles.card}>
                    <button className={styles.delete__button} type="button" onClick={() => this.delete()}/>
                    <input className={styles.input__card} defaultValue={this.state.text}
                           onKeyPress={this.handleKeyPress}
                           onChange={
                               (event) => this.setState({text: event.target.value})
                           }/>
                    <input className={styles.input__card} defaultValue={this.state.translation}
                           onChange={
                               (event) => this.setState({translation: event.target.value})
                           }/>
                    <button className={styles.save__button} type="button" onClick={() => this.save()}/>
                </div>
            );
        }
        return (
            <div className={styles.card}>
                <button className={styles.delete__button} type="button" onClick={() => this.delete()}/>
                <span>{this.state.text}</span>
                <span>{this.state.translation}</span>
            </div>
        );
    }

    delete() {
        if (!this.state.isNew) {
            fetch(`api/users/cards/${this.state.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        }
        this.props.onDelete(this.state);
    }
    
    save() {
        if (this.state.text !== "" && this.state.translation !== "") {
            this.setState({isNew: false});
            let body = JSON.stringify({
                'Text': this.state.text,
                'Translation': this.state.translation
            });
            fetch(`api/users/${this.props.currentToken}/decks/${this.props.setId}/cards`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            }).then(data => data.json())
                .then(data => this.setState({id: data.id}))
                .then(() => {
                    this.props.card.id = this.state.id;
                    this.props.card.text = this.state.text;
                    this.props.card.translation = this.state.translation;
                    this.props.card.isNew = this.state.isNew;
                });
        }
    }
}