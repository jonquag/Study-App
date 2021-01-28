import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: theme.palette.common.white,
        height: '100vh',
        width: '100vw'
    },
    icon: { fontSize: '300px' },
    text: { paddingTop: "60px" },
}));

const NotFound = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <SentimentVeryDissatisfiedIcon className={classes.icon}/>
            <Typography variant="h1" color="textPrimary" className={classes.text}>
                404
            </Typography>
            <Typography variant="h6" color="textPrimary" className={classes.text}>
                The page you are looking for doesn't exist or another error occured.
            </Typography>
        </div>
    )
};

export default NotFound;
