import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../layout/Navbar';

const useStyles = makeStyles(theme => ({
    sidebar: {
        height: '85vh',
        backgroundColor: '#f9f9fc',
        alignItems: 'center',
        flexGrow: 1,
        marginTop: 3,
    },
    content_page: {
        backgroundColor: theme.palette.common.white,
        marginTop: 3,
    },
    profile: {
        flexGrow: 2,
    },
    list: {
        flexGrow: 6,
    },
    logout: {
        flexGrow: 1,
    },
}));

const Dashboard = () => {
    const classes = useStyles();
    return (
        <Grid>
            <Navbar />
            <Grid container>
                <Grid
                    item
                    container
                    direction="column"
                    sm={3}
                    className={classes.sidebar}
                >
                    <div className={classes.profile}>Profile Pic and name</div>
                    <div className={classes.list}>List</div>
                    <div className={classes.logout}>Logout</div>
                </Grid>
                <Grid item container sm={9} className={classes.content_page}>
                    content pages
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
