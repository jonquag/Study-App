import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import DragzonePicture from '../components/DragzonePicture';

import { useGlobalContext } from '../context/studyappContext';
import * as actions from '../context/actions';

const useStyles = makeStyles(theme => ({
    linkStyles: {
        textDecoration: 'none',
        color: 'black',
        padding: '1em 0 0 2em',
        fontSize: '1.125rem',
        opacity: '50%',
    },
    profilePic: {
        borderRadius: '50%',
        width: '130px',
        marginTop: '4em',
    },
    drawer: {
        background: '#F9F9FC',
        height: 'calc(100vh - 100px)',
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(6),
            background: '#FFF',
            height: '100vh',
        },
    },
    linkContainer: {
        paddingTop: '2em',
        [theme.breakpoints.down('sm')]: {
            paddingTop: 0,
        },
    },
    profileName: {
        paddingTop: '1em',
        fontSize: '1.375rem',
    },
    button: {
        margin: '2em',
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '1rem',
        letterSpacing: 0.5,
    },
}));

const ProfileSidePanel = props => {
    const classes = useStyles();
    const { profile, dispatch } = useGlobalContext();

    const handleDrawerClose = () => {
        dispatch({ type: 'CLOSE_DRAWER' });
    };

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justify="space-between"
            item
            className={classes.drawer}
        >
            {/* Profile briefing container */}
            <Grid
                container
                item
                direction="column"
                alignItems="center"
                style={{ marginTop: '3em' }}
            >
                <DragzonePicture className={classes.profilePic} />

                <Typography className={classes.profileName} align="center">
                    {profile.firstName + ' ' + profile.lastName}
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
                    onClick={handleDrawerClose}
                >
                    User Info
                </NavLink>
                <NavLink
                    to="/profile/courses"
                    exact
                    activeStyle={{
                        opacity: '100%',
                    }}
                    className={classes.linkStyles}
                    onClick={handleDrawerClose}
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
                    onClick={handleDrawerClose}
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
                    onClick={handleDrawerClose}
                >
                    Notifications
                </NavLink>
            </Grid>
            <Grid container item>
                <Grid item>
                    <Button
                        className={classes.button}
                        onClick={() => actions.logout()(dispatch)}
                    >
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProfileSidePanel;
