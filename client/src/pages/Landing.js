import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

import Profile2 from './Profile2';
import ProfileSidebar from './ProfileSidebar';

class LandingPage extends Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <ProfileSidebar />
                <Profile2 />
                <TextField
                    id='outlined-basic'
                    label='From Landing Page'
                    variant='outlined'
                />
            </React.Fragment>
        );
    }
}

export default LandingPage;
