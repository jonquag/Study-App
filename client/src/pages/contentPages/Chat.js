import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import Sidebar from '../../components/Profile/Sidebar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 3,
    },
    sidebar: {},
    contentContainer: {
        backgroundColor: theme.palette.common.white,
    },
}));

const Chat = () => {
    const classes = useStyles();
    return (
        <Grid>
            <Grid container className={classes.container}>
                <Grid
                    item
                    container
                    direction="column"
                    sm={3}
                    className={classes.sidebar}
                >
                    <Sidebar />
                </Grid>
                <Grid item container sm={9} className={classes.contentContainer}>
                    <Typography variant="h2">Chat Page</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Chat;
