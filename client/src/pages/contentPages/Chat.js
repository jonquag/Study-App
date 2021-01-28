import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import Sidebar from '../../components/Profile/Sidebar';
import { makeStyles } from '@material-ui/core/styles';

import ChatSidePanel from './ChatSidePanel';

const useStyles = makeStyles(theme => ({
    container: {
        height: 'calc(100vh - 100px)',
    },
    contentContainer: {
        backgroundColor: theme.palette.common.white,
    },
}));

const Chat = () => {
    const classes = useStyles();
    return (
        <Grid container className={classes.container}>
            <Sidebar>
                <ChatSidePanel />
            </Sidebar>
            <Grid item container sm={12} md={9} className={classes.contentContainer}>
                <Typography variant="h2">Chat Page</Typography>
            </Grid>
        </Grid>
    );
};

export default Chat;
