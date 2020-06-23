import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

import { history } from '../../_helpers';
import { authenticationService } from '../../_services';
import { PrivateRoute } from '../../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { CheckCardsPage } from "../CheckCardsPage"
import CreateSetPage from "../CreateSetPage";
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
                <header>
                    <nav className="nav-header">
                        <div className="nav-header__links">
                            <Link to="/" className="links__link">Главная</Link>
                        </div>
                    </nav>
                </header>
                <main>
                    <Switch>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <PrivateRoute exact path="/checkCards/:setId" component={CheckCardsPage} />
                        <PrivateRoute exact path="/sets/:setId" component={SetPage} />
                        <PrivateRoute exact path="/sets" component={CreateSetPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="*" component={() => <h1>404</h1>} />
                    </Switch>
                </main>
            </Router>
        );
    }
}