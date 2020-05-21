import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { history } from '../../_helpers';
import { authenticationService } from '../../_services';
import { PrivateRoute } from '../../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { CheckCardsPage } from "../CheckCardsPage";
import './app.css';
import {SetPage} from "../SetPage";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                {currentUser &&
                <header>
                    <nav className="nav-header">
                        <div className="nav-header__links">
                            <Link to="/" className="links__link">Home</Link>
                        </div>
                        <div className="nav-header__profile">
                            <a href="/#" onClick={this.logout} className="profile__link">Logout</a>
                        </div>
                    </nav>
                </header>
                }
                <main>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <PrivateRoute exact path="/checkCards/:setId" component={CheckCardsPage} />
                    <PrivateRoute exact path="/sets/:setId?" component={SetPage} />
                    <Route path="/login" component={LoginPage} />
                </main>
            </Router>
        );
    }
}