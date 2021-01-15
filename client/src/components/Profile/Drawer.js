import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { Drawer as MUIDrawer } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    linkStyles: {
        textDecoration: 'none',
        color: 'black',
        padding: '1em 0 0 2em',
    },
    drawerStyles: {
        width: '400px',
        background: 'blue',
    },
});

const Drawer = () => {
    const classes = useStyles();

    return (
        // Can also use variant="permanent"
        <MUIDrawer open className={classes.drawerStyles}>
            {/* Container to hold user info (picture/name) */}

            <Avatar
                alt='Ashley Sanford'
                src='/static/images/avatar/3.jpg'
                className={classes.large}
            />
            <Typography className={classes.userName}>Ashley Sanford</Typography>

            {/* Container to hold router links */}

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
        </MUIDrawer>
        //  Container for Profile Summary
    );
};

export default Drawer;
