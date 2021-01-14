import React from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';

import { theme } from './themes/theme';
// import LandingPage from './pages/Landing';
import Dashboard from './pages/dashboard/Dashboard';

import './App.css';

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline>
                <BrowserRouter>
                    <Route path="/" component={Dashboard} />
                </BrowserRouter>
            </CssBaseline>
        </MuiThemeProvider>
    );
}

export default App;
