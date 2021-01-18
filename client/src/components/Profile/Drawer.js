import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Drawer as MUIDrawer } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import profilePic from '../../static/images/profilePicSample.png';
// import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    linkStyles: {
        textDecoration: 'none',
        color: 'black',
        padding: '1em 0 0 2em',
    },
    profilePic: {
        borderRadius: '50%',
        width: '130px',
        marginTop: '2em',
    },
    drawer: {
        width: 400,
    },
    linkContainer: {
        paddingTop: '2em',
    },
    profileName: {
        paddingTop: '1em',
        fontSize: 22,
    },
    test: {
        background: '#F9F9FC',
    },
}));

const Drawer = props => {
    const classes = useStyles();

    return (
        <MUIDrawer variant="permanent" anchor="left" className={classes.drawer}>
            {/* Drawer container */}
            <Grid
                container
                direction="column"
                alignItems="center"
                style={{ width: '400px' }}
                sm={12}
                className={classes.test}
            >
                {/* Profile briefing container */}
                <Grid container item direction="column" alignItems="center">
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
                        to="/userinfo/"
                        exact
                        activeStyle={{
                            fontWeight: 'bold',
                        }}
                        className={classes.linkStyles}
                    >
                        User Info
                    </NavLink>
                    <NavLink
                        to="/profile/courses"
                        activeStyle={{
                            fontWeight: 'bold',
                        }}
                        className={classes.linkStyles}
                    >
                        My Courses
                    </NavLink>
                    <NavLink
                        to="/profile/settings"
                        activeStyle={{
                            fontWeight: 'bold',
                        }}
                        className={classes.linkStyles}
                    >
                        Settings
                    </NavLink>
                    <NavLink
                        to="/profile/notifications"
                        activeStyle={{
                            fontWeight: 'bold',
                        }}
                        className={classes.linkStyles}
                    >
                        Notifications
                    </NavLink>
                </Grid>
                <Grid container direction="column" item justify="flex-end" sm={4}>
                    <Typography align="left">Logout</Typography>
                </Grid>
            </Grid>
        </MUIDrawer>
        //  Container for Profile Summary
    );
};

export default Drawer;
