import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import Profile from './Profile';

class LandingPage extends Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <Profile />
            </React.Fragment>
        );
    }
}

export default LandingPage;
