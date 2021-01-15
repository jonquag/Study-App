import React from 'react';
import { Grid } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
// Custom component imports
// import Sidebar from '../components/Profile/Sidebar';
import UserInfo from '../components/Profile/UserInfo';
import Courses from '../components/Profile/Courses';
import Settings from '../components/Profile/Settings';
import Notifications from '../components/Profile/Notifications';
import Drawer from '../components/Profile/Drawer';

const Profile = (props) => {
    return (
        <React.Fragment>
            <Drawer />
            {/* Display current route container */}

            <Grid container style={{ height: '100vh', background: 'grey' }}>
                <Switch>
                    <Route path='/profile/' exact component={UserInfo} />
                    <Route path='/profile/courses' component={Courses} />
                    <Route path='/profile/settings' component={Settings} />
                    <Route path='/profile/notifications' component={Notifications} />
                </Switch>
            </Grid>
        </React.Fragment>
    );
};

export default Profile;
