import React from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { theme } from './themes/theme';
import Profile from './pages/Profile';
import Signup from './pages/auth/Sign-up';
import Login from './pages/auth/Login';

// import UserInfo from './components/Profile/UserInfo';

import './App.css';

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline>
                <BrowserRouter>
                    <Switch>
                        {/* Landing page temporarily redirects to sign-up. */}
                        <Route exact path="/" render={() => <Redirect to="/sign-up" />} />
                        <Route path="/login" component={Login} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/sign-up" component={Signup} />

                        {/* Any other unknown paths redirects to sign-up. */}
                        {/* <Route
                            path="*"
                            render={props => (
                                <Redirect
                                    to={{
                                        pathname: '/sign-up',
                                        state: { from: props.location },
                                    }}
                                />
                            )}
                        /> */}
                    </Switch>
                </BrowserRouter>
            </CssBaseline>
        </MuiThemeProvider>
    );
}

export default App;
