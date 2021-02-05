import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

// Custom component imports
import Sidebar from '../components/Profile/Sidebar';
import UserInfo from '../components/Profile/UserInfo';
import Settings from '../components/Profile/Settings';
import MyCourses from '../components/Profile/MyCourses';
import ProfileSidePanel from './ProfileSidePanel';

const useStyles = makeStyles(theme => ({
    container: {
        height: 'calc(100vh - 100px)',
        [theme.breakpoints.down('sm')]: {
            height: 'auto',
        },
    },
    contentContainer: {
        backgroundColor: theme.palette.common.white,
        [theme.breakpoints.down('sm')]: {
            minHeight: 'calc(100vh - 200px)',
        },
    },
}));

const Profile = () => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item container className={classes.container}>
                <Sidebar>
                    <ProfileSidePanel />
                </Sidebar>
                <Grid item container sm={12} md={9} className={classes.contentContainer}>
                    <Switch>
                        <Route exact path="/profile">
                            <UserInfo />
                        </Route>
                        <Route exact path="/profile/courses">
                            <MyCourses />
                        </Route>
                        <Route exact path="/profile/settings">
                            <Settings />
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;
