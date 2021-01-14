import React from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { theme } from './themes/theme';
// import LandingPage from './pages/Landing';
import Dashboard from './pages/dashboard/Dashboard';
import Chat from './pages/contentPages/Chat';
import Forum from './pages/contentPages/Forum';
import Groups from './pages/contentPages/Groups';
import ProtectedRoute from './pages/routing/ProtectedRoute';

import './App.css';

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <ProtectedRoute path="/forum" component={Forum} />
                        <ProtectedRoute path="/groups" component={Groups} />
                        <ProtectedRoute path="/chat" component={Chat} />
                    </Switch>
                </BrowserRouter>
            </CssBaseline>
        </MuiThemeProvider>
    );
}

export default App;
