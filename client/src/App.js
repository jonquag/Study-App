import React from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import Dashboard from './pages/dashboard/Dashboard';
import Chat from './pages/contentPages/Chat';
import Forum from './pages/contentPages/Forum';
import Groups from './pages/contentPages/Groups';
import ProtectedRoute from './pages/routing/ProtectedRoute';
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
                        <Route exact path="/dashboard" component={Dashboard} />
                        <ProtectedRoute path="/forum" component={Forum} />
                        <ProtectedRoute path="/groups" component={Groups} />
                        <ProtectedRoute path="/chat" component={Chat} />

                        {/* Landing page temporarily redirects to sign-up. */}
                        <Route exact path="/" render={() => <Redirect to="/sign-up" />} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/sign-up" component={Signup} />

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
