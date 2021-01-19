import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from '../layout/Navbar';
// import Sidebar from '../layout/Sidebar';

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

    useEffect(() => {
        //TODO: Make an API call to get up to date logged in user information
    }, []);

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
                    {/* <Sidebar /> */}
                </Grid>
                <Grid item container sm={9} className={classes.content_page}>
                    content pages
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
