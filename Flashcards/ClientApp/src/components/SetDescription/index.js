import React from 'react';
import styles from "./setDescription.module.css";


export class SetDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.setProperties.title,
            description: this.props.setProperties.description,
            isChange: false
        };
    }

    render() {
        if (this.state.isChange) {
            return (
                <div className={styles.properties}>
                    
                    <input className={styles.title} defaultValue={this.state.title}
                           onChange={
                               (event) => this.setState({title: event.target.value})
                           }/>
                    <input className={styles.description} defaultValue={this.state.description}
                           onChange={
                               (event) => this.setState({description: event.target.value})
                           }/>
                    <button className={styles.save__button} type="button" onClick={() => this.save()}/>
                </div>
            );
        }
        return (
            <div className={styles.properties}>
                <span className={styles.title}>{this.state.title}</span>
                <span className={styles.description}>{this.state.description}</span>
                <button className={styles.change__button}
                        type="button"
                        onClick={() => this.setState({isChange: true})}>
                    &#128393;
                </button>
            </div>
        );
    }

    save() {
        if (this.state.title !== "") {
            this.setState({isChange: false});
            //отправка на сервер
        }
    }
}