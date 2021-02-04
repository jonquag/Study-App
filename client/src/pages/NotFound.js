import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { useGlobalContext } from '../context/studyappContext';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: theme.palette.common.white,
        height: '100vh',
        width: '100vw',
    },
    icon: { fontSize: '300px' },
    text: { opacity: '80%', padding: '1em' },
    linkStyles: {
        textDecoration: 'none',
        color: 'blue',
        padding: '1em 0 0 2em',
        fontSize: '0.9375rem',
        opacity: '50%',
    },
}));

const NotFound = () => {
    const classes = useStyles();
    const { isAuth } = useGlobalContext();

    return (
        <div className={classes.root}>
            <SentimentVeryDissatisfiedIcon className={classes.icon} />
            <Typography variant="h1" color="textPrimary" className={classes.text}>
                404
            </Typography>
            <Typography variant="h6" color="textPrimary" className={classes.text}>
                The page you are looking for doesn't exist or another error occured.
            </Typography>
            <Box flexDirection="row" className={classes.linkContainer}>
                {isAuth && (
                    <NavLink to="/profile" className={classes.linkStyles}>
                        Profile
                    </NavLink>
                )}
                <NavLink to="/login" className={classes.linkStyles}>
                    Login
                </NavLink>
            </Box>
        </div>
    );
};

export default NotFound;
