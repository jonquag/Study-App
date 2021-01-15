import React from 'react';
import { Typography } from '@material-ui/core';
import { Drawer as MUIDrawer } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import profilePic from '../../static/images/profilePicSample.png';
// import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    linkStyles: {
        textDecoration: 'none',
        color: 'black',
        padding: '1em 0 0 2em',
    },
    profilePic: {
        padding: '0 3em 0em 3em',
        borderRadius: '50%',
        width: '130px',
        marginTop: '3em',
    },
    drawer: {
        width: '400px',
    },
}));

const Drawer = (props) => {
    const classes = useStyles();

    return (
        <MUIDrawer variant='permanent' anchor='left' className={classes.drawer}>
            <img src={profilePic} alt='Ashly Sanford' className={classes.profilePic} />

            <Typography style={{ paddingTop: '1em' }} align='center'>
                Ashley Sanford
            </Typography>

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
