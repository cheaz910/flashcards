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
        }).then(data => console.log(data));
        event.preventDefault();
        this.props.history.push('/');
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
            <Formik
                initialValues={{
                    title: '',
                    description: ''
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().required('Title is required'),
                    description: Yup.string().required('Description is required')
                })}
                onSubmit={({ title, description }, { setStatus, setSubmitting }) => {
                    setStatus();
                    let body = JSON.stringify({
                        'Title': this.state.title,
                        'Description': this.state.description
                    });
                    fetch(`api/decks`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: body
                    }).then(data => {console.log(data);this.props.history.push('/');});
                }}
                render={({ errors, status, touched, isSubmitting }) => (
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Название набора:
                            <input type="text" name="title" onChange={this.handleInputChange} />
                        </label>
                        <label>
                            Описание набора:
                            <input type="text" name="description" onChange={this.handleInputChange} />
                        </label>
                        <input type="submit" value="Отправить" />
                    </form>
                )}
            />
        );
    }
}