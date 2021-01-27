import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import Sidebar from '../../components/Profile/Sidebar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        height: 'calc(100vh - 103px)',
        marginTop: 3,
    },
    contentContainer: {
        backgroundColor: theme.palette.common.white,
    },
}));

const Forum = () => {
    const classes = useStyles();
    return (
        <Grid>
            <Grid container className={classes.container}>
                <Grid item container sm={3} className={classes.sidebar}>
                    <Sidebar />
                </Grid>
                <Grid item container sm={9} className={classes.contentContainer}>
                    <Typography variant="h2">Forum Page</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Forum;
