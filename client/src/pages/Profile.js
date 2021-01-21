import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
// Custom component imports
import UserInfo from '../components/Profile/UserInfo';

//import Courses from '../components/Profile/Courses';
import Settings from '../components/Profile/Settings';
import Notifications from '../components/Profile/Notifications';
import Sidebar from '../components/Profile/Sidebar';
import NavBar from '../pages/layout/Navbar';

const useStyles = makeStyles({
    contentContainer: {
        marginTop: 3,
    },
});

const Profile = props => {
    const classes = useStyles();
    let { path } = useRouteMatch();

    console.log(path);
    return (
        <Grid>
            <NavBar />

            <Grid container className={classes.contentContainer}>
                <Grid item container direction="row" sm={3}>
                    <Sidebar />
                </Grid>
                <Grid item container sm={9}>
                    <Switch>
                        <Route exact path="/profile">
                            <UserInfo />
                        </Route>
                        {/* <Route path={`${path}/courses`}>
                        <Courses />
                    </Route */}
                        <Route path="/profile/settings">
                            <Settings />
                        </Route>
                        <Route path="/profile/notifications">
                            <Notifications />
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;
