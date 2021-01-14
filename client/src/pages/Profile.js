import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Route, Switch } from 'react-router-dom';
// Custom component imports
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileUserInfo from '../components/ProfileUserInfo';
import ProfileCourses from '../components/ProfileCourses';
import ProfileSettings from '../components/ProfileSettings';
import ProfileNotifications from '../components/ProfileNotifications';

const useStyles = makeStyles({
    headerStyles: {
        fontSize: '36',
    },
    labelStyles: {
        opacity: '50%',
    },
    inputStyles: {
        fontWeight: '600',
        paddingLeft: '1em',
    },
    profileGrid: {
        marginLeft: '2em',
    },
    bgColorTest: {
        background: '#343466',
    },
});

const Profile = (props) => {
    const classes = useStyles();

    return (
        // Layout Container
        <Grid container>
            {/* Sidebar container */}
            <Grid container item xs={0} sm={4} direction='column'>
                <ProfileSidebar />
            </Grid>
            {/* Display current route container */}
            <Grid container item xs={8}>
                <Switch>
                    <Route path='/profile/' exact component={ProfileUserInfo} />
                    <Route path='/profile/courses' exact component={ProfileCourses} />
                    <Route path='/profile/settings' exact component={ProfileSettings} />
                    <Route
                        path='/profile/notifications'
                        exact
                        component={ProfileNotifications}
                    />
                </Switch>
            </Grid>
        </Grid>
    );
};

export default Profile;
