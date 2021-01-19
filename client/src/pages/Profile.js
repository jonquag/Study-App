import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

// Custom component imports
import UserInfo from '../components/Profile/UserInfo';
// import Courses from '../components/Profile/Courses';
import Settings from '../components/Profile/Settings';
import Notifications from '../components/Profile/Notifications';
import Sidebar from '../components/Profile/Sidebar';

const useStyles = makeStyles({
    container: {
        display: 'flex',
    },
    contentContainer: {
        height: '100vh',
    },
});

const Profile = props => {
    const classes = useStyles();
    let { path } = useRouteMatch();

    console.log(path);
    return (
        <div className={classes.container}>
            <Sidebar />

            <Grid container className={classes.contentContainer}>
                <Switch>
                    <Route path={path} exact>
                        <UserInfo />
                    </Route>
                    {/* <Route path={`${path}/courses`}>
                        <Courses />
                    </Route */}
                    <Route path={`${path}/settings`}>
                        <Settings />
                    </Route>
                    <Route path={`${path}/notifications`}>
                        <Notifications />
                    </Route>
                </Switch>
            </Grid>
        </div>
    );
};

export default Profile;
