import React from 'react';
import { Grid, Typography, Badge, Divider } from '@material-ui/core';
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
        background: '#F9F9FC',
    },
    linkContainer: {
        paddingTop: '2em',
    },
    profileName: {
        paddingTop: '1em',
        fontSize: 22,
    },
    chat_head: {
        height: 120,
        // backgroundColor: '#2967ff',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: theme.spacing(4),
        '& p': {
            fontSize: 22,
        },
    },
    badge: {
        color: theme.palette.common.white,
        paddingLeft: theme.spacing(4),
        '& span': {
            width: 40,
            height: 24,
            fontSize: 14,
            background: theme.palette.primary.gradient,
        },
    },
}));

const Drawer = props => {
    const classes = useStyles();
    const location = useLocation();

    if (location.pathname === '/chat')
        return (
            <>
                <Grid item className={classes.chat_head}>
                    <Typography>All Chats</Typography>
                    <Badge badgeContent={12} className={classes.badge} />
                </Grid>
                <Divider />
                <Grid item>Math Exam Chats</Grid>
                <Grid item>Biology course</Grid>
            </>
        );
    if (location.pathname === '/forum') return <h1>Forum page side panel</h1>;

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            item
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
                    Ashly Sanford
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
                    to="/profile/courses"
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
                    <Typography>Logout</Typography>
                </Grid>
            </Grid>
        </Grid>

        //  Container for Profile Summary
    );
};

export default Drawer;
