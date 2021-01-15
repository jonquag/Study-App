import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    testStyles: {
        padding: '1em 0',
    },
    navStyles: {
        padding: '1em 0',
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    userName: {
        paddingTop: '1em',
        fontWeight: 'bold',
    },
}));

const Sidebar = () => {
    const classes = useStyles();

    return (
        //  Container for Profile Summary
        <Grid item container={12} direction='column'>
            {/* Container to hold user info (picture/name) */}
            <Grid item container direction='column' sm={6}>
                <Grid item style={{ paddingTop: '2em 0 5em 0' }} alignSelf='center'>
                    <Avatar
                        alt='Ashley Sanford'
                        src='/static/images/avatar/3.jpg'
                        className={classes.large}
                    />
                    <Typography className={classes.userName}>Ashley Sanford</Typography>
                </Grid>
            </Grid>
            {/* Container to hold router links */}
            <Grid item container direction='column' justify='center'>
                <NavLink
                    to='/profile/'
                    exact
                    activeStyle={{
                        fontWeight: 'bold',
                    }}
                    className={classes.linkStyles}
                >
                    User Info
                </NavLink>
                <NavLink
                    to='/profile/courses'
                    activeStyle={{
                        fontWeight: 'bold',
                    }}
                    className={classes.linkStyles}
                >
                    My Courses
                </NavLink>
                <NavLink
                    to='/profile/settings'
                    activeStyle={{
                        fontWeight: 'bold',
                    }}
                    className={classes.linkStyles}
                >
                    Settings
                </NavLink>
                <NavLink
                    to='/profile/notifications'
                    activeStyle={{
                        fontWeight: 'bold',
                    }}
                    className={classes.linkStyles}
                >
                    Notifications
                </NavLink>
            </Grid>
        </Grid>
    );
};

export default Sidebar;
