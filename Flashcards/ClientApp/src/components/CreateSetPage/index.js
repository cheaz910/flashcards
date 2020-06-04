import React from 'react';
import {Fragment} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { userService, authenticationService } from '../../_services';
import config from "../../config";
import {authHeader, handleResponse} from "../../_helpers";
import { Sets } from '../Sets';
import styles from './createSetPage.module.css';

export default class CreateSetPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            currentToken: localStorage.getItem('token'),
            title: '',
            description: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        let body = JSON.stringify({
            'Title': this.state.title,
            'Description': this.state.description
        });
        console.log('BODY::::::', body);
        if (this.state.title.length === 0 || this.state.description.length === 0) {
            event.preventDefault();
            return;
        }
        fetch(`api/decks`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        }).then(data => this.props.history.push('/'));
        event.preventDefault();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(name, value);
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form className={styles.createDeckForm} onSubmit={this.handleSubmit}>
                <label>
                    Название набора:
                    <input type="text" name="title" onChange={this.handleInputChange} placeholder={"Новая колода"} />
                </label>
                <label>
                    Описание набора:
                    <input type="text" name="description" onChange={this.handleInputChange} placeholder={"Новое описание"} />
                </label>
                <input className={styles.createDeckForm__button} type="submit" value="Создать" />
            </form>
        );
    }
}