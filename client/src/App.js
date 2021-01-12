import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { theme } from './themes/theme';
// import LandingPage from './pages/Landing';
import Signup from './pages/auth/Sign-up';
import Login from './pages/auth/Login';

import './App.css';

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    {/* Landing page temporarily redirects to login. */}
                    <Route
                        exact
                        path="/"
                        render={() => <Redirect to="/login" />}
                    />

                    <Route exact path="/login" component={Login} />
                    <Route exact path="/sign-up" component={Signup} />

                    {/* Any other unknown paths redirects to login. */}
                    <Route
                        path="*"
                        render={props => (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: { from: props.location },
                                }}
                            />
                        )}
                    />
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;
