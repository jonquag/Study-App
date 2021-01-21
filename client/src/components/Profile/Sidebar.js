import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Drawer as MUIDrawer } from '@material-ui/core';
import { NavLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import profilePic from '../../static/images/profilePicSample.png';

const useStyles = makeStyles(theme => ({
    linkStyles: {
        textDecoration: 'none',
        color: 'black',
        padding: '1em 0 0 2em',
        fontSize: 18,
        opacity: '50%',
    },
    profilePic: {
        borderRadius: '50%',
        width: '130px',
        marginTop: '4em',
    },
    drawer: {
        width: 400,
        background: '#F9F9FC',
    },
    linkContainer: {
        paddingTop: '2em',
    },
    profileName: {
        paddingTop: '1em',
        fontSize: 22,
    },
}));

const Drawer = props => {
    const classes = useStyles();
    const location = useLocation();

    if (location.pathname === '/forum') return <h1>Forum page side panel</h1>;
    if (location.pathname === '/chat') return <h1>Chat page side panel</h1>;

    return (
        <MUIDrawer variant="permanent" anchor="left" className={classes.drawer}>
            {/* Drawer container */}
            <Grid
                container
                direction="column"
                alignItems="center"
                style={{ width: '400px' }}
                sm={12}
                className={classes.drawer}
            >
                {/* Profile briefing container */}
                <Grid container item direction="column" alignItems="center" sm={4}>
                    <img
                        src={profilePic}
                        alt="Ashly Sanford"
                        className={classes.profilePic}
                    />

                    <Typography className={classes.profileName} align="center">
                        Ashley Sanford
                    </Typography>
                </Grid>

                {/* Profile Links container */}
                <Grid container item direction="column" className={classes.linkContainer}>
                    <NavLink
                        to="/profile"
                        exact
                        activeStyle={{
                            opacity: '100%',
                        }}
                        className={classes.linkStyles}
                    >
                        User Info
                    </NavLink>
                    <NavLink
                        to="profile/courses"
                        exact
                        activeStyle={{
                            opacity: '100%',
                        }}
                        className={classes.linkStyles}
                    >
                        My Courses
                    </NavLink>
                    <NavLink
                        to="/profile/settings"
                        exact
                        activeStyle={{
                            opacity: '100%',
                        }}
                        className={classes.linkStyles}
                    >
                        Settings
                    </NavLink>
                    <NavLink
                        to="/profile/notifications"
                        exact
                        activeStyle={{
                            opacity: '100%',
                        }}
                        className={classes.linkStyles}
                    >
                        Notifications
                    </NavLink>
                </Grid>
                <Grid container direction="column" item justify="flex-end" sm={4}>
                    <Grid item>
                        <Typography align="left">Logout</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </MUIDrawer>
        //  Container for Profile Summary
    );
};

export default Drawer;
